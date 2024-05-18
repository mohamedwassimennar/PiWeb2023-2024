const Player = require('../models/player');

// Create a new Player
exports.create = (req, res) => {
    

    // Create a Player
    const player = new Player({
        playerName: req.body.playerName|| "",
        marketValue: req.body.marketValue|| "",
        contract: req.body.contract|| "",
        club: req.body.club|| ""
    });

    // Save Player in the database
    player.save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                status: 'error',
                message: err.message || "Some error occurred while creating the Player."
            });
        });
};

exports.findAll = (req, res) => {
    Player.find()
        .then(players => {
            res.send(
                
               players
            );
        })
        .catch(err => {
            res.status(500).send({
                status: 'error',
                message: err.message || "Some error occurred while retrieving players."
            });
        });
};

// Find a single Player with a playerId
exports.findOne = (req, res) => {
    Player.findById(req.params.playerId)
        .then(player => {
            if (!player) {
                return res.status(404).send({
                    status: 'fail',
                    message: "Player not found with id " + req.params.playerId
                });
            }
            res.status(200).send(
                 player
            );
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    status: 'fail',
                    message: "Player not found with id " + req.params.playerId
                });
            }
            return res.status(500).sebd({
                status: 'error',
                message: "Error retrieving player with id " + req.params.playerId
            });
        });
};

// Update a Player identified by the playerId in the request
exports.update = (req, res) => {
    // Validate Request
  

    // Find Player and update it with the request body
    Player.findByIdAndUpdate(req.params.playerId, {
        playerName: req.body.playerName|| "",
        marketValue: req.body.marketValue|| "",
        contract: req.body.contract|| "",
        club: req.body.club|| ""
    }, { new: true })
        .then(player => {
            if (!player) {
                return res.status(404).send({
                    status: 'fail',
                    message: "Player not found with id " + req.params.playerId
                });
            }
            res.status(200).send({
                status: 'success',
                player: player
            });
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    status: 'fail',
                    message: "Player not found with id " + req.params.playerId
                });
            }
            return res.status(500).send({
                status: 'error',
                message: "Error updating player with id " + req.params.playerId
            });
        });
};

// Delete a Player
exports.delete = (req, res) => {
    Player.findByIdAndRemove(req.params.playerId)
        .then(player => {
            if (!player) {
                return res.status(404).send({
                    status: 'fail',
                    message: "Player not found with id " + req.params.playerId
                });
            }
            res.status(204).send({
                status: 'success',
                message: "Player deleted successfully"
            });
        })
        .catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    status: 'fail',
                    message: "Player not found with id " + req.params.playerId
                });
            }
            return res.status(500).send({
                status: 'error',
                message: "Could not delete player with id " + req.params.playerId
            });
        });
};

exports.archive = (req, res) => {
    Player.findByIdAndUpdate(req.params.playerId, { archived: true }, { new: true })
        .then(player => {
            if (!player) {
                return res.status(404).send({
                    status: 'fail',
                    message: "Player not found with id " + req.params.playerId
                });
            }
            res.status(200).send(
               
                player
            );
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    status: 'fail',
                    message: "Player not found with id " + req.params.playerId
                });
            }
            return res.status(500).send({
                status: 'error',
                message: "Error archiving player with id " + req.params.playerId
            });
        });
};
