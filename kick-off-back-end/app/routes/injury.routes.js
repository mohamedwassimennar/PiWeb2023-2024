const express = require('express');
const router = express.Router();
const injuryController = require('../controllers/injury.controller');

// Middleware de validation
const validateInjury = async (req, res, next) => {
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

// Point de terminaison pour créer une nouvelle blessure pour un joueur
router.post('/addinjury', validateInjury, injuryController.create);

// Point de terminaison pour récupérer toutes les blessures
router.get('/allinjuries', injuryController.findAll);

// Point de terminaison pour extraire les blessures en PDF
router.get('/extractpdf', injuryController.extractToPdf);

// Point de terminaison pour récupérer une blessure spécifique par son ID
// Cette route doit venir après toutes les autres routes statiques pour éviter les conflits
router.get('/:injuryId', injuryController.findOne);

// Point de terminaison pour mettre à jour une blessure par son ID
router.put('/update/:injuryId', validateInjury, injuryController.update);

// Point de terminaison pour supprimer une blessure par son ID
router.delete('/delete/:injuryId', injuryController.delete);

// Point de terminaison pour archiver une blessure par son ID
router.put('/archive/:injuryId', injuryController.archive); // Ajout de la route pour archiver une blessure

// Endpoint pour récupérer les blessures archivées
router.get('/archive/archived', injuryController.getArchivedInjuries);

// Point de terminaison pour restaurer une blessure archivée par son ID
router.put('/restore/:injuryId', injuryController.restore); // Ajout de la route pour restaurer une blessure archivée


module.exports = router;
