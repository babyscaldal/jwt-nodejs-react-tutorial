import express from 'express';
import configViewEngine from './configs/viewengine';
import initWebRoutes from './routes/routes';
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

//config view engine
configViewEngine(app);

//init web routes
initWebRoutes(app);

app.listen(PORT, () => {
  console.log('JWT Backend is running successfully on the port' + PORT);
});
