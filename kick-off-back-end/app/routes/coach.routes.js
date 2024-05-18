module.exports = (app) => {
    const coaches = require('../controllers/coach.controller.js');

    app.post('/coaches', coaches.create);
    app.get('/coaches', coaches.findAll);
    app.get('/coaches/:coachId', coaches.findOne);
    app.put('/coaches/:coachId', coaches.update);
    app.delete('/coaches/:coachId', coaches.delete);
};