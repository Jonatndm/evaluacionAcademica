const Reporte = require('../models/reporte');

async function obtenerPromedioEstudiante(req, res) {
  const estudianteId = req.params.id;
  const promedio = await Reporte.calcularPromedioEstudiante(estudianteId);
  res.json(promedio);
}

async function obtenerPromedioEvaluacion(req, res) {
  const evaluacionId = req.params.id;
  const promedio = await Reporte.calcularPromedioEvaluacion(evaluacionId);
  res.json(promedio);
}

async function obtenerDesempenoMateria(req, res) {
  const estudianteId = req.params.id;
  const promedio = await Reporte.calcularDesempeñoPorMateria(estudianteId);
  res.json(promedio);
}

module.exports = { obtenerPromedioEstudiante, obtenerPromedioEvaluacion, obtenerDesempenoMateria };
