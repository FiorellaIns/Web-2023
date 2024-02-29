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
            }
        };
        peticion.send(JSON.stringify({"peticion": "Perfil_Del_Medico"}));
    });
});
