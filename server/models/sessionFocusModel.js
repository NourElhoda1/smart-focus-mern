const mongoose = require('mongoose');
const mongoosePagination = require('mongoose-paginate-v2') ;

const SchemaSessionFocus = new mongoose.Schema({
  utilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Utilisateur',
    required: true
  },
  tache: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tache',
  },
  heureDebut: {
    type: Date,
    required: true,
    default: Date.now
  },
  heureFin: {
    type: Date
  },
  dureeEnMinutes: {
    type: Number,
    required: true
  },
  statut: {
    type: String,
    enum: ['termine', 'interrompu', 'abandonne'], 
    default: 'termine'
  },
  nombreDistractions: {
    type: Number, 
    default: 0 
  },
  niveauConcentration: {
    type: Number,
    min: 1,
    max: 5
  }
}, { timestamps: true });

SchemaSessionFocus.plugin(mongoosePagination);
const sessionFocusModel = mongoose.model('SessionFocus', SchemaSessionFocus);
module.exports = sessionFocusModel;