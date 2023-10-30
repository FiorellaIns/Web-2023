document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formulario");
  const mensajeError = document.getElementById("mensaje-error");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    
    const nombre = document.getElementById("Fecha").value;
    const apellido = document.getElementById("Motivo").value;
    const dni = document.getElementById("Nombre").value;
    const nrodeafiliado = document.getElementById("Diag").value;
    const obrasocial = document.getElementById("Descri").value;
    if (nombre && apellido && dni && nrodeafiliado && obrasocial ) {
      window.location.href = "paciente.html";
    } else {
      mensajeError.textContent = "Por favor, complete todos los campos.";
    }
  });
});
  