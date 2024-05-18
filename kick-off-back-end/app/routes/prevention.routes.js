const express = require('express');
const router = express.Router();
const preventionController = require('../controllers/prevention.controller');

// Middleware de validation
const validatePrevention = async (req, res, next) => {
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

// Point de terminaison pour créer une nouvelle mesure de prévention
router.post('/addprevention', validatePrevention, preventionController.create);

// Point de terminaison pour récupérer toutes les mesures de prévention
router.get('/allpreventions', preventionController.findAll);

// Point de terminaison pour récupérer une mesure de prévention spécifique par son ID
router.get('/:preventionId', preventionController.findOne);

// Point de terminaison pour mettre à jour une mesure de prévention par son ID
router.put('/update/:preventionId', validatePrevention, preventionController.update);

// Point de terminaison pour supprimer une mesure de prévention par son ID
router.delete('/delete/:preventionId', preventionController.delete);

// Archiver une prévention par son ID
router.put('/archive/:preventionId', preventionController.archive);

// Récupérer toutes les préventions archivées
router.get('/archive/archivedPrevention', preventionController.getAllArchived);

// Restaurer une prévention archivée par son ID
router.put('/restore/:preventionId', preventionController.restore);


module.exports = router;
