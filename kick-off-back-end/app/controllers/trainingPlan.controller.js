const TrainingPlan = require('../models/trainingPlan.model.js');

// Créer un nouveau plan de formation
exports.create = async(req, res) => {
    // Extraire les données de la requête
    const { trainingplace, time, date, trainingType, duration, intensityLevel } = req.body;

    // Créer une nouvelle instance de plan de formation
    const trainingPlan = new TrainingPlan({
        trainingplace: trainingplace,
        time: time,
        date: date,
        trainingType: trainingType,
        duration: duration,
        intensityLevel: intensityLevel
    });

    // Sauvegarder le plan de formation dans la base de données
    try {
        const savedTrainingPlan = await trainingPlan.save();
        res.status(201).json(savedTrainingPlan);
    } catch (error) {
        res.status(500).json({ message: error.message || "Une erreur s'est produite lors de la création du plan de formation." });
    }
};

// Récupérer tous les plans de formation
exports.findAll = async(req, res) => {
    // Trouver tous les plans de formation dans la base de données
    try {
        const trainingPlans = await TrainingPlan.find();
        res.json(trainingPlans);
    } catch (error) {
        res.status(500).json({ message: error.message || "Une erreur s'est produite lors de la récupération des plans de formation." });
    }
};

// Récupérer un plan de formation spécifique par ID
exports.findOne = async(req, res) => {
    // Trouver un plan de formation par ID
    try {
        const trainingPlan = await TrainingPlan.findById(req.params.planId);
        if (!trainingPlan) {
            return res.status(404).json({ message: 'Plan de formation introuvable avec l\'identifiant ' + req.params.planId });
        }
        res.json(trainingPlan);
    } catch (error) {
        res.status(500).json({ message: error.message || "Erreur lors de la récupération du plan de formation avec l'identifiant " + req.params.planId });
    }
};

// Mettre à jour un plan de formation
exports.update = async(req, res) => {

    if (!req.body) {

        return res.status(400).json({ message: "Les données à mettre à jour ne peuvent pas être vides" });
    }

    // Trouver et mettre à jour le plan de formation par ID
    try {
        const updatedTrainingPlan = await TrainingPlan.findByIdAndUpdate(req.params.planId, req.body, { new: true });
        if (!updatedTrainingPlan) {
            return res.status(404).json({ message: 'Plan de formation introuvable avec l\'identifiant ' + req.params.planId });
        }
        res.json(updatedTrainingPlan);
    } catch (error) {
        res.status(500).json({ message: error.message || "Erreur lors de la mise à jour du plan de formation avec l'identifiant " + req.params.planId });
    }
};

// Supprimer un plan de formation
exports.delete = async(req, res) => {
    // Supprimer un plan de formation par ID
    try {
        const deletedTrainingPlan = await TrainingPlan.findByIdAndDelete(req.params.planId);
        if (!deletedTrainingPlan) {
            return res.status(404).json({ message: 'Plan de formation introuvable avec l\'identifiant ' + req.params.planId });
        }
        res.json({ message: 'Plan de formation supprimé avec succès!' });
    } catch (error) {
        res.status(500).json({ message: error.message || "Impossible de supprimer le plan de formation avec l'identifiant " + req.params.planId });
    }
};
exports.archiveStage = async(req, res) => {
    try {
        const stage = await TrainingPlan.findByIdAndUpdate(req.params.planId, { archived: true }, { new: true });
        if (!stage) {
            return res.status(404).json({ message: ' introuvable' });
        }
        res.json(stage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};