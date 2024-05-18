const express = require('express');
const router = express.Router();
const matchRecordController = require('../controllers/matchrecord.controller');
const matchPlanSchema = require('../validator/matchrecordValidator');
const validateMW = require('../midellware/validateMW.js');




router.post('/addmatch',validateMW(matchPlanSchema), matchRecordController.create);
router.get('/showmatches', matchRecordController.findAll);
router.get('/showmatch/:matchRecordId', matchRecordController.findOne);
router.put('/updatematch/:matchRecordId', matchRecordController.update);
router.delete('/deletematch/:matchRecordId', matchRecordController.delete);
router.put('/archivematch/:matchRecordId', matchRecordController.archive);


module.exports = router;
