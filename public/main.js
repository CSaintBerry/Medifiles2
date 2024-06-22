document.addEventListener('DOMContentLoaded', () => {
    // Menu
    const menuBtn = document.getElementById('menuBtn');
    const menu = document.getElementById('menu');
    if (menuBtn && menu) {
        menuBtn.addEventListener('click', () => {
            menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
        });
    }
// Perfil
const profileBtn = document.getElementById('profileBtn');
if (profileBtn) {
    profileBtn.addEventListener('click', () => {
        alert('Perfil del usuario');
    });
}

// SaLir
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        // Lógica para cerrar sesión
        window.location.href = 'login.html';
    });
}
});