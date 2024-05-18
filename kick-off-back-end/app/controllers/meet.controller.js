const Meet = require('../models/meet.model');;
// Méthode pour créer une nouvelle réunion
exports.createMeet = async(req, res) => {
    try {
        const meet = new Meet(req.body);
        const savedMeet = await meet.save();
        res.status(201).json(savedMeet);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Méthode pour récupérer toutes les réunions
exports.getAllMeets = async(req, res) => {
    try {
        const meets = await Meet.find();
        res.status(200).json(meets);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Méthode pour récupérer une réunion par son identifiant
exports.getMeetById = async(req, res) => {
    try {
        const meet = await Meet.findById(req.params.meetId);
        if (!meet) {
            return res.status(404).json({ message: 'Réunion non trouvée' });
        }
        res.status(200).json(meet);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Méthode pour mettre à jour une réunion
exports.updateMeet = async(req, res) => {
    try {
        const updatedMeet = await Meet.findByIdAndUpdate(req.params.meetId, req.body, { new: true });
        if (!updatedMeet) {
            return res.status(404).json({ message: 'Réunion non trouvée' });
        }
        res.status(200).json(updatedMeet);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Méthode pour supprimer une réunion
exports.deleteMeet = async(req, res) => {
    try {
        const deletedMeet = await Meet.findByIdAndDelete(req.params.meetId);
        if (!deletedMeet) {
            return res.status(404).json({ message: 'Réunion non trouvée' });
        }
        res.status(200).json({ message: 'Réunion supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.archiveMeet = (req, res) => {
    Meet.findByIdAndUpdate(req.params.meetId, { archived: true }, { new: true })
        .then(meet => {
            if (!meet) {
                return res.status(404).send({
                    status: 'fail',
                    message: "Meet not found with id " + req.params.meetId
                });
            }
            res.status(200).send(meet);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    status: 'fail',
                    message: "Meet not found with id " + req.params.meetId
                });
            }
            return res.status(500).send({
                status: 'error',
                message: "Error archiving meet with id " + req.params.meetId
            });
        });
};