const express = require('express');
const noteRouter = express.Router();
const { obtenirNotes, creerNote, modifierNote, supprimerNote } = require('../controllers/noteController');
const { proteger } = require('../middlewares/authMiddleware');

//!Recupérer toutes les notes de l'utilisateur
noteRouter.get('/', proteger, obtenirNotes);

//!Créer une note
noteRouter.post('/', proteger, creerNote);

//!Modifier une note
noteRouter.put('/:id', proteger, modifierNote);

//!Supprimer une note
noteRouter.delete('/:id', proteger, supprimerNote);

module.exports = noteRouter;