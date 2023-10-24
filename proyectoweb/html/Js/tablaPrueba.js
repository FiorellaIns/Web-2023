document.addEventListener("DOMContentLoaded", function() {
  const input = document.getElementById("buscador");
  const criterio = document.getElementById("criterio");
  const table = document.getElementById("miTabla");
  
  input.addEventListener("input", function() {
    const filtro = input.value.toLowerCase();
    const filas = table.querySelectorAll("tbody tr");
  
    filas.forEach(function(fila) {
      const tds = fila.querySelectorAll("td");
      let filaCoincide = false;
      
      tds.forEach(function(td) {
        const valorCriterio = td.textContent.toLowerCase();
        if (valorCriterio.includes(filtro)) {
          filaCoincide = true;
        }
      });
      
      if (filaCoincide) {
        fila.style.display = "";
      } else {
        fila.style.display = "none";
      }
    });
  });

  table.addEventListener("click", function(event) {
    const target = event.target.closest("tr[data-href]");
    if (target) {
      const url = target.getAttribute("data-href");
      window.location.href = url;
    }
  });
});