const express = require('express');
const router = express.Router();
const { obtenirNotes, creerNote, modifierNote, supprimerNote } = require('../controllers/noteController');
const { proteger } = require('../middlewares/authMiddleware');

router.get('/', proteger, obtenirNotes);
router.post('/', proteger, creerNote);
router.put('/:id', proteger, modifierNote);
router.delete('/:id', proteger, supprimerNote);

module.exports = router;