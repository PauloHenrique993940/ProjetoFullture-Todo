document.querySelector('.login-form').addEventListener('submit', function(event) {
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Definindo usuário e senha para entrar
    const validUsername = 'admin1';
    const validPassword = 'admin1';

    // Verificação de login
    if (username === validUsername && password === validPassword) {
        sessionStorage.setItem('loggedIn', 'true');
        window.location.href = 'index.html';
    } else {
        alert('Usuário ou senha inválidos');
    }

    event.preventDefault();
});

function checkLogin() {
    if (!sessionStorage.getItem('loggedIn')) {
        window.location.href = 'login.html';
    }
}

document.addEventListener('DOMContentLoaded', checkLogin);


