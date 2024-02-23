document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll(".reg");
    const SOLICITUDHECHA = 4;
    const RESPUESTAEXITOSA = 200;
    links.forEach(function(link) {
        link.addEventListener("click", function(event) {
            const targetId = event.target.id;
            if (targetId === "paciente") {
                peticion = new XMLHttpRequest(); 
                peticion.open("POST", "/redireccion", true);
                peticion.setRequestHeader("Content-Type", "application/json");
                peticion.onreadystatechange = function() {
                    if (peticion.readyState === SOLICITUDHECHA && peticion.status === RESPUESTAEXITOSA) {
                        let respuesta = JSON.parse(peticion.responseText);
                        window.location.href = respuesta.url; 
                    }
                };
                peticion.send(JSON.stringify({"peticion": "Tabla_Pacientes"}));
            } 
            else if (targetId === "Perfil") {
                peticion = new XMLHttpRequest(); 
                peticion.open("POST", "/redireccion", true);
                peticion.setRequestHeader("Content-Type", "application/json");
                peticion.onreadystatechange = function() {
                    if (peticion.readyState === SOLICITUDHECHA && peticion.status === RESPUESTAEXITOSA) {
                        let respuesta = JSON.parse(peticion.responseText);
                        window.location.href = respuesta.url; 
                    }
                };
                peticion.send(JSON.stringify({"peticion": "Perfil_Del_Medico"}));
            }
            else if (targetId === "cerrar") {
                const url = "/";
                peticion = new XMLHttpRequest();
                peticion.open("GET", "/CerrarSeccion", true);
                peticion.onreadystatechange = function() {
                    if (peticion.readyState === SOLICITUDHECHA && peticion.status === RESPUESTAEXITOSA) {
                        let respuesta = JSON.parse(peticion.responseText);
                        if (respuesta.exito) {
                            window.location.href = url;
                        } else {
                            alert("Ha ocurrido un error...");
                        }
                    }
                };
                peticion.send();
            }
        });
    });
});