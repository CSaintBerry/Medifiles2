const connection = require('../db');

const Reference = {
  createReference: (referenceData, callback) => {
    const query = 'INSERT INTO references SET ?';
    connection.query(query, referenceData, callback);
  },
  
};

module.exports = Reference;
