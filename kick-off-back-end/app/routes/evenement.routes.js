module.exports = (app) => {
    const evenements = require('../controllers/evenement.controller.js');
    const validateMW = require('../midellware/validateMW.js');
    const eventSchema = require('../validator/evenementValidator.js');


    // Get all events
    app.get('/events', evenements.getEvents);

    // Get single event
    app.get('/events/:id', evenements.getEvent);

    // Create new event
    app.post('/events', validateMW(eventSchema), evenements.createEvent);

    // Update event
    app.put('/events/:id', validateMW(eventSchema), evenements.updateEvent);

    // Delete event
    app.delete('/events/:id', evenements.deleteEvent);
    app.put('/events/:id/archive', evenements.archiveEvent);

};