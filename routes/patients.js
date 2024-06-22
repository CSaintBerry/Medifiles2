const express = require('express');
const router = express.Router();
const patientsController = require('../controllers/patientcontroller');

router.post('/', patientsController.createPatient);
router.get('/:id', patientsController.getPatient);
router.put('/:id', patientsController.updatePatient);

module.exports = router;
