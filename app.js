const { MongoClient, ObjectId } = require('mongodb');
const url = 'mongodb://localhost:27017';
const dbName = 'evaluaciones';
let db;

async function conectarDB() {
  const client = new MongoClient(url);
  try {
    await client.connect();
    console.log('Conectado a MongoDB');
    db = client.db(dbName);
  } catch (error) {
    console.error("Error al conectar con MongoDB:", error);
  }
}

async function obtenerPromedioEstudiante(studentId) {
  try {
    const resultado = await db.collection('Resultados').aggregate([
      { $match: { studentId: new ObjectId(studentId) } },
      { $group: { _id: "$studentId", promedioCalificacion: { $avg: "$calificacion" } } }
    ]).toArray();
    return resultado[0] || { promedioCalificacion: 0 };
  } catch (error) {
    console.error("Error al obtener promedio de estudiante:", error);
  }
}

async function obtenerPromedioEvaluacion(evaluationId) {
  try {
    const resultado = await db.collection('Resultados').aggregate([
      { $match: { evaluationId: new ObjectId(evaluationId) } },
      { $group: { _id: "$evaluationId", promedioCalificacion: { $avg: "$calificacion" } } }
    ]).toArray();
    return resultado[0] || { promedioCalificacion: 0 };
  } catch (error) {
    console.error("Error al obtener promedio de evaluación:", error);
  }
}

async function obtenerDesempenoPorMateria(studentId) {
  try {
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
          promedioCalificacion: { $avg: "$calificacion" },
          totalEvaluaciones: { $sum: 1 }
        }
      }
    ]).toArray();
    return resultado;
  } catch (error) {
    console.error("Error al obtener desempeño por materia:", error);
  }
}

// Ejecutar consultas como ejemplo
conectarDB().then(async () => {
  const promedioEstudiante = await obtenerPromedioEstudiante("67046b2f6680ebf0b8c73bf8");
  console.log("Promedio del estudiante:", promedioEstudiante);

  const promedioEvaluacion = await obtenerPromedioEvaluacion("67046b356680ebf0b8c73bf9");
  console.log("Promedio de la evaluación:", promedioEvaluacion);

  const desempenoMateria = await obtenerDesempenoPorMateria("67046b2f6680ebf0b8c73bf8");
  console.log("Desempeño por materia:", desempenoMateria);
});
