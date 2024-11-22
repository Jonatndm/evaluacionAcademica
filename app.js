const express = require('express');
const Database = require('./config/db');
const estudiantesRoutes = require('./routes/estudiantesRoutes');
require('dotenv').config();

const app = express();
  Database.conectarDB().then(db => {
  app.locals.db = db;
});

app.use(express.json());
app.use('/estudiantes', estudiantesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
