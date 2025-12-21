const express = require('express');
const sessionRouter = express.Router();
const sessionController = require('../controllers/sessionController');
const { proteger } = require('../middlewares/authMiddleware');

//! Créer une nouvelle session
sessionRouter.post('/session/demarrer', proteger, sessionController.demarrerSession);

//! Mettre à jour la session existante
sessionRouter.put('/session/terminer/:id', proteger, sessionController.terminerSession);

//! Obtenir l'historique des sessions d'un utilisateur
sessionRouter.get('/session/historique', proteger, sessionController.obtenirHistorique);

module.exports = sessionRouter;     
