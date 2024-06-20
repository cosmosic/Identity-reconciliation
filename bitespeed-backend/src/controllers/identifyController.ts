import { Request, Response } from 'express';
import Contact from '../models/Contact';

export const identifyContact = async (req: Request, res: Response) => {
  const { email, phoneNumber } = req.body;

  let contacts = await Contact.findAll({
    where: {
      [email ? 'email' : 'phoneNumber']: email || phoneNumber,
    },
  });

  if (contacts.length === 0) {
    const newContact = await Contact.create({
      email,
      phoneNumber,
      linkPrecedence: 'primary',
    });

    return res.json({
      contact: {
        primaryContatctId: newContact.id,
        emails: [newContact.email].filter(Boolean),
        phoneNumbers: [newContact.phoneNumber].filter(Boolean),
        secondaryContactIds: [],
      },
    });
  }

  let primaryContact = contacts.find(contact => contact.linkPrecedence === 'primary') || contacts[0];
  let secondaryContacts = contacts.filter(contact => contact.id !== primaryContact.id);

  for (let contact of secondaryContacts) {
    if (contact.linkPrecedence === 'primary') {
      primaryContact = contact;
    }
  }

  if (contacts.some(contact => contact.linkPrecedence === 'primary')) {
    await Promise.all(
      secondaryContacts.map(contact =>
        contact.update({ linkedId: primaryContact.id, linkPrecedence: 'secondary' })
      )
    );
  } else {
    await primaryContact.update({ linkedId: primaryContact.id, linkPrecedence: 'primary' });
  }

  const allContacts = await Contact.findAll({
    where: {
      linkedId: primaryContact.id,
    },
  });

  return res.json({
    contact: {
      primaryContatctId: primaryContact.id,
      emails: [primaryContact.email, ...allContacts.map(contact => contact.email)].filter(Boolean),
      phoneNumbers: [primaryContact.phoneNumber, ...allContacts.map(contact => contact.phoneNumber)].filter(Boolean),
      secondaryContactIds: allContacts.map(contact => contact.id),
    },
  });
};
