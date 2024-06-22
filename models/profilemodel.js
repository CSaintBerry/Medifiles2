const connection = require('../db');

const Profile = {
  getProfile: (userId, callback) => {
    const query = 'SELECT * FROM users WHERE id = ?';
    connection.query(query, [userId], callback);
  },
  
};

module.exports = Profile;
