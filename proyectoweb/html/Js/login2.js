  document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", function (event) {
      // Validación del campo Usuario
      const usuario = document.querySelector('#usuario').value;
      if (usuario.trim() === "") {
        alert("Por favor, ingrese su Usuario.");
        event.preventDefault();
        return false;
      }

      // Validación del campo Contraseña
      const contrasena = document.querySelector('#contrasena').value;
      if (contrasena.trim() === "") {
        alert("Por favor, ingrese su Contraseña.");
        event.preventDefault();
        return false;
      }

      return true;
    });
  });

