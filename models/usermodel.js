const db = require('../db');

exports.createUser = (userData, callback) => {
  const { nombre, apellido, cedula, direccion, numero_colegio_medico, numero_telefono, email, usuario, contraseña, tipo_usuario } = userData;
  const query = 'INSERT INTO users (nombre, apellido, cedula, direccion, numero_colegio_medico, numero_telefono, email, usuario, contraseña, tipo_usuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  
  db.query(query, [nombre, apellido, cedula, direccion, numero_colegio_medico, numero_telefono, email, usuario, contraseña, tipo_usuario], callback);
};

exports.getUserByUsername = (username, callback) => {
  const query = 'SELECT * FROM users WHERE usuario = ?';
  
  db.query(query, [username], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    if (results.length === 0) {
      return callback(null, null); // No user found
    }
    return callback(null, results[0]);
  });
};




