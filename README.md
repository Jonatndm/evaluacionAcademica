# Sistema de Consultas a Base de Datos MongoDB para Evaluaciones

## Descripción
Este repositorio contiene scripts de consulta a una base de datos de MongoDB, que almacena información de evaluaciones de estudiantes. Incluye funciones para obtener el promedio de calificaciones por estudiante, promedio por evaluación y desempeño de estudiantes por materia.

## Estructura de la Base de Datos
La base de datos se llama `evaluaciones` y contiene las siguientes colecciones:

1. **Resultados**
   - **Descripción:** Almacena los resultados de cada evaluación para los estudiantes.
   - **Campos:**
     - `_id` (ObjectId): Identificador único del resultado.
     - `studentId` (ObjectId): Identificador del estudiante.
     - `evaluationId` (ObjectId): Identificador de la evaluación.
     - `calificacion` (number): Calificación obtenida en la evaluación.

2. **Evaluaciones**
   - **Descripción:** Almacena la información de cada evaluación.
   - **Campos:**
     - `_id` (ObjectId): Identificador único de la evaluación.
     - `materia` (string): Nombre de la materia evaluada.

## Métodos de Consulta

### Conexión a MongoDB
- **Función:** `conectarDB()`
- **Descripción:** Establece la conexión con la base de datos `evaluaciones` en el servidor de MongoDB.
- **Ejemplo de uso:**
    ```javascript
    await conectarDB();
    ```

### Obtener Promedio de Calificaciones de un Estudiante
- **Función:** `obtenerPromedioEstudiante(studentId)`
- **Descripción:** Calcula el promedio de calificaciones de un estudiante en base a su `studentId`.
- **Parámetros:**
  - `studentId` (string): El ID del estudiante.
- **Retorno:** Objeto con el promedio de calificación del estudiante o `{ promedioCalificacion: 0 }` si no se encuentran datos.
- **Ejemplo de uso:**
    ```javascript
    const promedio = await obtenerPromedioEstudiante("67046b2f6680ebf0b8c73bf8");
    console.log("Promedio del estudiante:", promedio);
    ```
- **Ejemplo de respuesta:**
    ```json
    { "promedioCalificacion": 85.5 }
    ```

### Obtener Promedio de Calificaciones de una Evaluación
- **Función:** `obtenerPromedioEvaluacion(evaluationId)`
- **Descripción:** Calcula el promedio de calificaciones para una evaluación específica.
- **Parámetros:**
  - `evaluationId` (string): El ID de la evaluación.
- **Retorno:** Objeto con el promedio de calificación de la evaluación o `{ promedioCalificacion: 0 }` si no se encuentran datos.
- **Ejemplo de uso:**
    ```javascript
    const promedioEvaluacion = await obtenerPromedioEvaluacion("67046b356680ebf0b8c73bf9");
    console.log("Promedio de la evaluación:", promedioEvaluacion);
    ```
- **Ejemplo de respuesta:**
    ```json
    { "promedioCalificacion": 78.3 }
    ```

### Obtener Desempeño por Materia de un Estudiante
- **Función:** `obtenerDesempenoPorMateria(studentId)`
- **Descripción:** Calcula el desempeño de un estudiante en cada materia, mostrando el promedio de calificaciones y el total de evaluaciones realizadas en cada materia.
- **Parámetros:**
  - `studentId` (string): El ID del estudiante.
- **Retorno:** Array de objetos, donde cada objeto representa el desempeño en una materia específica.
- **Ejemplo de uso:**
    ```javascript
    const desempenoMateria = await obtenerDesempenoPorMateria("67046b2f6680ebf0b8c73bf8");
    console.log("Desempeño por materia:", desempenoMateria);
    ```
- **Ejemplo de respuesta:**
    ```json
    [
      { "_id": "Matemáticas", "promedioCalificacion": 85.0, "totalEvaluaciones": 3 },
      { "_id": "Historia", "promedioCalificacion": 90.5, "totalEvaluaciones": 2 }
    ]
    ```

## Ejecución de Consultas de Ejemplo
Para ejecutar las consultas de ejemplo, primero conecta a la base de datos y luego llama a las funciones como se muestra a continuación:

```javascript
conectarDB().then(async () => {
  const promedioEstudiante = await obtenerPromedioEstudiante("67046b2f6680ebf0b8c73bf8");
  console.log("Promedio del estudiante:", promedioEstudiante);

  const promedioEvaluacion = await obtenerPromedioEvaluacion("67046b356680ebf0b8c73bf9");
  console.log("Promedio de la evaluación:", promedioEvaluacion);

  const desempenoMateria = await obtenerDesempenoPorMateria("67046b2f6680ebf0b8c73bf8");
  console.log("Desempeño por materia:", desempenoMateria);
});
