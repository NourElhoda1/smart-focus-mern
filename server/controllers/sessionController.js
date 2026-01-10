const SessionFocus = require('../models/sessionFocusModel');
const Utilisateur = require('../models/utilisateurModel');

//! Démarrer une session 
exports.demarrerSession = async (req, res) => {
  try {
    const { tacheId, dureePrevue } = req.body;

    const nouvelleSession = new SessionFocus({
      utilisateur: req.user._id,
      tache: tacheId || null, 
      heureDebut: new Date(),
      dureeEnMinutes: dureePrevue || 25, 
      statut: 'en_cours' 
    });

    const session = await nouvelleSession.save();
    res.status(201).json({
      succes: true,
      message: "Session démarrée avec succès !",
      donnees: session
    });

  } catch (erreur) {
    res.status(500).json({ message: erreur.message });
  }
};

//! Terminer une session 
exports.terminerSession = async (req, res) => {
  try {
    const { statut, nombreDistractions, niveauConcentration } = req.body;
    const sessionId = req.params.id;

    const session = await SessionFocus.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session introuvable" });
    }

    if (session.utilisateur.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Non autorisé" });
    }

    session.heureFin = new Date();
    const dureeReelle = Math.round((session.heureFin - session.heureDebut) / 60000); 
    session.dureeEnMinutes = dureeReelle > 0 ? dureeReelle : 1; 
    session.statut = statut || 'termine';
    session.nombreDistractions = nombreDistractions || 0;
    session.niveauConcentration = niveauConcentration; 

    await session.save();
    if (statut === 'termine') {
      await Utilisateur.findByIdAndUpdate(req.user._id, {
        $inc: { 
          'statistiques.tempsTotalFocus': session.dureeEnMinutes,
          'statistiques.sessionsCompletees': 1 
        }
      });
    }

    res.json({ 
      succes: true,
      message: "Session enregistrée et stats mises à jour !", 
      donnees: session 
    });

  } catch (erreur) {
    res.status(500).json({ message: erreur.message });
  }
};

//! Obtenir l'historique 
exports.obtenirHistorique = async (req, res) => {
  try {
    const sessions = await SessionFocus.find({ utilisateur: req.user._id })
                                     .sort({ heureDebut: -1 })
                                     .populate('tache', 'titre'); 

    res.json({
      succes: true,
      donnees: sessions
    });
  } catch (erreur) {
    res.status(500).json({ message: erreur.message });
  }
};

//! Sauvegarder une session 
exports.sauvegarderSession = async (req, res) => {
  try {
    const { dureeEnMinutes } = req.body;
    const statusCalcule = dureeEnMinutes >= 25 ? 'termine' : 'interrompu';

    const nouvelleSession = await SessionFocus.create({
      utilisateur: req.user._id,
      dureeEnMinutes : dureeEnMinutes,
      heureDebut: new Date(Date.now() - dureeEnMinutes * 60000),
      heureFin: Date.now(),
      statut: statusCalcule,
      niveauConcentration: 5,
    });

    res.status(201).json(nouvelleSession);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.obtenirStats = async (req, res) => {
  try {
    const sessions = await SessionFocus.find({ utilisateur: req.user._id });
    const totalMinutes = sessions.reduce((acc, session) => acc + (session.dureeEnMinutes || 0), 0);
    const sessionsTerminees = sessions.filter(session => session.statut === 'termine').length;
    res.json({
      totalMinutes,
      nombreSessions: sessionsTerminees
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};