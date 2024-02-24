document.addEventListener("DOMContentLoaded", function () {
    const SOLICITUDHECHA = 4;
    const RESPUESTAEXITOSA = 200;
    
    const fechaInput = document.getElementById('Fecha');
    const fechaHoy = new Date().toISOString().split('T')[0];
    fechaInput.setAttribute('value', fechaHoy);

    const volver = document.getElementById("volver");
    volver.addEventListener("click", function(event) {
        const SOLICITUDHECHA = 4;
        const RESPUESTAEXITOSA = 200;
        const peticion = new XMLHttpRequest();

        peticion.open("POST", "/redireccion", true);
        peticion.setRequestHeader("Content-Type", "application/json");
        peticion.onreadystatechange = function() {
            if (peticion.readyState === SOLICITUDHECHA && peticion.status === RESPUESTAEXITOSA) {
                let respuesta = JSON.parse(peticion.responseText);
                window.location.href = respuesta.url; 
            }
        };
        peticion.send(JSON.stringify({"peticion": "todos_los_pacientes"}));
    });

    boton.addEventListener("click", function(event) {
        const peticion = new XMLHttpRequest();
        const formData = new FormData(document.getElementById("formulario"));
        
        peticion.open("POST", "/enviarDiagnostico", true);
        
        peticion.onreadystatechange = function() {
            if (peticion.readyState === XMLHttpRequest.DONE && peticion.status === 200) {
                let respuesta = JSON.parse(peticion.responseText);
                if (respuesta && respuesta.url) {
                    window.location.href = respuesta.url;
                } else {
                    console.error("El servidor no devolvió una URL válida.");
                }
            }
        };
        
        peticion.send(JSON.stringify(formData));
    });
    
    
    const formulario = document.getElementById('formulario');
    const inputs = document.querySelectorAll('#formulario input, #formulario textarea');
    const mensajeError = document.getElementById('formulario__mensaje');

    formulario.addEventListener('submit', function (e) {
        e.preventDefault();

        let formularioCompleto = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                formularioCompleto = false;
                mostrarMensajeError("Por favor, complete todos los campos.");
            } else {
                ocultarMensajeError();
            }
        });

        if (formularioCompleto) {
            formulario.reset();
            //window.location.href = "/paciente";
        }
    });

    function mostrarMensajeError(mensaje) {
        mensajeError.textContent = mensaje;
        mensajeError.classList.add("visible");
        mensajeError.classList.remove("oculto");

        setTimeout(function () {
            ocultarMensajeError();
        }, 3000);
    }

    function ocultarMensajeError() {
        mensajeError.textContent = "";
        mensajeError.classList.remove("visible");
        mensajeError.classList.add("oculto");
    }
    
    
    
});


