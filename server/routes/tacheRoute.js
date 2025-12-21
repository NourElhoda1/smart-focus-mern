const express = require('express');
const tacheRouter = express.Router();
const tacheController = require('../controllers/tacheController');
const { proteger } = require('../middlewares/authMiddleware');

//! Créer une nouvelle tâche
tacheRouter.post('/tache', proteger, tacheController.creerTache);

//! Récupérer toutes les tâches
tacheRouter.get('/taches', proteger, tacheController.obtenirTaches);

//! Récupérer une tâche par ID
tacheRouter.get('/tache/:id', proteger, tacheController.obtenirUneTache);

//! Modifier une tâche
tacheRouter.put('/tache/:id', proteger, tacheController.modifierTache);

//! Supprimer une tâche
tacheRouter.delete('/tache/:id', proteger, tacheController.supprimerTache);

module.exports = tacheRouter;