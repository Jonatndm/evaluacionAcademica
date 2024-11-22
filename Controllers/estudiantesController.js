const Estudiante = require('../models/estudiante');

async function obtenerPromedioEstudiante(req, res) {
  const estudianteId = req.params.id;
  const promedio = await Estudiante.calcularPromedio(estudianteId);
  res.json(promedio);
}

module.exports = { obtenerPromedioEstudiante };
