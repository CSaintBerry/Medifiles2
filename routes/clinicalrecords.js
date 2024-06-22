const express = require('express');
const router = express.Router();
const clinicalRecordController = require('../controllers/clinicalRecordcontroller');

router.post('/clinicalrecords', clinicalRecordController.createClinicalRecord);
router.get('/clinicalrecords/:id', clinicalRecordController.getClinicalRecord);
router.put('/clinicalrecords/:id', clinicalRecordController.updateClinicalRecord);
router.delete('/clinicalrecords/:id', clinicalRecordController.deleteClinicalRecord);
router.post('/clinicalrecords/addToQueue', clinicalRecordController.addToQueue);

module.exports = router;