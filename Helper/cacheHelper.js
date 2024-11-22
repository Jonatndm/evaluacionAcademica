const redis = require("../config/redis");

class CacheHelper {
  //Metodo para obtener por cachekey
  static async get(key) {
    try {
      const data = await redis.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error(`Error al obtener datos desde Redis (key: ${key}):`, error);
      throw error;
    }
  }

  static async set(key, value, expiration = 3600) {
    //Metodo para setear con el cachekey y valor
    try {
      const jsonData = JSON.stringify(value);
      await redis.set(key, jsonData, "EX", expiration);
      console.log(`Dato almacenado en Redis (key: ${key})`);
    } catch (error) {
      console.error(`Error al guardar datos en Redis (key: ${key}):`, error);
      throw error;
    }
  }

}

module.exports = CacheHelper;
