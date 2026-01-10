const express = require('express');
const evenementRouter = express.Router();
const { getEvenements, setEvenement, deleteEvenement } = require('../controllers/evenementController');
const { proteger } = require('../middlewares/authMiddleware');

//! Récupérer tous les événements de l'utilisateur
evenementRouter.get('/', proteger, getEvenements);

//! Créer un nouvel événement
evenementRouter.post('/', proteger, setEvenement);

//! Supprimer un événement
evenementRouter.delete('/:id', proteger, deleteEvenement);

module.exports = evenementRouter;