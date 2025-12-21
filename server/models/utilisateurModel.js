const mongoose = require('mongoose');
const mongoosePagination = require('mongoose-paginate-v2') ;

const SchemaUtilisateur = new mongoose.Schema({
  nom: {
    type: String,
    required: [true, 'Le nom est obligatoire'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'L\'email est obligatoire'],
    unique: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'L\'email est invalide'] 
  },
  motDePasse: {
    type: String,
    required: [true, 'Le mot de passe est obligatoire'],
    minlength: 6
  },

  // --- Préférences IHM (Personnalisation) ---
  preferences: {
    theme: {
      type: String,
      enum: ['clair', 'sombre', 'systeme'],
      default: 'sombre' 
    },
    dureeSessionParDefaut: {
      type: Number,
      default: 25 
    },
    notificationsActives: {
      type: Boolean,
      default: true
    }
  },

  // Pour motiver l'utilisateur à revenir (Aspect psychologique IHM)
  statistiques: {
    tempsTotalFocus: {
      type: Number,
      default: 0 
    },
    sessionsCompletees: {
      type: Number,
      default: 0
    },
    niveauActuel: {
      type: String,
      enum: ['Novice', 'Apprenti', 'Expert', 'Maître Zen'],
      default: 'Novice'
    }
  }
}, { timestamps: true });

SchemaUtilisateur.plugin(mongoosePagination);
const utilisateurModel = mongoose.model('Utilisateur', SchemaUtilisateur);
module.exports = utilisateurModel;