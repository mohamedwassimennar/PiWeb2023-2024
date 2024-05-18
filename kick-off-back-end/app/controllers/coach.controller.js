const Coach = require('../models/coach.model');

exports.create = async(req, res) => {
    try {
        const coach = await Coach.create(req.body);
        res.status(201).json(coach);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.findAll = async(req, res) => {
    try {
        const coaches = await Coach.find();
        res.json(coaches);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.findOne = async(req, res) => {
    try {
        const coach = await Coach.findById(req.params.coachId);
        if (!coach) {
            return res.status(404).json({ message: 'Entraîneur introuvable' });
        }
        res.json(coach);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.update = async(req, res) => {
    try {
        const coach = await Coach.findByIdAndUpdate(req.params.coachId, req.body, { new: true });
        if (!coach) {
            return res.status(404).json({ message: 'Entraîneur introuvable' });
        }
        res.json(coach);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.delete = async(req, res) => {
    try {
        const coach = await Coach.findByIdAndDelete(req.params.coachId);
        if (!coach) {
            return res.status(404).json({ message: 'Entraîneur introuvable' });
        }
        res.json({ message: 'Entraîneur supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};