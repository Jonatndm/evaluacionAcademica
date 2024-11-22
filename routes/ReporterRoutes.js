const express = require('express');
const { obtenerPromedioEstudiante, obtenerPromedioEvaluacion, obtenerDesempenoMateria } = require('../Controllers/estudiantesController');
const router = express.Router();

router.get('/:id/promedioPorEstudiante', obtenerPromedioEstudiante);
router.get('/:id/promedioPorEvaluacion', obtenerPromedioEvaluacion);
router.get('/:id/desempenoPorMateria', obtenerDesempenoMateria);


module.exports = router;
