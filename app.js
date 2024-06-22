const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const expressWinston = require('express-winston');
const logger = require('./logger');
const apiRouter = require('./routes/api');
const patientsRouter = require('./routes/patients');
const clinicalRecordsRouter = require('./routes/clinicalrecords');
const queueRouter = require('./routes/queue');
const reportsRouter = require('./routes/reports');
const closureRouter = require('./routes/closure');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

// Logging middleware
app.use(expressWinston.logger({
  winstonInstance: logger,
  meta: true,
  msg: "HTTP {{req.method}} {{req.url}}",
  expressFormat: true,
  colorize: false,
  ignoreRoute: function (req, res) { return false; }
}));

// Rutas para usuarios
app.use('/api', apiRouter);

// Otras rutas (pacientes, historias clínicas, cola, reportes, cierre)
app.use('/patients', patientsRouter);
app.use('/clinicalrecords', clinicalRecordsRouter);
app.use('/queue', queueRouter);
app.use('/reports', reportsRouter);
app.use('/closure', closureRouter);

// Ruta predeterminada
app.get('/', (req, res) => {
  res.send('Welcome to the medical records system');
});

// Error logging middleware
app.use(expressWinston.errorLogger({
  winstonInstance: logger
}));

// Iniciar el servidor
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
  console.log(`Server running at http://localhost:${PORT}`);
});
