const MatchAnalysis = require('../models/MatchAnalysis.model');


// Créer une nouvelle analyse de match
exports.create = (req, res) => {
    // Extraire les données de la requête
    const {  teamPerformance, tacticalFormations, keyMoments } = req.body;

    // Créer une nouvelle instance d'analyse de match
    const matchAnalysis = new MatchAnalysis({
        teamPerformance: teamPerformance,
        tacticalFormations: tacticalFormations,
        keyMoments: keyMoments
    });

    // Sauvegarder l'analyse de match dans la base de données
    matchAnalysis.save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Une erreur s'est produite lors de la création de l'analyse de match."
            });
        });
};

// Récupérer toutes les analyses de match
exports.findAll = (req, res) => {
    // Trouver toutes les analyses de match dans la base de données
    MatchAnalysis.find()
        .then(matchAnalyses => {
            res.send(matchAnalyses);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Une erreur s'est produite lors de la récupération des analyses de match."
            });
        });
};

// Récupérer une analyse de match spécifique par ID
exports.findOne = (req, res) => {
    // Trouver une analyse de match par ID
    MatchAnalysis.findById(req.params.matchAnalysisId)
        .then(matchAnalysis => {
            if (!matchAnalysis) {
                return res.status(404).send({
                    message: "Analyse de match non trouvée avec l'identifiant " + req.params.matchAnalysisId
                });
            }
            res.send(matchAnalysis);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Analyse de match non trouvée avec l'identifiant " + req.params.matchAnalysisId
                });
            }
            return res.status(500).send({
                message: "Erreur lors de la récupération de l'analyse de match avec l'identifiant " + req.params.matchAnalysisId
            });
        });
};

// Mettre à jour une analyse de match
exports.update = (req, res) => {
    // Valider la requête
    if (!req.body) {
        return res.status(400).send({
            message: "Les données à mettre à jour ne peuvent pas être vides"
        });
    }

    // Trouver et mettre à jour l'analyse de match par ID
    MatchAnalysis.findByIdAndUpdate(req.params.matchAnalysisId, req.body, { new: true })
        .then(matchAnalysis => {
            if (!matchAnalysis) {
                return res.status(404).send({
                    message: "Analyse de match non trouvée avec l'identifiant " + req.params.matchAnalysisId
                });
            }
            res.send(matchAnalysis);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Analyse de match non trouvée avec l'identifiant " + req.params.matchAnalysisId
                });
            }
            return res.status(500).send({
                message: "Erreur lors de la mise à jour de l'analyse de match avec l'identifiant " + req.params.matchAnalysisId
            });
        });
};

// Supprimer une analyse de match
exports.delete = (req, res) => {
    // Supprimer une analyse de match par ID
    MatchAnalysis.findByIdAndRemove(req.params.matchAnalysisId)
        .then(matchAnalysis => {
            if (!matchAnalysis) {
                return res.status(404).send({
                    message: "Analyse de match non trouvée avec l'identifiant " + req.params.matchAnalysisId
                });
            }
            res.send({ message: "Analyse de match supprimée avec succès!" });
        })
        .catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Analyse de match non trouvée avec l'identifiant " + req.params.matchAnalysisId
                });
            }
            return res.status(500).send({
                message: "Impossible de supprimer l'analyse de match avec l'identifiant " + req.params.matchAnalysisId
            });
        });
};


// Archiver une performance de match par ID
exports.archive = async (req, res) => {
    try {
        const matchAnalysis = await MatchAnalysis.findByIdAndUpdate(req.params.matchAnalysisId, { archived: true }, { new: true });
        if (!matchAnalysis) {
            return res.status(404).send({
                message: "Performance de match non trouvée avec l'identifiant " + req.params.matchAnalysisId
            });
        }
        res.send(matchAnalysis);
    } catch (error) {
        return res.status(500).send({
            message: "Erreur lors de l'archivage de la performance de match avec l'identifiant " + req.params.matchAnalysisId
        });
    }
};