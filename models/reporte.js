const { ObjectId } = require('mongodb');
const Database = require('../config/db');

class Reporte {
  static async calcularPromedioEstudiante(studentId) {
    try {
      const db = await Database.conectarDB();
      const resultado = await db.collection('Resultados').aggregate([
        {
          $match: { studentId: new ObjectId(studentId) } 
        },
        {
          $group: {
            _id: "$studentId",
            promedioCalificacion: { $avg: "$calificacion" }, 
            totalEvaluaciones: { $sum: 1 }
          }
        },
        {
          $lookup: {
            from: "Estudiantes",
            localField: "_id", 
            foreignField: "_id",
            as: "informacionEstudiante" 
          }
        },
        {
          $unwind: "$informacionEstudiante" 
        },
        {
          $project: {
            _id: 1,
            promedioCalificacion: 1,
            totalEvaluaciones: 1,
            nombre: "$informacionEstudiante.nombre",
            curso: "$informacionEstudiante.curso",
            edad: "$informacionEstudiante.edad"
          }
        }
      ]).toArray();
  
      return resultado[0] || {promedio: 0};
    } catch (error) {
      console.error("Error al calcular promedio por estudiante:", error);
      throw error;
    }
  }

  static async calcularPromedioEvaluacion(evaluationId) {
    try {
      const db = await Database.conectarDB();
      const resultado = await db.collection('Resultados').aggregate([
        {
          $match: { evaluationId: new ObjectId(evaluationId) } 
        },
        {
          $group: {
            _id: "$evaluationId",
            promedioCalificacion: { $avg: "$calificacion" }, 
            totalEvaluaciones: { $sum: 1 }
          }
        },
        {
          $lookup: {
            from: "Evaluaciones",
            localField: "_id", 
            foreignField: "_id",
            as: "informacionEvaluacion" 
          }
        },
        {
          $unwind: "$informacionEvaluacion" 
        },
        {
          $project: {
            _id: 1,
            promedioCalificacion: 1,
            totalEvaluaciones: 1,
            materia: "$informacionEvaluacion.Materia",
            tipo: "$informacionEvaluacion.tipo",
            fecha: "$informacionEvaluacion.fecha"
          }
        }
      ]).toArray();
      return resultado[0] || {promedio: 0};
    }
    catch(error) {
      console.error("Error al calcular promedio por evaluacion", error)
    }
  }

  static async calcularDesempeñoPorMateria(studentId) {
    try {
      const db = await Database.conectarDB();
      const resultado = await db.collection('Resultados').aggregate([
        { $match: { studentId: new ObjectId(studentId) } }, 
        {
          $lookup: {
            from: "Evaluaciones",
            localField: "evaluationId",
            foreignField: "_id",
            as: "evaluacionInfo"
          }
        },
        { $unwind: "$evaluacionInfo" },
        {
          $group: {
            _id: "$evaluacionInfo.materia",
            promedio: { $avg: "$calificacion" },
            totalEvaluaciones: { $sum: 1 },
            observaciones: {$push: "$observacion"}
          }
        }
      ]).toArray();

      return resultado;

    } catch (error) {
      console.error("Error al calcular desempeño por materia:", error);
      throw error;
    }
  }
}

module.exports = Reporte;
