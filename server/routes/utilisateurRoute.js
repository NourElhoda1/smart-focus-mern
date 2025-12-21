const express = require('express');
const utilisateurRouter = express.Router();
const utilisateurController = require('../controllers/utilisateurController');
const { proteger } = require('../middlewares/authMiddleware');

//! Inscription d'un nouvel utilisateur
utilisateurRouter.post('/utilisateur/inscription', utilisateurController.inscription);

//! Connexion d'un utilisateur
utilisateurRouter.post('/utilisateur/connexion', utilisateurController.connexion);

//! Obtenir le profil utilisateur
utilisateurRouter.get('/utilisateur/profil', proteger, utilisateurController.obtenirProfil);

module.exports = utilisateurRouter;