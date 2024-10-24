import { userController } from "./userController.js";

const btnRegister = document.getElementById('btn-register');
const btnLogin = document.getElementById('btn-login');

function getUsersFromLocalStorage() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

function showAlert(message, type = 'error', duration = 3000) {
    const alertBox = document.getElementById('custom-alert');
    alertBox.textContent = message;
    alertBox.className = `alert ${type}`;
    alertBox.classList.remove('hidden');

    setTimeout(() => {
        alertBox.classList.add('hidden');
    }, duration);
}

btnRegister.addEventListener('click', function (event) {
    event.preventDefault();

    const userName = document.querySelector('#user-name').value;
    const userEmail = document.querySelector('#user-email').value;
    const userPhone = document.querySelector('#user-phone').value;
    const userPassword = document.querySelector('#user-password').value;

    if (!userName || !userEmail || !userPhone || !userPassword) {
        showAlert('Por favor, completa todos los campos.', 'error');
        return;
    } else {
        const users = getUsersFromLocalStorage();
        const userExists = users.find(u => u.userEmail === userEmail);
        if (userExists) {
            showAlert('El usuario ya está registrado.', 'error');
            return;
        }

        const newUser = userController.addUser(userName, userEmail, userPhone, userPassword);
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        showAlert('¡Usuario registrado correctamente!', 'success');

        document.querySelector('#user-name').value = '';
        document.querySelector('#user-email').value = '';
        document.querySelector('#user-phone').value = '';
        document.querySelector('#user-password').value = '';
    }
});

btnLogin.addEventListener('click', function (event) {
    event.preventDefault();

    const email = document.querySelector('#login-email').value;
    const password = document.querySelector('#login-password').value;
    const users = getUsersFromLocalStorage();
    let decodedPassword = '';
    const shift = 3;

    for (let i = 0; i < password.length; i++) {
        const charCode = password.charCodeAt(i);
        const newCharCode = charCode + shift;
        decodedPassword += String.fromCharCode(newCharCode);
    }

    const user = users.find(u => u.userEmail === email && u.userPassword === decodedPassword);

    if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        localStorage.setItem('welcomeMessage', '¡Bienvenido a chopper!');
        window.location.href = '../pages/home.html';
    } else {
        showAlert('Correo electronico o contraseña incorrectos.', 'error');
    }

    document.querySelector('#login-email').value = '';
    document.querySelector('#login-password').value = '';
});

window.addEventListener('beforeunload', function() {
    document.querySelector('#user-name').value = '';
    document.querySelector('#user-email').value = '';
    document.querySelector('#user-phone').value = '';
    document.querySelector('#user-password').value = '';
    document.querySelector('#login-email').value = '';
    document.querySelector('#login-password').value = '';
});



