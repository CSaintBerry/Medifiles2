const db = require('../db');

exports.createClinicalRecord = (clinicalRecordData, callback) => {
    const sql = 'INSERT INTO clinicalrecords SET ?';
    db.query(sql, clinicalRecordData, callback);
};

exports.getClinicalRecordById = (clinicalRecordId, callback) => {
    const sql = 'SELECT * FROM clinicalrecords WHERE id = ?';
    db.query(sql, [clinicalRecordId], (err, results) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, results[0]);
        }
    });
};

exports.updateClinicalRecord = (clinicalRecordId, updatedData, callback) => {
    const sql = 'UPDATE clinicalrecords SET ? WHERE id = ?';
    db.query(sql, [updatedData, clinicalRecordId], callback);
};

exports.deleteClinicalRecord = (clinicalRecordId, callback) => {
    const sql = 'DELETE FROM clinicalrecords WHERE id = ?';
    db.query(sql, [clinicalRecordId], callback);
};

exports.addToQueue = (patientData, callback) => {
  const sql = 'INSERT INTO queue SET ?';
  db.query(sql, patientData, callback);
};