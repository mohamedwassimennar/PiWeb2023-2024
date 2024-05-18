const PlayerPerformance = require('../models/player_performance.model');


// Créer une nouvelle performance pour un joueur
exports.create = async (req, res) => {
    // Extraire les données de la requête
    const { nom, age, totalMatchesPlayed, goals, totalDistanceCovered, yellowCards, redCards, assists, distanceCovered } = req.body;

    // Créer une nouvelle instance de performance joueur
    const playerPerformance = new PlayerPerformance({
        nom: nom,
        age: age,
        totalMatchesPlayed: totalMatchesPlayed,
        goals: goals,
        totalDistanceCovered: totalDistanceCovered,
        yellowCards: yellowCards,
        redCards: redCards,
        assists: assists,
        distanceCovered: distanceCovered
    });

    // Sauvegarder la performance du joueur dans la base de données
    try {
        const savedPlayerPerformance = await playerPerformance.save();
        res.send(savedPlayerPerformance);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Une erreur s'est produite lors de la création de la performance du joueur."
        });
    }
};

//Récupérer toutes les performances des joueurs

exports.findAll = (req, res) => {
    // Trouver toutes les performances des joueurs dans la base de données
    PlayerPerformance.find()
        .then(playerPerformances => {
            res.send(playerPerformances);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Une erreur s'est produite lors de la récupération des performances des joueurs."
            });
        });
};

//Récupérer une performance de joueur spécifique

exports.findOne = (req, res) => {
    // Trouver une performance de joueur par ID
    PlayerPerformance.findById(req.params.playerPerformanceId)
        .then(playerPerformance => {
            if (!playerPerformance) {
                return res.status(404).send({
                    message: "Performance du joueur non trouvée avec l'identifiant " + req.params.playerPerformanceId
                });
            }
            res.send(playerPerformance);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Performance du joueur non trouvée avec l'identifiant " + req.params.playerPerformanceId
                });
            }
            return res.status(500).send({
                message: "Erreur lors de la récupération de la performance du joueur avec l'identifiant " + req.params.playerPerformanceId
            });
        });
};

/*
//Mettre à jour une performance de joueur
exports.update = (req, res) => {
    // Valider la requête
    if (!req.body) {
        return res.status(400).send({
            message: "Les données à mettre à jour ne peuvent pas être vides"
        });
    }

    // Trouver et mettre à jour la performance du joueur par ID
    PlayerPerformance.findByIdAndUpdate(req.params.playerPerformanceId, req.body, { new: true })
        .then(playerPerformance => {
            if (!playerPerformance) {
                return res.status(404).send({
                    message: "Performance du joueur non trouvée avec l'identifiant " + req.params.playerPerformanceId
                });
            }
            res.send(playerPerformance);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Performance du joueur non trouvée avec l'identifiant " + req.params.playerPerformanceId
                });
            }
            return res.status(500).send({
                message: "Erreur lors de la mise à jour de la performance du joueur avec l'identifiant " + req.params.playerPerformanceId
            });
        });
};
*/

// Mettre à jour une performance de joueur
exports.update = async (req, res) => {
    // Valider la requête
    if (!req.body) {
        return res.status(400).send({
            message: "Les données à mettre à jour ne peuvent pas être vides"
        });
    }

    // Trouver et mettre à jour la performance du joueur par ID
    try {
        const updatedPlayerPerformance = await PlayerPerformance.findByIdAndUpdate(req.params.playerPerformanceId, req.body, { new: true });
        if (!updatedPlayerPerformance) {
            return res.status(404).send({
                message: "Performance du joueur non trouvée avec l'identifiant " + req.params.playerPerformanceId
            });
        }
        res.send(updatedPlayerPerformance);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Performance du joueur non trouvée avec l'identifiant " + req.params.playerPerformanceId
            });
        }
        return res.status(500).send({
            message: "Erreur lors de la mise à jour de la performance du joueur avec l'identifiant " + req.params.playerPerformanceId
        });
    }
};

//Supprimer une performance de joueur

exports.delete = (req, res) => {
    // Supprimer une performance de joueur par ID
    PlayerPerformance.findByIdAndRemove(req.params.playerPerformanceId)
        .then(playerPerformance => {
            if (!playerPerformance) {
                return res.status(404).send({
                    message: "Performance du joueur non trouvée avec l'identifiant " + req.params.playerPerformanceId
                });
            }
            res.send({ message: "Performance du joueur supprimée avec succès!" });
        })
        .catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Performance du joueur non trouvée avec l'identifiant " + req.params.playerPerformanceId
                });
            }
            return res.status(500).send({
                message: "Impossible de supprimer la performance du joueur avec l'identifiant " + req.params.playerPerformanceId
            });
        });
};


//archiver :

// Archiver une performance de joueur par ID
exports.archive = async (req, res) => {
    try {
        const playerPerformance = await PlayerPerformance.findByIdAndUpdate(req.params.playerPerformanceId, { archived: true }, { new: true });
        if (!playerPerformance) {
            return res.status(404).send({
                message: "Performance du joueur non trouvée avec l'identifiant " + req.params.playerPerformanceId
            });
        }
        res.send(playerPerformance);
    } catch (error) {
        return res.status(500).send({
            message: "Erreur lors de l'archivage de la performance du joueur avec l'identifiant " + req.params.playerPerformanceId
        });
    }
};

