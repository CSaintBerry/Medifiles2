const patientModel = require('../models/patientModel');

exports.createPatient = (req, res) => {
    const patientData = {
        created_at: req.body.created_at,
        nombre_apellido: req.body.nombre_apellido,
        edad: req.body.edad,
        sexo: req.body.sexo,
        fecha_nacimiento: req.body.fecha_nacimiento,
        nombre_madre: req.body.nombre_madre,
        nombre_padre: req.body.nombre_padre,
        edad_madre: req.body.edad_madre,
        edad_padre: req.body.edad_padre,
        direccion: req.body.direccion,
        telefono: req.body.telefono
    };

    patientModel.createPatient(patientData, (err, result) => {
        if (err) {
            console.error('Error al crear el paciente:', err);
            res.status(500).send({ error: 'Error al crear el paciente', details: err });
        } else {
            res.status(201).send({ message: 'Paciente creado exitosamente', patient_id: result.insertId });
        }
    });
};

exports.getPatient = (req, res) => {
    const patientId = req.params.id;

    patientModel.getPatientById(patientId, (err, patient) => {
        if (err) {
            console.error('Error al obtener el paciente:', err);
            res.status(500).send({ error: 'Error al obtener el paciente', details: err });
        } else {
            res.status(200).send(patient);
        }
    });
};

exports.updatePatient = (req, res) => {
    const patientId = req.params.id;
    const updatedData = req.body;

    patientModel.updatePatient(patientId, updatedData, (err, result) => {
        if (err) {
            console.error('Error al actualizar el paciente:', err);
            res.status(500).send({ error: 'Error al actualizar el paciente', details: err });
        } else {
            res.status(200).send({ message: 'Paciente actualizado exitosamente' });
        }
    });
};


