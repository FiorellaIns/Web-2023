document.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector("form");

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const email = document.getElementById("email").value.trim();
    const pacientes = document.getElementById("pacientes").value;

    if (nombre === "" || apellido === "" || email === "" || pacientes === "") {
      mostrarMensaje("Por favor, complete todos los campos.");
    } else if (!validarEmail(email)) {
      mostrarMensaje("Ingrese una dirección de correo electrónico válida.");
    } else if (pacientes < 0) {
      mostrarMensaje("El número de pacientes no puede ser negativo.");
    } else {
      // Aquí puedes enviar el formulario o realizar otras acciones.
      // Por ejemplo, puedes usar AJAX para enviar los datos al servidor.

      // Cerrar la ventana o pestaña actual
      window.close();
    }
  });

  function mostrarMensaje(mensaje) {
    const mensajeDiv = document.createElement("div");
    mensajeDiv.textContent = mensaje;
    mensajeDiv.classList.add("mensaje");
    form.appendChild(mensajeDiv);

    setTimeout(function() {
      mensajeDiv.remove();
    }, 3000);
  }

  function validarEmail(email) {
    // Validación simple de dirección de correo electrónico.
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
});
