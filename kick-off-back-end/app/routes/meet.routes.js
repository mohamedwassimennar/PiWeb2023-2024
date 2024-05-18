module.exports = (app) => {
    const meets = require('../controllers/meet.controller.js');

    app.post('/meets', meets.createMeet);
    app.get('/meets', meets.getAllMeets);
    app.get('/meets/:meetId', meets.getMeetById);
    app.put('/meets/:meetId', meets.updateMeet);
    app.delete('/meets/:meetId', meets.deleteMeet);
    app.put('/meets/:meetId/archive', meets.archiveMeet);


};