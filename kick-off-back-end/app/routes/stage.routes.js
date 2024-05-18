module.exports = (app) => {
    const stageCtrl = require('../controllers/stage.controller.js');
    const validateMW = require('../midellware/validateMW.js');
    const stageSchema = require('../validator/stageValidator.js');

    // Récupérer tous les stages  
    app.get('/stages', stageCtrl.getStages);

    // Récupérer un stage
    app.get('/stages/:id', stageCtrl.getStage);

    // Créer un nouveau stagen
    app.post('/stages', validateMW(stageSchema), stageCtrl.createStage);

    // Mettre à jour un stage
    app.put('/stages/:id', validateMW(stageSchema), stageCtrl.updateStage);

    // Supprimer un stage 
    app.delete('/stages/:id', stageCtrl.deleteStage);
    app.put('/stages/:id/archive', stageCtrl.archiveStage);

};