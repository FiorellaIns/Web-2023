const SOLICITUDHECHA = 4;
const RESPUESTAEXITOSA = 200;

document.addEventListener("DOMContentLoaded", function() {
    const input = document.getElementById("buscador");
    const table = document.getElementById("miTabla");

    input.addEventListener("input", function() {
        const filtro = input.value.toLowerCase();
        const filas = table.querySelectorAll("tbody tr");

        for (let i = 0; i < filas.length; i++) {
            const tds = filas[i].querySelectorAll("td");
            let filaCoincide = false;

            for (let j = 0; j < tds.length; j++) {
                const valorCriterio = tds[j].textContent.toLowerCase();
                if (valorCriterio.includes(filtro)) {
                    filaCoincide = true;
                    break;
                }
            }

            if (filaCoincide) {
                filas[i].classList.remove("oculto");
            } else {
                filas[i].classList.add("oculto");
            }
        }
    });

    // Hacer la solicitud AJAX al cargar la página
    const peticion = new XMLHttpRequest();
    peticion.open("GET", "/ObtenerPacientes");
    peticion.onreadystatechange = function() {
        if (peticion.readyState === SOLICITUDHECHA && peticion.status === RESPUESTAEXITOSA) {
            const respuesta = JSON.parse(peticion.responseText);
            actualizarTabla(respuesta);
        }
    };
    peticion.send();

    const links = document.querySelectorAll(".fila");
    links.forEach(function(link) {
        link.addEventListener("click", function(event) {
            const targetId = event.target.id;
            let url = "/paciente";
            window.location.href = url;
        });
    });

    const volver = document.querySelectorAll("#volver");
    volver.forEach(function(button) {
        button.addEventListener("click", function(event) {
            let url = "/index";
            window.location.href = url;
        });
    });

    const añadir = document.querySelectorAll("#añadirpaciente");
    añadir.forEach(function(button) {
        button.addEventListener("click", function(event) {
            let url = "/añadir_paciente";
            window.location.href = url;
        });
    });
});

function actualizarTabla(datos) {
    const tablaBody = document.getElementById("miTabla").getElementsByTagName("tbody")[0];
    // Eliminar filas existentes de la tabla
    while (tablaBody.firstChild) {
        tablaBody.removeChild(tablaBody.firstChild);
    }
    // Crear y agregar nuevas filas con los datos recibidos
    datos.forEach(function(paciente) {
        const fila = document.createElement("tr");
        const celdaNombre = document.createElement("td");
        celdaNombre.textContent = paciente.nombre;
        // Agregar más celdas según sea necesario para otros datos del paciente
        fila.appendChild(celdaNombre);
        tablaBody.appendChild(fila);
    });
}
