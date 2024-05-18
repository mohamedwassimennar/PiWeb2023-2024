const Prevention = require('../models/prevention.model');

// Créer une nouvelle prévention
exports.create = async (req, res) => {
    // Extraction des données de la requête
    const { playerName, description, recommendedPractices, equipmentRecommendations, nutritionalRecommendations, lifestyleRecommendations } = req.body;

    // Création d'une nouvelle instance de prévention
    const prevention = new Prevention({
        playerName: playerName,
        description: description,
        recommendedPractices: recommendedPractices,
        equipmentRecommendations: equipmentRecommendations,
        nutritionalRecommendations: nutritionalRecommendations,
        lifestyleRecommendations: lifestyleRecommendations
    });

    // Sauvegarde de la prévention dans la base de données
    try {
        const savedPrevention = await prevention.save();
        res.send(savedPrevention);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Une erreur s'est produite lors de la création de la prévention."
        });
    }
};

// Récupérer toutes les préventions
exports.findAll = async (req, res) => {
    try {
        const preventions = await Prevention.find();
        res.send(preventions);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Une erreur s'est produite lors de la récupération des préventions."
        });
    }
};

// Récupérer une prévention spécifique par son ID
exports.findOne = async (req, res) => {
    try {
        const prevention = await Prevention.findById(req.params.preventionId);
        if (!prevention) {
            return res.status(404).send({
                message: "Prévention non trouvée avec l'identifiant " + req.params.preventionId
            });
        }
        res.send(prevention);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Prévention non trouvée avec l'identifiant " + req.params.preventionId
            });
        }
        return res.status(500).send({
            message: "Erreur lors de la récupération de la prévention avec l'identifiant " + req.params.preventionId
        });
    }
};

// Mettre à jour une prévention par son ID
exports.update = async (req, res) => {
    // Valider la requête
    if (!req.body) {
        return res.status(400).send({
            message: "Les données à mettre à jour ne peuvent pas être vides"
        });
    }

    try {
        const updatedPrevention = await Prevention.findByIdAndUpdate(req.params.preventionId, req.body, { new: true });
        if (!updatedPrevention) {
            return res.status(404).send({
                message: "Prévention non trouvée avec l'identifiant " + req.params.preventionId
            });
        }
        res.send(updatedPrevention);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Prévention non trouvée avec l'identifiant " + req.params.preventionId
            });
        }
        return res.status(500).send({
            message: "Erreur lors de la mise à jour de la prévention avec l'identifiant " + req.params.preventionId
        });
    }
};

// Supprimer une prévention par son ID
exports.delete = async (req, res) => {
    try {
        const deletedPrevention = await Prevention.findByIdAndRemove(req.params.preventionId);
        if (!deletedPrevention) {
            return res.status(404).send({
                message: "Prévention non trouvée avec l'identifiant " + req.params.preventionId
            });
        }
        res.send({ message: "Prévention supprimée avec succès!" });
    } catch (error) {
        if (error.kind === 'ObjectId' || error.name === 'NotFound') {
            return res.status(404).send({
                message: "Prévention non trouvée avec l'identifiant " + req.params.preventionId
            });
        }
        return res.status(500).send({
            message: "Impossible de supprimer la prévention avec l'identifiant " + req.params.preventionId
        });
    }
};

// Archiver une prévention par son ID
exports.archive = async (req, res) => {
    try {
        const archivedPrevention = await Prevention.findByIdAndUpdate(req.params.preventionId, { archived: true }, { new: true });
        if (!archivedPrevention) {
            return res.status(404).send({
                message: "Prévention non trouvée avec l'identifiant " + req.params.preventionId
            });
        }
        res.send({ message: "Prévention archivée avec succès!" });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Prévention non trouvée avec l'identifiant " + req.params.preventionId
            });
        }
        return res.status(500).send({
            message: "Impossible d'archiver la prévention avec l'identifiant " + req.params.preventionId
        });
    }
};

// Récupérer toutes les préventions archivées
exports.getAllArchived = async (req, res) => {
    try {
        const archivedPreventions = await Prevention.find({ archived: true });
        res.send(archivedPreventions);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Une erreur s'est produite lors de la récupération des préventions archivées."
        });
    }
};

// Restaurer une prévention archivée par son ID
exports.restore = async (req, res) => {
    try {
        const restoredPrevention = await Prevention.findByIdAndUpdate(req.params.preventionId, { archived: false }, { new: true });
        if (!restoredPrevention) {
            return res.status(404).send({
                message: "Prévention non trouvée avec l'identifiant " + req.params.preventionId
            });
        }
        res.send({ message: "Prévention restaurée avec succès!" });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Prévention non trouvée avec l'identifiant " + req.params.preventionId
            });
        }
        return res.status(500).send({
            message: "Impossible de restaurer la prévention avec l'identifiant " + req.params.preventionId
        });
    }
};