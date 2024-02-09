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
    } else if (!validarNombreApellido(nombre) || !validarNombreApellido(apellido)) {
      mostrarMensaje("El nombre y el apellido no pueden contener números.");
    } else {
      window.location.href = "/perfil_medico";
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
    const regex = /^[a-zA-ZÀ-ÿ0-9._-]+@[a-zA-ZÀ-ÿ0-9.-]+\.[a-zA-ZÀ-ÿ]{2,}$/;
    return regex.test(email);
  }

  function validarNombreApellido(valor) {
    const regex = /^[a-zA-ZÀ-ÿ\s]+$/;
    return regex.test(valor);
  }
});

document.addEventListener("DOMContentLoaded", function() {
  const volver = document.getElementById("volver");

  if (volver) {
    volver.addEventListener("click", function() {
      window.location.href = "/perfil_medico";
    });
  }
});
