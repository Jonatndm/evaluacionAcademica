require('dotenv').config();
const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.MONGO_URI);

class Database {
  static instance;

  static async conectarDB() {
    if(!Database.instance){
      await client.connect();
      console.log("Conectado a MongoDB");
      Database.instance = client.db(process.env.DB_NAME);
    }
    return Database.instance;
  }
  
}


module.exports = Database;
