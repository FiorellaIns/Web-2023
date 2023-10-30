document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formulario");
  const mensajeError = document.getElementById("mensaje-error");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const dni = document.getElementById("dni").value;
    const nrodeafiliado = document.getElementById("nrodeafiliado").value;
    const obrasocial = document.getElementById("obrasocial").value;
    const domicilio = document.getElementById("Domicilio").value;
    
    if (nombre && apellido && dni && nrodeafiliado && obrasocial && domicilio) {
      window.location.href = "tabla.html";
    } else {
      mensajeError.textContent = "Por favor, complete todos los campos.";
    }
  });
});