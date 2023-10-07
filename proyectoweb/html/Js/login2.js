  document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", function (event) {
      const contrasena = document.querySelector('#contrasena').value;
      const usuario = document.querySelector('#usuario').value;
      var retorno = true;
      if(usuario.trim() === "" && contrasena.trim() === "")
      {
        alert("Por favor, ingrese su usuario y contraseña.");
        event.preventDefault();
        retorno = false;
      }
      else if (usuario.trim() === "") {
        alert("Por favor, ingrese su Usuario.");
        event.preventDefault();
        retorno = false;
      }
      else if (contrasena.trim() === "") {
        alert("Por favor, ingrese su Contraseña.");
        event.preventDefault();
        retorno = false;
      }
      return retorno;
    });
  });

