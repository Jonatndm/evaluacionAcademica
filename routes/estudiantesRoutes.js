const express = require('express');
const { obtenerPromedioEstudiante } = require('../Controllers/estudiantesController');
const router = express.Router();

router.get('/:id/promedio', obtenerPromedioEstudiante);

module.exports = router;
