const Player = require('../models/player.model');

exports.create = async(req, res) => {
    try {
        const player = await Player.create(req.body);
        res.status(201).json(player);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.findAll = async(req, res) => {
    try {
        const players = await Player.find();
        res.json(players);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.findOne = async(req, res) => {
    try {
        const player = await Player.findById(req.params.playerId);
        if (!player) {
            return res.status(404).json({ message: 'Joueur introuvable' });
        }
        res.json(player);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.update = async(req, res) => {
    try {
        const player = await Player.findByIdAndUpdate(req.params.playerId, req.body, { new: true });
        if (!player) {
            return res.status(404).json({ message: 'Joueur introuvable' });
        }
        res.json(player);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.delete = async(req, res) => {
    try {
        const player = await Player.findByIdAndDelete(req.params.playerId);
        if (!player) {
            return res.status(404).json({ message: 'Joueur introuvable' });
        }
        res.json({ message: 'Joueur supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};