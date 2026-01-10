const Evenement = require('../models/evenementModel');

//! Récupérer tous les événements de l'utilisateur
const getEvenements = async (req, res) => {
    const evenements = await Evenement.find({ utilisateur: req.user.id }).sort({ dateDebut: 1 });
    res.status(200).json(evenements);
};

//! Créer un événement
const setEvenement = async (req, res) => {
    if (!req.body.titre || !req.body.dateDebut || !req.body.dateFin) {
        res.status(400);
        throw new Error("Veuillez remplir les champs obligatoires");
    }

    const evenement = await Evenement.create({
        utilisateur: req.user.id,
        titre: req.body.titre,
        description: req.body.description,
        dateDebut: req.body.dateDebut,
        dateFin: req.body.dateFin,
        type: req.body.type,
        couleur: req.body.couleur
    });

    res.status(200).json(evenement);
};

//! Supprimer un événement
const deleteEvenement = async (req, res) => {
    const evenement = await Evenement.findById(req.params.id);

    if (!evenement) {
        res.status(404);
        throw new Error("Événement non trouvé");
    }

    if (evenement.utilisateur.toString() !== req.user.id) {
        res.status(401);
        throw new Error("Non autorisé");
    }

    await evenement.deleteOne();
    res.status(200).json({ id: req.params.id });
};

module.exports = {
    getEvenements,
    setEvenement,
    deleteEvenement
};