const Tache = require('../models/tacheModel'); // Vérifie bien que le nom du fichier est correct

//! Créer une nouvelle tâche
exports.creerTache = async (req, res) => {
  try {
    const { titre, dateLimite, tempsEstime, description } = req.body;
    
    let urgenceAuto = false;
    if (dateLimite) {
      const maintenant = new Date();
      const dateEcheance = new Date(dateLimite);
      const diffHeures = (dateEcheance - maintenant) / 36e5; 
      urgenceAuto = diffHeures < 24 && diffHeures > 0;
    }

    const nouvelleTache = new Tache({
      utilisateur: req.user._id, 
      titre,
      description,
      dateLimite,
      tempsEstime,
      estUrgent: urgenceAuto, 
      estImportant: req.body.estImportant || false
    });

    const tacheSauvegardee = await nouvelleTache.save();
    
    res.status(201).json({
      succes: true,
      message: "Tâche créée avec intelligence !",
      donnees: tacheSauvegardee
    });

  } catch (erreur) {
    res.status(400).json({ succes: false, message: erreur.message });
  }
};

//! Récupérer TOUTES les tâches de l'utilisateur 
exports.obtenirTaches = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; 

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort: { createdAt: -1 } 
    };

    const taches = await Tache.paginate({ utilisateur: req.user._id }, options);

    res.status(200).json({
      succes: true,
      donnees: taches
    });

  } catch (erreur) {
    res.status(500).json({ message: erreur.message });
  }
};

//! Récupérer UNE tâche
exports.obtenirUneTache = async (req, res) => {
  try {
    const tache = await Tache.findOne({ 
      _id: req.params.id, 
      utilisateur: req.user._id 
    });

    if (!tache) {
      return res.status(404).json({ message: "Tâche non trouvée (ou accès non autorisé)" });
    }

    res.status(200).json({ succes: true, donnees: tache });
  } catch (erreur) {
    res.status(500).json({ message: "Erreur serveur", error: erreur.message });
  }
};

//! Modifier une tâche 
exports.modifierTache = async (req, res) => {
  try {
    let donneesAjour = req.body;

    if (donneesAjour.dateLimite) {
      const maintenant = new Date();
      const dateEcheance = new Date(donneesAjour.dateLimite);
      const diffHeures = (dateEcheance - maintenant) / 36e5;
      donneesAjour.estUrgent = diffHeures < 24 && diffHeures > 0;
    }

    const tache = await Tache.findOneAndUpdate(
      { _id: req.params.id, utilisateur: req.user._id }, 
      donneesAjour, 
      {
        new: true,
        runValidators: true
      }
    );

    if (!tache) {
      return res.status(404).json({ message: "Tâche non trouvée ou vous n'êtes pas le propriétaire" });
    }

    res.status(200).json({
      succes: true,
      message: "Tâche mise à jour avec succès",
      donnees: tache
    });
  } catch (erreur) {
    res.status(500).json({ message: "Erreur lors de la modification", error: erreur.message });
  }
};

//! Supprimer une tâche 
exports.supprimerTache = async (req, res) => {
  try {
    const tache = await Tache.findOneAndDelete({ 
      _id: req.params.id, 
      utilisateur: req.user._id 
    });

    if (!tache) {
      return res.status(404).json({ message: "Tâche non trouvée ou vous n'êtes pas le propriétaire" });
    }

    res.status(200).json({
      succes: true,
      message: "Tâche supprimée définitivement"
    });
  } catch (erreur) {
    res.status(500).json({ message: "Erreur lors de la suppression", error: erreur.message });
  }
};