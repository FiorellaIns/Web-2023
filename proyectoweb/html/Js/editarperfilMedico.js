document.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector("form");

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const email = document.getElementById("email").value.trim();

    if (nombre === "" || apellido === "" || email === "") {
      mostrarMensaje("Por favor, complete todos los campos.");
    } else if (!validarEmail(email)) {
      mostrarMensaje("Ingrese una dirección de correo electrónico válida.");
    } else {
      //mandar a sql.
      window.location.href = "perfilMedico.html"; 
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
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
});
