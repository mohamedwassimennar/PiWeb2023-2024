const express = require('express');
const router = express.Router();
const playerPerformanceController = require('../controllers/player_performance.controller');
const playerPerformanceValidator = require('../validator/perfermancevalidator');
// Middleware de validation
const validatePlayerPerformance = async (req, res, next) => {
    const data = req.body;

    try {
        // Valider les données avec le validateur Yup
        await playerPerformanceValidator.validate(data, { abortEarly: false });
        next(); // Passer à la fonction suivante si la validation réussit
    } catch (error) {
        // Si la validation échoue, renvoyer une réponse d'erreur 400
        return res.status(400).json({ error: error.errors.join(', ') });
    }
};


// Point de terminaison pour créer une nouvelle performance pour un joueur
router.post('/playerperformances',validatePlayerPerformance, playerPerformanceController.create);

// Point de terminaison pour récupérer toutes les performances des joueurs
router.get('/playerperformances', playerPerformanceController.findAll);

// Point de terminaison pour récupérer une performance de joueur spécifique par ID
router.get('/playerperformances/:playerPerformanceId', playerPerformanceController.findOne);

// Point de terminaison pour mettre à jour une performance de joueur par ID
router.put('/playerperformances/:playerPerformanceId',validatePlayerPerformance, playerPerformanceController.update);

// Point de terminaison pour supprimer une performance de joueur par ID
router.delete('/playerperformances/:playerPerformanceId', playerPerformanceController.delete);

router.put('/playerperformances/:playerPerformanceId/archive', playerPerformanceController.archive);


module.exports = router;
