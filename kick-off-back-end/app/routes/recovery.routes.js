const express = require('express');
const router = express.Router();
const recoveryPlanController = require('../controllers/recovery.controller');

// Middleware de validation
const validateRecoveryPlan = async (req, res, next) => {
    const data = req.body;

    try {
        // Valider les données ici, si nécessaire
        // ...
        next(); // Passer à la fonction suivante si la validation réussit
    } catch (error) {
        // Si la validation échoue, renvoyer une réponse d'erreur 400
        return res.status(400).json({ error: error.message });
    }
};

// Point de terminaison pour créer un nouveau plan de récupération pour une blessure
router.post('/addrecoveryplan', validateRecoveryPlan, recoveryPlanController.create);

// Point de terminaison pour récupérer tous les plans de récupération
router.get('/allrecoveryplans', recoveryPlanController.findAll);

// Point de terminaison pour récupérer un plan de récupération spécifique par son ID
router.get('/:recoveryPlanId', recoveryPlanController.findOne);

// Point de terminaison pour mettre à jour un plan de récupération par son ID
router.put('/update/:recoveryPlanId', validateRecoveryPlan, recoveryPlanController.update);

// Point de terminaison pour supprimer un plan de récupération par son ID
router.delete('/delete/:recoveryPlanId', recoveryPlanController.delete);

// Route pour archiver un plan de récupération par son ID
router.put('/archive/:recoveryPlanId', recoveryPlanController.archive);

// Route pour récupérer tous les plans de récupération archivés
router.get('/archive/archivedRecovery', recoveryPlanController.getArchivedRecoveryPlans);

// Route pour restaurer un plan de récupération par son ID
router.put('/restore/:recoveryPlanId', recoveryPlanController.restore);



module.exports = router;
