const bcrypt = require('bcrypt');
const userModel = require('../models/usermodel');

exports.register = async (req, res) => {
  const { nombre, apellido, cedula, direccion, numero_colegio_medico, numero_telefono, email, usuario, contraseña, tipo_usuario } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(contraseña, 10); // Encriptar la contraseña

    const userData = {
      nombre,
      apellido,
      cedula,
      direccion,
      numero_colegio_medico,
      numero_telefono,
      email,
      usuario,
      contraseña: hashedPassword, // Guardar la contraseña encriptada
      tipo_usuario
    };

    userModel.createUser(userData, (err, result) => {
      if (err) {
        console.error('Error al registrar el usuario:', err);
        return res.status(500).send({ success: false, message: 'Error al registrar el usuario', error: err });
      }
      res.status(200).json({ success: true, message: 'Usuario registrado exitosamente' });
    });
  } catch (err) {
    console.error('Error al registrar el usuario:', err);
    res.status(500).send({ success: false, message: 'Error al registrar el usuario', error: err });
  }
};

exports.login = async (req, res) => {
  const { usuario, contraseña } = req.body;

  try {
    userModel.getUserByUsername(usuario, async (err, user) => {
      if (err) {
        console.error('Error al obtener el usuario:', err);
        return res.status(500).send({ success: false, message: 'Error al autenticar el usuario', error: err });
      }
      if (!user) {
        return res.status(401).send({ success: false, message: 'Usuario o contraseña incorrectos' });
      }

      const isPasswordValid = await bcrypt.compare(contraseña, user.contraseña); // Comparar la contraseña

      if (!isPasswordValid) {
        return res.status(401).send({ success: false, message: 'Usuario o contraseña incorrectos' });
      }

      res.status(200).json({ success: true, message: 'Usuario autenticado', user });
    });
  } catch (err) {
    console.error('Error al autenticar el usuario:', err);
    res.status(500).send({ success: false, message: 'Error al autenticar el usuario', error: err });
  }
};





