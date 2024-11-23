const express = require('express');
const { obtenerPromedioEstudiante, obtenerPromedioEvaluacion, obtenerDesempenoMateria } = require('../Controllers/estudiantesController');
const router = express.Router();

router.get('/promedioPorEstudiante/:id', obtenerPromedioEstudiante);
router.get('/promedioPorEvaluacion/:id', obtenerPromedioEvaluacion);
router.get('/desempenoPorMateria/:id', obtenerDesempenoMateria);


module.exports = router;
