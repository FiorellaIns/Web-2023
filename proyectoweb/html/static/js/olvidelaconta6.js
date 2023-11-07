const formulario = document.getElementById('login-form');
const inputs = document.querySelectorAll('#login-form input');

const expresion = {
    mail: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
}




document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registro-form");
    const mensajeError = document.getElementById("mensaje-error");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        
        const nombre = document.getElementById("nombre").value;
        const apellido = document.getElementById("apellido").value;
        const dni = document.getElementById("dni").value;
        const matricula = document.getElementById("matricula").value;
        const usuario = document.getElementById("usuario").value;
        const password = document.getElementById("password").value;
        const confirmpassword = document.getElementById("confirm-password").value;
        
        if (nombre && apellido && dni && matricula && usuario && password && confirmpassword) {
            if (password === confirmpassword) {
                window.location.href = "login.html";
            } else {
                mensajeError.textContent = "Contraseña y Confirmar contraseña son distintos.";
                setTimeout(function() {
                    mensajeError.textContent = "";
                }, 3000); // 3000 milisegundos = 3 segundos
            }
        } else {
            mensajeError.textContent = "Complete todos los campos.";
            setTimeout(function() {
                mensajeError.textContent = "";
            }, 3000); // 3000 milisegundos = 3 segundos
        }
    });
});
