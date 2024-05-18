const express = require('express');
const router = express.Router();
const performanceSummaryController = require('../controllers/Performance Summary.controller');
const performanceSummaryValidator = require('../validator/performanceSummaryValidator');

// Middleware de validation
const validatePerformanceSummary = async (req, res, next) => {
    const data = req.body;

    try {
        // Valider les données avec le validateur Yup
        await performanceSummaryValidator.validate(data, { abortEarly: false });
        next(); // Passer à la fonction suivante si la validation réussit
    } catch (error) {
        // Si la validation échoue, renvoyer une réponse d'erreur 400 avec les détails des erreurs
        return res.status(400).json({ errors: error.errors });
    }
};
// Point de terminaison pour créer un nouveau résumé de performance
router.post('/performancesummaries', validatePerformanceSummary,performanceSummaryController.create);

// Point de terminaison pour récupérer tous les résumés de performance
router.get('/performancesummaries', performanceSummaryController.findAll);

// Point de terminaison pour récupérer un résumé de performance spécifique par ID
router.get('/performancesummaries/:performanceSummaryId', performanceSummaryController.findOne);

// Point de terminaison pour mettre à jour un résumé de performance par ID
router.put('/performancesummaries/:performanceSummaryId',validatePerformanceSummary, performanceSummaryController.update);

// Point de terminaison pour supprimer un résumé de performance par ID
router.delete('/performancesummaries/:performanceSummaryId', performanceSummaryController.delete);
router.put('/performancesummaries/:performanceSummaryId/archive', performanceSummaryController.archive);


module.exports = router;
