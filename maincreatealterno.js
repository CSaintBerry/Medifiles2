document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menuBtn');
    const menu = document.getElementById('menu');
    if (menuBtn && menu) {
        menuBtn.addEventListener('click', () => {
            menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
        });
    }

    const createForm = document.getElementById('createForm');
    if (createForm) {
        createForm.addEventListener('submit', (e) => {
            e.preventDefault();
            savePatient(createForm, true);
        });
    }

    const guardarBtn = document.getElementById('guardarBtn');
    if (guardarBtn) {
        guardarBtn.addEventListener('click', () => {
            savePatient(createForm, false);
        });
    }

    const referirBtn = document.getElementById('referirBtn');
    if (referirBtn) {
        referirBtn.addEventListener('click', () => {
            showReferenciaModal();
        });
    }

    const imprimirBtn = document.getElementById('imprimirBtn');
    if (imprimirBtn) {
        imprimirBtn.addEventListener('click', () => {
            window.print();
        });
    }

    function savePatient(form, addToQueue) {
        const formData = new FormData(form);
        const patientData = {};
        const clinicalRecordData = {};
    
        const patientFields = {
            nombre_apellido: true,
            edad: true,
            sexo: true,
            fecha_nacimiento: true,
            nombre_madre: true,
            nombre_padre: true,
            edad_madre: true,
            edad_padre: true,
            direccion: true,
            telefono: true,
            created_at: true
        };
    
        formData.forEach((value, key) => {
            if (patientFields.hasOwnProperty(key)) {
                patientData[key] = value;
            } else {
                if (key === 'lactancia_materna' || key === 'formula_complementaria' || 
                    key === 'bcg_recien_nacido' || key === 'hepatitis_recien_nacido' || 
                    key === 'eumenorreica' || key === 'dismenorreica' || 
                    key === 'asma' || key === 'diabetes') {
                    clinicalRecordData[key] = value === '1';
                } else {
                    clinicalRecordData[key] = value;
                }
            }
        });
    
        console.log('patients', patientData);
        console.log('clinicalrecords', clinicalRecordData);
    
        // Guardar en tabla patients
        fetch('/patients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(patientData)
        })
        .then(response => response.json())
        .then(result => {
            console.log('Result from /patients:', result);
            if (result.patient) {
                alert('Paciente guardado exitosamente en pacientes');
    
                // Guardar en tabla clinicalrecords
                clinicalRecordData.patient_id = result.patient.id;
                return fetch('/clinicalrecords', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(clinicalRecordData)
                });
            } else {
                throw new Error(result.error || 'Unknown error');
            }
        })
        .then(response => response.json())
        .then(result => {
            console.log('Result from /clinicalrecords:', result);
            if (result.message) {
                alert('Historia clínica guardada exitosamente en clinicalrecords');
                if (addToQueue) {
                    addToQueue(patientData);
                }
            } else {
                alert('Error al guardar la historia clínica: ' + (result.error || 'Unknown error'));
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error: ' + error.message);
        });
    }

    function addToQueue(patientData) {
        fetch('/clinicalrecords/addToQueue', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(patientData)
        })
        .then(response => response.json())
        .then(result => {
            console.log('Result from /clinicalrecords/addToQueue:', result);
            if (result.message) {
                alert('Paciente añadido a la cola');
            } else {
                alert('Error al añadir a la cola: ' + (result.error || 'Unknown error'));
            }
        })
        .catch(error => {
            console.error('Error adding to queue:', error);
            alert('Error al añadir a la cola');
        });
    }

    function showReferenciaModal() {
        const nombre = document.getElementById('nombre_apellido').value;
        const sexo = document.getElementById('sexo').value;
        const edad = document.getElementById('edad').value;

        document.getElementById('nombre_apellido').innerText = nombre;
        document.getElementById('sexo').innerText = sexo;
        document.getElementById('edad').innerText = edad;

        const modal = document.getElementById('referenciaModal');
        modal.style.display = 'block';

        const closeBtn = modal.querySelector('.close');
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        const imprimirReferenciaBtn = document.getElementById('imprimirReferenciaBtn');
        imprimirReferenciaBtn.addEventListener('click', () => {
            window.print();
        });
    }

    // Perfil
    const profileBtn = document.getElementById('profileBtn');
    if (profileBtn) {
        profileBtn.addEventListener('click', () => {
            alert('Perfil del usuario');
        });
    }

    // Salir
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            // Lógica para cerrar sesión
            window.location.href = 'login.html';
        });
    }
});

