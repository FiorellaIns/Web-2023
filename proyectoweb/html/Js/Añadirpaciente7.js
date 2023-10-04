
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", function (event) {
      // Validación del campo Nombre
      const nombre = document.querySelector('#nombre').value;
      if (nombre.trim() === "") {
        alert("Por favor, ingrese un Nombre.");
        event.preventDefault();
        return false;
      }

      // Validación del campo Apellido
      const apellido = document.querySelector('#apellido').value;
      if (apellido.trim() === "") {
        alert("Por favor, ingrese un Apellido.");
        event.preventDefault();
        return false;
      }

      // Si todas las validaciones son exitosas, el formulario se enviará.
      return true;
    });
  });


