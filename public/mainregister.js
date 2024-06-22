document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');
  const roleSelect = document.getElementById('role');
  const medicoFields = document.getElementById('medicoFields');

  if (registerForm && roleSelect && medicoFields) {
    roleSelect.addEventListener('change', () => {
      if (roleSelect.value === 'medico') {
        medicoFields.style.display = 'block';
      } else {
        medicoFields.style.display = 'none';
      }
    });

    registerForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = {
        tipo_usuario: roleSelect.value,
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        cedula: document.getElementById('cedula').value,
        direccion: document.getElementById('direccion').value,
        numero_telefono: document.getElementById('telefono').value,
        email: document.getElementById('email').value,
        usuario: document.getElementById('usuario').value,
        contraseña: document.getElementById('contraseña').value,
        confirmarContraseña: document.getElementById('confirmarContraseña').value,
        numero_colegio_medico: document.getElementById('colegioMedico').value || null
      };

      // Validacion basica
      if (!formData.nombre || !formData.apellido || !formData.email || !formData.usuario || !formData.contraseña) {
        alert('Por favor, complete todos los campos requeridos');
        return;
      }

      if (formData.contraseña !== formData.confirmarContraseña) {
        alert('Las contraseñas no coinciden');
        return;
      }

      if (formData.tipo_usuario === 'medico' && !formData.numero_colegio_medico) {
        alert('Por favor, complete el campo Número de Colegio Médico');
        return;
      }

      try {
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        const data = await response.json();
        if (response.ok) {
          alert(data.message);
          window.location.href = 'login.html';
        } else {
          alert('Error al crear la cuenta: ' + data.message);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error al crear la cuenta: ' + error.message);
      }
    });
  }
});

