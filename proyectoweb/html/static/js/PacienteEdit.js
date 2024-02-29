document.addEventListener("DOMContentLoaded", function(evento) {
    const SOLICITUDHECHA = 4;
    const RESPUESTAEXITOSA = 200;
    
    const volver = document.getElementById("volver");
    volver.addEventListener("click", function(event) {
        const peticion = new XMLHttpRequest();
        peticion.open("POST", "/redireccion", true);
        peticion.setRequestHeader("Content-Type", "application/json");
        peticion.onreadystatechange = function() {
            if (peticion.readyState === SOLICITUDHECHA && peticion.status === RESPUESTAEXITOSA) {
                let respuesta = JSON.parse(peticion.responseText);
                window.location.href = respuesta.url;
            }
        };
        peticion.send(JSON.stringify({"peticion": "editar_paciente"}));
    });
    
    const form = document.querySelector("form");
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const nombre = document.getElementById("nombre").value.trim();
        const apellido = document.getElementById("apellido").value.trim();
        const obraSocial = document.getElementById("obra").value.trim();
        const nroAfiliado = document.getElementById("afiliado").value.trim();
        const nroObraSocial = document.getElementById("nro_obra").value.trim();
        const telefono = document.getElementById("tel").value.trim();
        
        const nombreExpReg = /^[a-zA-ZÀ-ÿ\s]+$/;
        const apellidoExpReg = /^[a-zA-ZÀ-ÿ\s]+$/;
        const obraSocialExpReg = /^[a-zA-ZÀ-ÿ\s]+$/;
        const nroAfiliadoExpReg = /^\d+$/; // Expresión regular para verificar que solo hay números
        const nroObraSocialExpReg = /^\d+$/; // Expresión regular para verificar que solo hay números
        const telefonoExpReg = /^\d+$/; // Expresión regular para verificar que solo hay números
        
        if (nombre === "" || apellido === "" || obraSocial === "" || nroAfiliado === "" || nroObraSocial === "" || telefono === "") {
            mostrarMensaje("Por favor, complete todos los campos.");
        } else if (!nombreExpReg.test(nombre) || !apellidoExpReg.test(apellido) || !obraSocialExpReg.test(obraSocial) || !nroAfiliadoExpReg.test(nroAfiliado) || !nroObraSocialExpReg.test(nroObraSocial) || !telefonoExpReg.test(telefono)) {
            mostrarMensaje("Por favor, ingrese valores válidos para los campos.");
        } else {
            const peticion = new XMLHttpRequest();
            peticion.open("POST", "/redireccion", true);
            peticion.setRequestHeader("Content-Type", "application/json");
            peticion.onreadystatechange = function() {
                if (peticion.readyState === 4 && peticion.status === 200) {
                    const peticionEdicion = new XMLHttpRequest();
                    peticionEdicion.open("POST", "/Edita_datos_paciente", true);
                    const formatoDeData = new FormData(document.getElementById("form"));
                    peticionEdicion.onreadystatechange = function() {
                        if (peticionEdicion.readyState === 4 && peticionEdicion.status === 200) {
                            const respuestaEdicion = JSON.parse(peticionEdicion.responseText);
                        }
                    };
                    peticionEdicion.send(formatoDeData);
                    let respuesta = JSON.parse(peticion.responseText);
                    setTimeout(function() {
                      window.location.href = respuesta.url;
                  }, 100);
                }
            };
            peticion.send(JSON.stringify({"peticion": "editar_paciente"}));
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
