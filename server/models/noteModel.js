const mongoose = require('mongoose');

const SchemaNote = new mongoose.Schema({
  utilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Utilisateur',
    required: true
  },
  texte: {
    type: String,
    default: ""
  },
  couleur: {
    type: String,
    default: "bg-yellow-100 border-yellow-200"
  }
}, { timestamps: true });

module.exports = mongoose.model('Note', SchemaNote);