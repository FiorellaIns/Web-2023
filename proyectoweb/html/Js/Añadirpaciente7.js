
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", function (event) {
      var retorno = true;
      const nombre = document.querySelector('#nombre').value;
      const apellido = document.querySelector('#apellido').value;
      if(apellido.trim() == "" && nombre.trim() == "")
      {
        alert("Por favor ingrese nombre y apellido.");
        event.preventDefault();
        retorno = false;
      }
      else if (apellido.trim() === "") {
        alert("Por favor, ingrese un Apellido.");
        event.preventDefault();
        retorno = false;
      } 
      else if (nombre.trim() === "") {
        alert("Por favor, ingrese un Nombre.");
        event.preventDefault();
        retorno = false;
      }
      return retorno;
    });
  });


