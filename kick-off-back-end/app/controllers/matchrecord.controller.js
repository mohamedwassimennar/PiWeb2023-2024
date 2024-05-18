const MatchRecord = require('../models/matchrecord.model');

// Create and Save a new MatchRecord
exports.create = (req, res) => {
    

    // Create a MatchRecord
    const matchRecord = new MatchRecord({
        date: req.body.date || "",
        opponent: req.body.opponent || "",
        venue: req.body.venue || "",
        team: req.body.team || "",
        fixtureType: req.body.fixtureType || "League Match",
        matchStatus: req.body.matchStatus || "scheduled",
        score: req.body.score || "",
        image: req.body.image || ""
    });

    // Save MatchRecord in the database
    matchRecord.save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the MatchRecord."
            });
        });
};

// Retrieve and return all MatchRecords from the database
exports.findAll = (req, res) => {
    MatchRecord.find()
        .then(matchRecords => {
            res.send(matchRecords);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving match records."
            });
        });
};

// Find a single MatchRecord with a matchRecordId
exports.findOne = (req, res) => {
    MatchRecord.findById(req.params.matchRecordId)
        .then(matchRecord => {
            if (!matchRecord) {
                return res.status(404).send({
                    message: "MatchRecord not found with id " + req.params.matchRecordId
                });
            }
            res.send(matchRecord);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "MatchRecord not found with id " + req.params.matchRecordId
                });
            }
            return res.status(500).send({
                message: "Error retrieving match record with id " + req.params.matchRecordId
            });
        });
};

// Update a MatchRecord identified by the matchRecordId in the request
exports.update = (req, res) => {
   

    // Find MatchRecord and update it with the request body
    MatchRecord.findByIdAndUpdate(req.params.matchRecordId, {
        date: req.body.date || "",
        opponent: req.body.opponent || "",
        venue: req.body.venue || "",
        team: req.body.team || "",
        fixtureType: req.body.fixtureType || "League Match",
        matchStatus: req.body.matchStatus || "scheduled",
        score: req.body.score || "",
        image: req.body.image || ""
    }, { new: true })
        .then(matchRecord => {
            if (!matchRecord) {
                return res.status(404).send({
                    message: "MatchRecord not found with id " + req.params.matchRecordId
                });
            }
            res.send(matchRecord);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "MatchRecord not found with id " + req.params.matchRecordId
                });
            }
            return res.status(500).send({
                message: "Error updating match record with id " + req.params.matchRecordId
            });
        });
};

// Delete a MatchRecord
exports.delete = (req, res) => {
    MatchRecord.findByIdAndRemove(req.params.matchRecordId)
        .then(matchRecord => {
            if (!matchRecord) {
                return res.status(404).send({
                    message: "MatchRecord not found with id " + req.params.matchRecordId
                });
            }
            res.send({ message: "MatchRecord deleted successfully!" });
        })
        .catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "MatchRecord not found with id " + req.params.matchRecordId
                });
            }
            return res.status(500).send({
                message: "Could not delete match record with id " + req.params.matchRecordId
            });
        });
};
exports.archive = (req, res) => {
    MatchRecord.findByIdAndUpdate(req.params.matchRecordId, { archived: true }, { new: true })
        .then(matchRecord => {
            if (!matchRecord) {
                return res.status(404).send({
                    status: 'fail',
                    message: "Match not found with id " + req.params.matchRecordId
                });
            }
            res.status(200).send(
               
                matchRecord
            );
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    status: 'fail',
                    message: "Match not found with id " + req.params.matchRecordId
                });
            }
            return res.status(500).send({
                status: 'error',
                message: "Error archiving Match with id " + req.params.matchRecordId
            });
        });
};
