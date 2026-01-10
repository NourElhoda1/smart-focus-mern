const mongoose = require('mongoose');

const evenementSchema = mongoose.Schema({
    utilisateur: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Utilisateur'
    },
    titre: {
        type: String,
        required: [true, "Veuillez ajouter un titre"]
    },
    description: {
        type: String,
        required: false
    },
    dateDebut: {
        type: Date,
        required: true
    },
    dateFin: {
        type: Date,
        required: true
    },
    type: {
        type: String,
        enum: ['cours', 'examen', 'revision', 'autre'],
        default: 'revision'
    },
    couleur: {
        type: String,
        default: '#00a63e' 
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Evenement', evenementSchema);