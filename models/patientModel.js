const db = require('../db');

exports.createPatient = (patientData, callback) => {
    const sql = 'INSERT INTO patients SET ?';
    db.query(sql, patientData, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

exports.getPatientById = (patientId, callback) => {
    const sql = 'SELECT * FROM patients WHERE id = ?';
    db.query(sql, [patientId], (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result[0]);
    });
};

exports.updatePatient = (patientId, updatedData, callback) => {
    const sql = 'UPDATE patients SET ? WHERE id = ?';
    db.query(sql, [updatedData, patientId], (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};
