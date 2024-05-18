module.exports = (app) => {
    const staff = require('../controllers/staff.controller.js');

    app.post('/staff', staff.create);
    app.get('/staff', staff.findAll);
    app.get('/staff/:staffId', staff.findOne);
    app.put('/staff/:staffId', staff.update);
    app.delete('/staff/:staffId', staff.delete);
};