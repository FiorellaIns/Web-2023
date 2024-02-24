document.addEventListener("DOMContentLoaded", function () {
    const fechaInput = document.getElementById('Fecha');
    const fechaHoy = new Date().toISOString().split('T')[0]; // Obtiene la fecha actual en formato ISO
    fechaInput.setAttribute('value', fechaHoy); // Establece el valor del campo de fecha

    const volver = document.getElementById("volver");
    if (volver) {
        volver.addEventListener("click", function () {
            window.location.href = "/paciente";
        });
    }

    
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
            window.location.href = "/paciente";
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

    const SOLICITUDHECHA = 4;
    const RESPUESTAEXITOSA = 200;
    
    volver.addEventListener("click", function(event) {
      const peticion = new XMLHttpRequest();
      peticion.open("POST", "/enviarDiagnostico", true);
      peticion.setRequestHeader("Content-Type", "application/json");
      peticion.onreadystatechange = function() {
          if (peticion.readyState === SOLICITUDHECHA && peticion.status === RESPUESTAEXITOSA) {
              let respuesta = JSON.parse(peticion.responseText);
              window.location.href = respuesta.url;}};
        peticion.send(JSON.stringify({"peticion": "volverT"}));
  });
});