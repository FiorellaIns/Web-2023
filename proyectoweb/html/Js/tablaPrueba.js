const input = document.getElementById("buscador");
const criterio = document.getElementById("criterio");
const table = document.getElementById("miTabla");

input.addEventListener("input", function() {
  const filtro = input.value.toLowerCase();
  const filas = table.getElementsByTagName("tr");

  for (let i = 1; i < filas.length; i++) {
    const valorCriterio = filas[i].querySelector(`td:nth-child(${criterio.value})`).textContent.toLowerCase();
    if (valorCriterio.includes(filtro)) {
      filas[i].style.display = "";
    } else {
      filas[i].style.display = "none";
    }
  }
});

document.addEventListener("DOMContentLoaded", function() {
  const table = document.getElementById("miTabla");

  if (table) {
    table.addEventListener("click", function(event) {
      const target = event.target.closest("tr[data-href]");
      if (target) {
        const url = target.getAttribute("data-href");
        window.location.href = url;
      }
    });
  }
});

