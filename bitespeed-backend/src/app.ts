import express from 'express';
import bodyParser from 'body-parser';
import identifyRoutes from './routes/Identify';
import sequelize from './config/database';
import Contact from './models/Contact';

const app = express();

app.use(bodyParser.json());

app.use('/api', identifyRoutes);

sequelize.sync({ force: true }).then(() => {
  console.log('Database synced');
});

export default app;
