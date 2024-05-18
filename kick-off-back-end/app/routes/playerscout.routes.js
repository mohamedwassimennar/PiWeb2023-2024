const express = require('express');
const router = express.Router();
const scoutPlanSchema = require('../validator/scoutValidator.js');
const validateMW = require('../midellware/validateMW.js');

const playerscoutController = require('../controllers/playerscout.controller'); // Check this path

router.post('/addscout',validateMW(scoutPlanSchema), playerscoutController.create);
router.get('/showscouts', playerscoutController.findAll);
router.get('/showscout/:playerId', playerscoutController.findOne);
router.put('/updatescout/:playerId', playerscoutController.update);
router.delete('/deletescout/:playerId', playerscoutController.delete);

router.put('/archivescout/:playerId', playerscoutController.archive);

module.exports = router;
