const express = require('express');
const Database = require('./config/db');
const ReporterRoutes = require('./routes/ReporterRoutes');
require('dotenv').config();

const app = express();
  Database.conectarDB().then(db => {
  app.locals.db = db;
});

app.use(express.json());
app.use('/reporte', ReporterRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
