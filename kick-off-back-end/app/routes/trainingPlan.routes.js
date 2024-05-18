module.exports = (app) => {
    const trainingPlans = require('../controllers/trainingPlan.controller.js');
    const validateMW = require('../midellware/validateMW.js');
    const trainingPlanSchema = require('../validator/trainingPlanValidator.js');
    // Créer un nouveau plan de formation
    app.post('/trainingPlans', validateMW(trainingPlanSchema), trainingPlans.create);

    // Retourner tous les plans de formation
    app.get('/trainingPlans', trainingPlans.findAll);

    // Trouver un plan de formation par son ID
    app.get('/trainingPlans/:planId', trainingPlans.findOne);

    // Mettre à jour un plan de formation
    app.put('/trainingPlans/:planId', validateMW(trainingPlanSchema), trainingPlans.update);

    // Supprimer un plan de formation
    app.delete('/trainingPlans/:planId', trainingPlans.delete);
    app.put('/trainingPlans/:planId/archive', trainingPlans.archiveStage);

};