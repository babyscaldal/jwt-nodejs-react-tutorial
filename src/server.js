import express from 'express';
import configViewEngine from './configs/viewengine';
import initWebRoutes from './routes/routes';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

//config view engine
configViewEngine(app);

//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// create the connection to database

//init web routes
initWebRoutes(app);

app.listen(PORT, () => {
  console.log('JWT Backend is running successfully on the port' + PORT);
});
