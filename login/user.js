import { userController } from "./userController.js"; // Asegúrate de tener el import correcto

const btnRegister = document.getElementById('btn-register');
const btnLogin = document.getElementById('btn-login');

// Función para obtener los usuarios del localStorage
function getUsersFromLocalStorage() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

// Función para guardar los usuarios en el localStorage
function saveUsersToLocalStorage(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Registro de usuario
btnRegister.addEventListener('click', function (event) {
    event.preventDefault();

    const userName = document.querySelector('#user-name').value;
    const userEmail = document.querySelector('#user-email').value;
    const userPhone = document.querySelector('#user-phone').value;
    const userPassword = document.querySelector('#user-password').value;

    if (!userName || !userEmail || !userPhone || !userPassword) {
        alert('Por favor, completa todos los campos.');
        return;
    } else {
        const users = getUsersFromLocalStorage();


        // Verifica si el usuario ya existe
        const userExists = users.find(u => u.userEmail === userEmail);
        if (userExists) {
            alert('El usuario ya está registrado.');
            return;
        }

        // Crea el nuevo usuario
        const newUser = userController.addUser(userName, userEmail, userPhone, userPassword)

        // Agrega el nuevo usuario y guarda en localStorage
        users.push(newUser);
        saveUsersToLocalStorage(users);

        alert('¡Usuario registrado correctamente!');
    }
});

// Inicio de sesión
btnLogin.addEventListener('click', function (event) {
   
    event.preventDefault();

    const email = document.querySelector('#login-email').value;
    const password = document.querySelector('#login-password').value;
    const users = getUsersFromLocalStorage();
    let decodedPassword = '';
    const shift = 3; // Número que defines para cambiar la posición de cada carácter (puede ser cualquier valor)

    for (let i = 0; i < password.length; i++) {
        const charCode = password.charCodeAt(i); // Obtener el código ASCII del carácter
        const newCharCode = charCode + shift; // Cambiar la posición sumando un valor al código ASCII
        decodedPassword += String.fromCharCode(newCharCode); // Convertir el nuevo código ASCII de vuelta a carácter

    }

    const user = users.find(u => u.userEmail === email && u.userPassword === decodedPassword);

    if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        window.location.href = '../pages/home.html';
    } else {
        alert('Correo o contraseña incorrectos.');

    }

});


