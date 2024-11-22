const { ObjectId } = require('mongodb');
const Database = require('../config/db');

class Estudiante {
  static async calcularPromedio(studentId) {
    try {
      const db = await Database.conectarDB();
      const resultado = await db.collection('Resultados').aggregate([
        { $match: { studentId: new ObjectId(studentId) } },
        { $group: { _id: "$studentId", promedioCalificacion: { $avg: "$calificacion" } } }
      ]).toArray();
      return resultado[0] || { promedioCalificacion: 0 };
    } catch (error) {
      console.error("Error al calcular promedio:", error);
      throw error;
    }
  }
}

module.exports = Estudiante;
