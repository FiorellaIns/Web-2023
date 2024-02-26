document.addEventListener("DOMContentLoaded", function () 
{
    formulario = document.getElementById("formulario");
    formulario
    boton = document.getElementById("boton");
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

    formulario.addEventListener("submit", function(event) {
        event.preventDefault();
        const peticion = new XMLHttpRequest();
        const formData = new FormData(formulario);
        
        peticion.open("POST", "/enviarDiagnostico", true);
        
        peticion.onreadystatechange = function() {
            if (peticion.readyState === XMLHttpRequest.DONE && peticion.status === 200) {
                let respuesta = JSON.parse(peticion.responseText);
                console.log(respuesta.respuesta);
                if (respuesta.respuesta === "Hecho") 
                    window.location.href = respuesta.url;
                else 
                    mostrarMensajeError("Por favor, complete todos los campos.");
            }
        };
        
        peticion.send(formData);
    });
    
    
    const inputs = document.querySelectorAll('#formulario input, #formulario textarea');
    const mensajeError = document.getElementById('formulario__mensaje');

    /*formulario.addEventListener('submit', function (e) {
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
            //window.location.href = "/paciente";
        }
    });*/

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





