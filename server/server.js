const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const connecterDB = require('./config/connecterDB');
const tacheRouter = require('./routes/tacheRoute');
const utilisateurRouter = require('./routes/utilisateurRoute');
const sessionRouter = require('./routes/sessionRoute');


dotenv.config();
connecterDB();
const app = express();
app.use(express.json());
app.use(cors());

//! Routes
app.get('/', (req, res) => { res.send('API Smart Focus fonctionne !')});
app.use('/v1',tacheRouter);
app.use('/v1', utilisateurRouter);
app.use('/v1', sessionRouter);

//! Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


//! Lancer le serveur
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});