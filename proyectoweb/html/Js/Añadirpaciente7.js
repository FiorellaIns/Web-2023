
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", function (event) {

      const nombre = document.querySelector('#nombre').value;
      if (nombre.trim() === "") {
        alert("Por favor, ingrese un Nombre.");
        event.preventDefault();
        return false;
      }

      const apellido = document.querySelector('#apellido').value;
      if (apellido.trim() === "") {
        alert("Por favor, ingrese un Apellido.");
        event.preventDefault();
        return false;
      }

      
      return true;
    });
  });


