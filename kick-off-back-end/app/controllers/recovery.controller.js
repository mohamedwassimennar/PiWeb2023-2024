const RecoveryPlan = require('../models/recovery.model');

// Créer un nouveau plan de récupération pour une blessure
exports.create = async (req, res) => {
    // Extraire les données de la requête
    const { playerName, injuryStatus, recoveryStartDate, recoveryEndDate, recoveryActivities } = req.body;

    // Créer une nouvelle instance de plan de récupération
    const recoveryPlan = new RecoveryPlan({
        playerName: playerName,
        injuryStatus: injuryStatus,
        recoveryStartDate: recoveryStartDate,
        recoveryEndDate: recoveryEndDate,
        recoveryActivities: recoveryActivities
    });

    // Sauvegarder le plan de récupération dans la base de données
    try {
        const savedRecoveryPlan = await recoveryPlan.save();
        res.send(savedRecoveryPlan);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Une erreur s'est produite lors de la création du plan de récupération."
        });
    }
};

// Récupérer tous les plans de récupération
exports.findAll = async (req, res) => {
    try {
        const recoveryPlans = await RecoveryPlan.find();
        res.send(recoveryPlans);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Une erreur s'est produite lors de la récupération des plans de récupération."
        });
    }
};

// Récupérer un plan de récupération spécifique par son ID
exports.findOne = async (req, res) => {
    try {
        const recoveryPlan = await RecoveryPlan.findById(req.params.recoveryPlanId);
        if (!recoveryPlan) {
            return res.status(404).send({
                message: "Plan de récupération non trouvé avec l'identifiant " + req.params.recoveryPlanId
            });
        }
        res.send(recoveryPlan);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Plan de récupération non trouvé avec l'identifiant " + req.params.recoveryPlanId
            });
        }
        return res.status(500).send({
            message: "Erreur lors de la récupération du plan de récupération avec l'identifiant " + req.params.recoveryPlanId
        });
    }
};

// Mettre à jour un plan de récupération par son ID
exports.update = async (req, res) => {
    // Valider la requête
    if (!req.body) {
        return res.status(400).send({
            message: "Les données à mettre à jour ne peuvent pas être vides"
        });
    }

    try {
        const updatedRecoveryPlan = await RecoveryPlan.findByIdAndUpdate(req.params.recoveryPlanId, req.body, { new: true });
        if (!updatedRecoveryPlan) {
            return res.status(404).send({
                message: "Plan de récupération non trouvé avec l'identifiant " + req.params.recoveryPlanId
            });
        }
        res.send(updatedRecoveryPlan);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Plan de récupération non trouvé avec l'identifiant " + req.params.recoveryPlanId
            });
        }
        return res.status(500).send({
            message: "Erreur lors de la mise à jour du plan de récupération avec l'identifiant " + req.params.recoveryPlanId
        });
    }
};

// Archiver un plan de récupération par son ID
exports.archive = async (req, res) => {
    try {
        const archivedRecoveryPlan = await RecoveryPlan.findByIdAndUpdate(req.params.recoveryPlanId, { archived: true }, { new: true });
        if (!archivedRecoveryPlan) {
            return res.status(404).send({
                message: "Plan de récupération non trouvé avec l'identifiant " + req.params.recoveryPlanId
            });
        }
        res.send({ message: "Plan de récupération archivé avec succès!" });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Plan de récupération non trouvé avec l'identifiant " + req.params.recoveryPlanId
            });
        }
        return res.status(500).send({
            message: "Impossible d'archiver le plan de récupération avec l'identifiant " + req.params.recoveryPlanId
        });
    }
};

// Supprimer un plan de récupération par son ID
exports.delete = async (req, res) => {
    try {
        const deletedRecoveryPlan = await RecoveryPlan.findByIdAndRemove(req.params.recoveryPlanId);
        if (!deletedRecoveryPlan) {
            return res.status(404).send({
                message: "Plan de récupération non trouvé avec l'identifiant " + req.params.recoveryPlanId
            });
        }
        res.send({ message: "Plan de récupération supprimé avec succès!" });
    } catch (error) {
        if (error.kind === 'ObjectId' || error.name === 'NotFound') {
            return res.status(404).send({
                message: "Plan de récupération non trouvé avec l'identifiant " + req.params.recoveryPlanId
            });
        }
        return res.status(500).send({
            message: "Impossible de supprimer le plan de récupération avec l'identifiant " + req.params.recoveryPlanId
        });
    }
};

// Récupérer tous les plans de récupération archivés
exports.getArchivedRecoveryPlans = async (req, res) => {
    try {
        const archivedRecoveryPlans = await RecoveryPlan.find({ archived: true });
        res.status(200).json(archivedRecoveryPlans);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Restaurer un plan de récupération par son ID
exports.restore = async (req, res) => {
    try {
        const restoredRecoveryPlan = await RecoveryPlan.findByIdAndUpdate(req.params.recoveryPlanId, { archived: false }, { new: true });
        if (!restoredRecoveryPlan) {
            return res.status(404).send({
                message: "Plan de récupération non trouvé avec l'identifiant " + req.params.recoveryPlanId
            });
        }
        res.send({ message: "Plan de récupération restauré avec succès!" });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Plan de récupération non trouvé avec l'identifiant " + req.params.recoveryPlanId
            });
        }
        return res.status(500).send({
            message: "Impossible de restaurer le plan de récupération avec l'identifiant " + req.params.recoveryPlanId
        });
    }
};