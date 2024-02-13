const SOLICITUDHECHA = 4;
const RESPUESTAEXITOSA = 200;

document.addEventListener("DOMContentLoaded", function() {
    const miTabla = document.getElementById("miTabla");

    // Escuchar clics en la tabla
    miTabla.addEventListener("click", function(evento) {
        const objetivo = evento.target;
        if (objetivo.tagName.toLowerCase() === "td") {
            // Aquí puedes agregar lógica para manejar el clic en una celda de la tabla
        }
    });

    // Hacer la solicitud AJAX al cargar la página
    const peticion = new XMLHttpRequest();
    peticion.open("GET", "/ObtenerPacientes");
    peticion.onreadystatechange = function() {
        if (peticion.readyState === SOLICITUDHECHA && peticion.status === RESPUESTAEXITOSA) {
            // Aquí puedes manejar los datos recibidos del servidor
            const respuesta = JSON.parse(peticion.responseText);
            // Por ejemplo, podrías actualizar la tabla con los datos recibidos
            actualizarTabla(respuesta);
        }
    };
    peticion.send();
});

function actualizarTabla(datos) {
    const tablaBody = document.getElementById("tabla");
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
