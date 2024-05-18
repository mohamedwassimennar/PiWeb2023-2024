module.exports = (app) => {
    const players = require('../controllers/player.controller.js');

    app.post('/players', players.create);
    app.get('/players', players.findAll);
    app.get('/players/:playerId', players.findOne);
    app.put('/players/:playerId', players.update);
    app.delete('/players/:playerId', players.delete);
};