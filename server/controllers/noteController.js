const Note = require('../models/noteModel');

//! Obtenir toutes les notes de l'utilisateur
const obtenirNotes = async (req, res) => {
  try {
    const notes = await Note.find({ utilisateur: req.user._id }).sort({ updatedAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//! Créer une note
const creerNote = async (req, res) => {
  try {
    const { texte, couleur } = req.body;
    const nouvelleNote = await Note.create({
      utilisateur: req.user._id,
      texte,
      couleur
    });
    res.status(201).json(nouvelleNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//! Mettre à jour une note
const modifierNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note non trouvée' });
    }

    if (note.utilisateur.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Non autorisé' });
    }

    const noteModifiee = await Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(noteModifiee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//! Supprimer une note
const supprimerNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note non trouvée' });
    }

    if (note.utilisateur.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Non autorisé' });
    }

    await note.deleteOne();
    res.json({ message: 'Note supprimée' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  obtenirNotes,
  creerNote,
  modifierNote,
  supprimerNote
};