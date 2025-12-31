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

//! Sauvegarder une session Pomodoro terminée
sessionRouter.post('/session/sauvegarder', proteger, sessionController.sauvegarderSession);

//! Route pour obtenir les statistiques
sessionRouter.get('/session/stats', proteger, sessionController.obtenirStats);

module.exports = sessionRouter;     
