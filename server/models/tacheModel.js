const mongoose = require('mongoose');
const mongoosePagination = require('mongoose-paginate-v2') ;

const SchemaTache = new mongoose.Schema({
  utilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Utilisateur', 
    required: true
  },
  titre: {
    type: String,
    required: [true, 'Le titre de la tâche est obligatoire'],
    trim: true
  },
  description: {
    type: String,
  },
  // Intelligence 
  estUrgent: {
    type: Boolean,
    default: false
  },
  estImportant: {
    type: Boolean,
    default: false
  },
  dateLimite: {
    type: Date,
  },
  // Gestion du Temps 
  tempsEstime: {
    type: Number,
    default: 25
  },
  statut: {
    type: String,
    enum: ['a_faire', 'en_cours', 'termine'], 
    default: 'a_faire'
  },
  completeLe: {
    type: Date 
  }
}, { 
  timestamps: true 
});

SchemaTache.plugin(mongoosePagination);
const tacheModel = mongoose.model('Tache', SchemaTache);
module.exports = tacheModel;