const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connecterDB = require('./config/connecterDB');

dotenv.config();
connecterDB();
const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.send('API Smart Focus fonctionne !');
});


// Lancer le serveur
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});