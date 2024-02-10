document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.getElementById('formulario');
  const inputs = document.querySelectorAll('#formulario input, #formulario textarea');
  const mensajeError = document.getElementById('formulario__mensaje');

  formulario.addEventListener('submit', function (e) {
      e.preventDefault();

      let formularioCompleto = true;

      inputs.forEach(input => {
          if (!input.value.trim()) {
              formularioCompleto = false;
              mostrarMensajeError();
          } else {
              ocultarMensajeError();
          }
      });

      if (formularioCompleto) {
          formulario.reset();
          window.location.href = "paciente.html";
      } else {
          mostrarMensajeGeneral("Por favor, complete todos los campos.");
      }
  });

  function mostrarMensajeError() {
      mensajeError.classList.remove('oculto');
      mensajeError.classList.add('visible');
  }

  function ocultarMensajeError() {
      mensajeError.classList.remove('visible');
      mensajeError.classList.add('oculto');
  }

  function mostrarMensajeGeneral(mensaje) {
      mensajeError.textContent = mensaje;
      mostrarMensajeError();
      setTimeout(() => {
          ocultarMensajeError();
      }, 3000);
  }
});
