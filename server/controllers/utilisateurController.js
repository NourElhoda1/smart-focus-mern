const Utilisateur = require('../models/utilisateurModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//! Générer un Token JWT 
const genererToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret_temporaire', {
    expiresIn: '30d',
  });
};

//! Inscription d'un nouvel utilisateur
exports.inscription = async (req, res) => {
  try {
    const { nom, email, motDePasse } = req.body;

    if (!nom || !email || !motDePasse) {
      return res.status(400).json({ message: "Merci de remplir tous les champs" });
    }

    // Vérifier si l'utilisateur existe déjà
    const utilisateurExiste = await Utilisateur.findOne({ email });
    if (utilisateurExiste) {
      return res.status(400).json({ message: "Cet email est déjà utilisé" });
    }

    // Hasher le mot de passe 
    const salt = await bcrypt.genSalt(10);
    const motDePasseHash = await bcrypt.hash(motDePasse, salt);

    // Créer l'utilisateur
    const utilisateur = await Utilisateur.create({
      nom,
      email,
      motDePasse: motDePasseHash,
    });

    if (utilisateur) {
      res.status(201).json({
        _id: utilisateur.id,
        nom: utilisateur.nom,
        email: utilisateur.email,
        token: genererToken(utilisateur.id), 
      });
    }else {
      res.status(400).json({ message: "Données utilisateur invalides" });
    }
  } catch (erreur) {
    res.status(500).json({ message: erreur.message });
  }
};

//! Connexion 
exports.connexion = async (req, res) => {
  try {
    const { email, motDePasse } = req.body;

    // Vérifier l'email
    const utilisateur = await Utilisateur.findOne({ email });

    // Vérifier le mot de passe
    if (utilisateur && (await bcrypt.compare(motDePasse, utilisateur.motDePasse))) {
      res.json({
        _id: utilisateur.id,
        nom: utilisateur.nom,
        email: utilisateur.email,
        token: genererToken(utilisateur.id),
      });
    } else {
      res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }
  } catch (erreur) {
    res.status(500).json({ message: erreur.message });
  }
};

//! Obtenir le profil 
exports.obtenirProfil = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findById(req.user._id);

    if (utilisateur) {
      res.json({
        _id: utilisateur._id,
        nom: utilisateur.nom,
        email: utilisateur.email,
        statistiques: utilisateur.statistiques,
        preferences: utilisateur.preferences
      });
    } else {
      res.status(404).json({ message: "Utilisateur non trouvé" });
    }
  } catch (erreur) {
    res.status(500).json({ message: erreur.message });
  }
};