const Event = require('../models/evenement.model');

// Obtenir tous les événements avec les détails des joueurs associés
exports.getEvents = async(req, res) => {
    try {
        const events = await Event.find().populate('players');
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Obtenir un événement unique
exports.getEvent = async(req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate('players');
        if (!event) {
            return res.status(404).json({ message: 'Événement non trouvé' });
        }
        res.json(event);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Créer un nouvel événement
exports.createEvent = async(req, res) => {
    try {
        const event = await Event.create(req.body);
        res.status(201).json(event);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// Mettre à jour un événement
exports.updateEvent = async(req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('players');
        if (!event) {
            return res.status(404).json({ message: 'Événement non trouvé' });
        }
        res.json(event);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Supprimer un événement
exports.deleteEvent = async(req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id)
        if (!event) {
            return res.status(404).json({ message: 'Événement non trouvé' });
        }
        res.json({ message: 'Événement supprimé avec succès' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
exports.archiveEvent = async(req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, { archived: true }, { new: true });
        if (!event) {
            return res.status(404).json({ message: 'Événement non trouvé' });
        }
        res.json(event);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}