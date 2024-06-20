# Bitespeed Backend Task: Identity Reconciliation

## Overview

This project is a backend service designed to reconcile and identify customer identities across multiple purchases using different contact information. The service uses Node.js, Express, and Sequelize with SQLite as the database.

## Prerequisites

- Node.js (v12 or higher)
- npm (v6 or higher)

## Getting Started

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/bitespeed-backend.git
   cd bitespeed-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure the database:**
   The project uses SQLite as the database. The configuration is set up in `src/config/database.ts`.

### Running the Project

1. **Compile TypeScript:**
   ```bash
   npm run build
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:3000`.

### API Endpoint

#### Identify Endpoint

**URL:** `/api/identify`

**Method:** `POST`

**Request Body:**
```json
{
  "email": "string (optional)",
  "phoneNumber": "string (optional)"
}
```

**Response:**
```json
{
  "contact": {
    "primaryContatctId": number,
    "emails": ["string"],
    "phoneNumbers": ["string"],
    "secondaryContactIds": [number]
  }
}
```

**Example Request:**
```json
{
  "email": "mcfly@hillvalley.edu",
  "phoneNumber": "123456"
}
```

**Example Response:**
```json
{
  "contact": {
    "primaryContatctId": 1,
    "emails": ["lorraine@hillvalley.edu", "mcfly@hillvalley.edu"],
    "phoneNumbers": ["123456"],
    "secondaryContactIds": [23]
  }
}
```

### Deployment

This application can be deployed using services like Render, Heroku, or Vercel. Once deployed, update the `DEPLOYMENT_URL` below with your live endpoint.

**Deployment URL:** [DEPLOYMENT_URL]

### Project Structure

```
bitespeed-backend/
├── src/
│   ├── models/
│   │   └── Contact.ts
│   ├── routes/
│   │   └── identify.ts
│   ├── config/
│   │   └── database.ts
│   ├── controllers/
│   │   └── identifyController.ts
│   ├── app.ts
│   └── index.ts
├── package.json
├── tsconfig.json
└── .gitignore
```

### Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### License

This project is licensed under the MIT License.
