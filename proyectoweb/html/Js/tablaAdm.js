document.addEventListener("DOMContentLoaded", function() {
    const caja = document.getElementById("caja");
    const inputBusqueda = document.getElementById("busqueda");
    const miTabla = document.getElementById("miTabla");
    const filas = miTabla.getElementsByTagName("tr");

    inputBusqueda.addEventListener("input", function() {
        const criterioSeleccionado = caja.value;
        const valorInput = inputBusqueda.value.toLowerCase();

        for (let i = 1; i < filas.length; i++) {
            let coincide = false;

            if (criterioSeleccionado === "todos") {
                for (let j = 0; j < filas[i].getElementsByTagName("td").length; j++) {
                    const valorCriterio = filas[i].getElementsByTagName("td")[j].textContent.toLowerCase();
                    if (valorCriterio.includes(valorInput)) {
                        coincide = true;
                        break;
                    }
                }
            } else {
                const valorCriterio = filas[i].getElementsByTagName("td")[criterioSeleccionado].textContent.toLowerCase();
                if (valorCriterio.includes(valorInput)) {
                    coincide = true;
                }
            }

            if (coincide) {
                filas[i].style.display = "";
            } else {
                filas[i].style.display = "none";
            }
        }
    });
});