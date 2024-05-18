const Stage = require('../models/stage.model.js');

// Fonction pour récupérer tous les stages
exports.getStages = async(req, res) => {
    try {
        const stages = await Stage.find();
        res.json(stages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fonction pour récupérer un stage par son ID
exports.getStage = async(req, res) => {
    try {
        const stage = await Stage.findById(req.params.id);
        if (!stage) {
            return res.status(404).json({ message: 'Stage introuvable' });
        }
        res.json(stage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fonction pour créer un nouveau stage
exports.createStage = async(req, res) => {
    try {
        const stage = await Stage.create(req.body);
        res.status(201).json(stage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fonction pour mettre à jour un stage
exports.updateStage = async(req, res) => {
    try {
        const stage = await Stage.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!stage) {
            return res.status(404).json({ message: 'Stage introuvable' });
        }
        res.json(stage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fonction pour supprimer un stage
exports.deleteStage = async(req, res) => {
    try {
        const stage = await Stage.findByIdAndDelete(req.params.id);
        if (!stage) {
            return res.status(404).json({ message: 'Stage introuvable' });
        }
        res.json({ message: 'Stage supprimé' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.archiveStage = async(req, res) => {
    try {
        const stage = await Stage.findByIdAndUpdate(req.params.id, { archived: true }, { new: true });
        if (!stage) {
            return res.status(404).json({ message: 'Stage introuvable' });
        }
        res.json(stage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fonction pour mettre à jour un stage
exports.updateStage = async(req, res) => {
    try {
        const stage = await Stage.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!stage) {
            return res.status(404).json({ message: 'Stage introuvable' });
        }
        res.json(stage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fonction pour supprimer un stage
exports.deleteStage = async(req, res) => {
    try {
        const stage = await Stage.findByIdAndDelete(req.params.id);
        if (!stage) {
            return res.status(404).json({ message: 'Stage introuvable' });
        }
        res.json({ message: 'Stage supprimé' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};