const clinicalRecordModel = require('../models/clinicalRecordmodel');
const { validateClinicalRecord } = require('../validator/clinicalRecordValidator');
const logger = require('../logger');

exports.createClinicalRecord = async (req, res) => {
    try {
        const clinicalRecordData = req.body;
        const { error } = validateClinicalRecord(clinicalRecordData);
        if (error) {
            return res.status(400).send({ error: 'Invalid request', details: error });
        }

        const clinicalRecord = await clinicalRecordModel.createClinicalRecord(clinicalRecordData);
        res.status(201).send({ message: 'Historia clínica creada exitosamente' });
    } catch (err) {
        logger.error('Error al crear la historia clínica:', err);
        res.status(500).send({ error: 'Error al crear la historia clínica', details: err });
    }
};

exports.getClinicalRecord = async (req, res) => {
    try {
        const clinicalRecordId = req.params.id;
        const clinicalRecord = await clinicalRecordModel.getClinicalRecordById(clinicalRecordId);
        res.status(200).send(clinicalRecord);
    } catch (err) {
        logger.error('Error al obtener la historia clínica:', err);
        res.status(500).send({ error: 'Error al obtener la historia clínica', details: err });
    }
};

exports.updateClinicalRecord = async (req, res) => {
    try {
        const clinicalRecordId = req.params.id;
        const updatedData = req.body;
        const { error } = validateClinicalRecord(updatedData);
        if (error) {
            return res.status(400).send({ error: 'Invalid request', details: error });
        }

        const result = await clinicalRecordModel.updateClinicalRecord(clinicalRecordId, updatedData);
        res.status(200).send({ message: 'Historia clínica actualizada exitosamente' });
    } catch (err) {
        logger.error('Error al actualizar la historia clínica:', err);
        res.status(500).send({ error: 'Error al actualizar la historia clínica', details: err });
    }
};

exports.deleteClinicalRecord = async (req, res) => {
    try {
        const clinicalRecordId = req.params.id;
        await clinicalRecordModel.deleteClinicalRecord(clinicalRecordId);
        res.status(200).send({ message: 'Historia clínica eliminada exitosamente' });
    } catch (err) {
        logger.error('Error al eliminar la historia clínica:', err);
        res.status(500).send({ error: 'Error al eliminar la historia clínica', details: err });
    }
};

exports.addToQueue = async (req, res) => {
    try {
        const clinicalRecordData = req.body;
        const { error } = validateClinicalRecord(clinicalRecordData);
        if (error) {
            return res.status(400).send({ error: 'Invalid request', details: error });
        }

        await clinicalRecordModel.addToQueue(clinicalRecordData);
        res.status(200).send({ message: 'Paciente añadido a la cola exitosamente' });
    } catch (err) {
        logger.error('Error al añadir a la cola:', err);
        res.status(500).send({ error: 'Error al añadir a la cola', details: err });
    }
};