const express = require('express');
const utilisateurRouter = express.Router();
const utilisateurController = require('../controllers/utilisateurController');
const { proteger } = require('../middlewares/authMiddleware');

//! Inscription d'un nouvel utilisateur
utilisateurRouter.post('/inscription', utilisateurController.inscription);

//! Connexion d'un utilisateur
utilisateurRouter.post('/connexion', utilisateurController.connexion);

//! Obtenir le profil utilisateur
utilisateurRouter.get('/profil', proteger, utilisateurController.obtenirProfil);

module.exports = utilisateurRouter;