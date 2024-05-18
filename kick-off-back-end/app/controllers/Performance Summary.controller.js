const PerformanceSummary = require('../models/Performance Summary.model');

// Créer un nouveau résumé de performance
exports.create = (req, res) => {
    // Extraire les données de la requête
    const {  season, totalGoalsScored, averagePassCompletionRate, totalDistanceCovered, totalMatchesPlayed, yellowCards, redCards, minutesPlayed } = req.body;

    // Créer une nouvelle instance de résumé de performance
    const performanceSummary = new PerformanceSummary({
        season: season,
        totalGoalsScored: totalGoalsScored,
        averagePassCompletionRate: averagePassCompletionRate,
        totalDistanceCovered: totalDistanceCovered,
        totalMatchesPlayed: totalMatchesPlayed,
        yellowCards: yellowCards,
        redCards: redCards,
        minutesPlayed: minutesPlayed
    });

    // Sauvegarder le résumé de performance dans la base de données
    performanceSummary.save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Une erreur s'est produite lors de la création du résumé de performance."
            });
        });
};

// Récupérer tous les résumés de performance
exports.findAll = (req, res) => {
    // Trouver tous les résumés de performance dans la base de données
    PerformanceSummary.find()
        .then(performanceSummaries => {
            res.send(performanceSummaries);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Une erreur s'est produite lors de la récupération des résumés de performance."
            });
        });
};

// Récupérer un résumé de performance spécifique par ID
exports.findOne = (req, res) => {
    // Trouver un résumé de performance par ID
    PerformanceSummary.findById(req.params.performanceSummaryId)
        .then(performanceSummary => {
            if (!performanceSummary) {
                return res.status(404).send({
                    message: "Résumé de performance non trouvé avec l'identifiant " + req.params.performanceSummaryId
                });
            }
            res.send(performanceSummary);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Résumé de performance non trouvé avec l'identifiant " + req.params.performanceSummaryId
                });
            }
            return res.status(500).send({
                message: "Erreur lors de la récupération du résumé de performance avec l'identifiant " + req.params.performanceSummaryId
            });
        });
};

// Mettre à jour un résumé de performance
exports.update = (req, res) => {
    // Valider la requête
    if (!req.body) {
        return res.status(400).send({
            message: "Les données à mettre à jour ne peuvent pas être vides"
        });
    }

    // Trouver et mettre à jour le résumé de performance par ID
    PerformanceSummary.findByIdAndUpdate(req.params.performanceSummaryId, req.body, { new: true })
        .then(performanceSummary => {
            if (!performanceSummary) {
                return res.status(404).send({
                    message: "Résumé de performance non trouvé avec l'identifiant " + req.params.performanceSummaryId
                });
            }
            res.send(performanceSummary);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Résumé de performance non trouvé avec l'identifiant " + req.params.performanceSummaryId
                });
            }
            return res.status(500).send({
                message: "Erreur lors de la mise à jour du résumé de performance avec l'identifiant " + req.params.performanceSummaryId
            });
        });
};

// Supprimer un résumé de performance
exports.delete = (req, res) => {
    // Supprimer un résumé de performance par ID
    PerformanceSummary.findByIdAndRemove(req.params.performanceSummaryId)
        .then(performanceSummary => {
            if (!performanceSummary) {
                return res.status(404).send({
                    message: "Résumé de performance non trouvé avec l'identifiant " + req.params.performanceSummaryId
                });
            }
            res.send({ message: "Résumé de performance supprimé avec succès!" });
        })
        .catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Résumé de performance non trouvé avec l'identifiant " + req.params.performanceSummaryId
                });
            }
            return res.status(500).send({
                message: "Impossible de supprimer le résumé de performance avec l'identifiant " + req.params.performanceSummaryId
            });
        });
};

// Archiver une performance de joueur par ID
exports.archive = async (req, res) => {
    try {
        const performanceSummary = await PerformanceSummary.findByIdAndUpdate(req.params.performanceSummaryId, { archived: true }, { new: true });
        if (!performanceSummary) {
            return res.status(404).send({
                message: "Performance du joueur non trouvée avec l'identifiant " + req.params.performanceSummaryId
            });
        }
        res.send(performanceSummary);
    } catch (error) {
        return res.status(500).send({
            message: "Erreur lors de l'archivage de la performance du joueur avec l'identifiant " + req.params.performanceSummaryId
        });
    }
};



