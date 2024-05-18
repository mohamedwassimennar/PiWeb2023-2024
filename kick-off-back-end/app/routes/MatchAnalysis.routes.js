const express = require('express');
const router = express.Router();
const matchAnalysisController = require('../controllers/matchAnalysis.controller');
const matchAnalysisValidator = require('../validator/matchAnalysisValidator');


// Middleware de validation
const validateMatchAnalysis = async (req, res, next) => {
    const data = req.body;

    try {
        // Valider les données avec le validateur Yup
        await matchAnalysisValidator.validate(data, { abortEarly: false });
        next(); // Passer à la fonction suivante si la validation réussit
    } catch (error) {
        // Si la validation échoue, renvoyer une réponse d'erreur 400 avec les détails des erreurs
        return res.status(400).json({ errors: error.errors });
    }
};


router.post('/matchanalyses',validateMatchAnalysis, matchAnalysisController.create);
router.get('/matchanalyses', matchAnalysisController.findAll);
router.get('/matchanalyses/:matchAnalysisId', matchAnalysisController.findOne);
router.put('/matchanalyses/:matchAnalysisId', validateMatchAnalysis,matchAnalysisController.update);
router.delete('/matchanalyses/:matchAnalysisId', matchAnalysisController.delete);
router.put('/matchanalyses/:matchAnalysisId/archive', matchAnalysisController.archive);


module.exports = router;
