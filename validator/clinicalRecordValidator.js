const { body, validationResult } = require('express-validator');

exports.validate = [
    body('patient_id').isNumeric().withMessage('El ID del paciente debe ser numérico'),
    body('motivo_consulta').notEmpty().withMessage('El motivo de consulta es obligatorio'),
    body('enfermedad_actual').notEmpty().withMessage('La enfermedad actual es obligatoria'),
    // podria agregar más validaciones según sea necesario para otros campos
    body('peso').optional().isFloat().withMessage('El peso debe ser un número'),
    body('talla').optional().isFloat().withMessage('La talla debe ser un número'),
    // etc.

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
