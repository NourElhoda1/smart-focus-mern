const mongoose = require('mongoose');

const connecterDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connecté : ${conn.connection.host}`);
  } catch (erreur) {
    console.error(`Erreur de connexion : ${erreur.message}`);
    process.exit(1); 
  }
};

module.exports = connecterDB;