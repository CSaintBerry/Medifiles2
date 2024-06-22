const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('medifiles', 'root', '', {
    host: 'localhost',
    dialect: 'mysql', // Cambia esto según tu base de datos (e.g., 'mysql', 'sqlite', 'mariadb', 'mssql')
});

module.exports = sequelize;
