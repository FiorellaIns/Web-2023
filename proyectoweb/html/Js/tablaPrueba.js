document.addEventListener("DOMContentLoaded", function() {
  const input = document.getElementById("buscador");
  const criterio = document.getElementById("criterio");
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
        filas[i].style.display = "";
      } else {
        filas[i].style.display = "none";
      }
    }
  });

  table.addEventListener("click", function(event) {
    const target = event.target.closest("tr[data-href]");
    if (target) {
      const url = target.getAttribute("data-href");
      window.location.href = url;
    }
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const volver = document.getElementById("volver");

  if (volver) {
    volver.addEventListener("click", function() {
      window.location.href = "index.html";
    });
  }
});

document.addEventListener("DOMContentLoaded", function() {
  const añadirpaciente = document.getElementById("añadirpaciente");

  if (añadirpaciente) {
    añadirpaciente.addEventListener("click", function() {
      window.location.href = "Añadirpaciente.html";
    });
  }
});
