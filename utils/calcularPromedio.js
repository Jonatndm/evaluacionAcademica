function calcularPromedio(calificaciones) {
  const suma = calificaciones.reduce((acc, val) => acc + val, 0);
  return suma / calificaciones.length;
}

module.exports = { calcularPromedio };
