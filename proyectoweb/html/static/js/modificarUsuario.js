document.addEventListener("DOMContentLoaded", function(evento) {
    const REQUEST_DONE = 4;
    const SUCCESS_STATUS = 200;
    
    const volver = document.getElementById("volver");
    volver.addEventListener("click", function(event) {
        const peticion = new XMLHttpRequest();
        peticion.open("POST", "/redireccion", true);
        peticion.setRequestHeader("Content-Type", "application/json");
        peticion.onreadystatechange = function() {
            if (peticion.readyState === REQUEST_DONE && peticion.status === SUCCESS_STATUS) {
                let respuesta = JSON.parse(peticion.responseText);
                window.location.href = respuesta.url;
            }
        };
        peticion.send(JSON.stringify({"peticion": "tabla_admin"}));
    });
    
    const form = document.querySelector("form");
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const nombre = document.getElementById("nombre").value.trim();
        const apellido = document.getElementById("apellido").value.trim();
        const dni = document.getElementById("dni").value.trim();
        const matricula = document.getElementById("matricula").value.trim();
        const usuario = document.getElementById("usuario").value.trim();
        const contrasenia = document.getElementById("contrasenia").value.trim();
        const email = document.getElementById("email").value.trim();
        
        const nombreExpReg = /^[a-zA-ZÀ-ÿ\s]+$/;
        const apellidoExpReg = /^[a-zA-ZÀ-ÿ\s]+$/;
        const dniExpReg = /^\d+$/; 
        const matriculaExpReg = /^\d+$/; 
        const emailExpReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

        if (nombre === "" || apellido === "" || dni === "" || matricula === "" || usuario === "" || contrasenia === "" || email === "") {
            mostrarMensaje("Por favor, complete todos los campos.");
        } else if (!nombreExpReg.test(nombre) || !apellidoExpReg.test(apellido) || !dniExpReg.test(dni) || !matriculaExpReg.test(matricula) || !emailExpReg.test(email)) {
            mostrarMensaje("Por favor, ingrese valores válidos para los campos.");
        } else {
            const peticion = new XMLHttpRequest();
            peticion.open("POST", "/redireccion", true);
            peticion.setRequestHeader("Content-Type", "application/json");
            peticion.onreadystatechange = function() {
                if (peticion.readyState === REQUEST_DONE && peticion.status === SUCCESS_STATUS) {
                    const peticionEdicion = new XMLHttpRequest();
                    peticionEdicion.open("POST", "/Edita_datos_usuario", true);
                    const formatoDeData = new FormData(document.getElementById("form"));
                    peticionEdicion.onreadystatechange = function() {
                        if (peticionEdicion.readyState === REQUEST_DONE && peticionEdicion.status === SUCCESS_STATUS) {
                            const respuestaEdicion = JSON.parse(peticionEdicion.responseText);
                        }
                    };
                    peticionEdicion.send(formatoDeData);
                    let respuesta = JSON.parse(peticion.responseText);
                    setTimeout(function() {
                      //window.location.href = respuesta.url;
                  }, 100);
                }
            };
            peticion.send(JSON.stringify({"peticion": "tabla_admin"}));
        }
    });
    
    function mostrarMensaje(mensaje) {
        const mensajeDiv = document.getElementById("error-mensaje");
        mensajeDiv.textContent = mensaje;
        mensajeDiv.style.display = "block";

        setTimeout(function() {
            mensajeDiv.style.display = "none";
        }, 3000);
    }
});
