document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  form.addEventListener("submit", function (event) {
    const nombre = document.querySelector('#nombre').value;
    const apellido = document.querySelector('#apellido').value;
    const nrodeafiliado = document.querySelector('#nrodeafiliado').value;
    const nrodecelular = document.querySelector('#nrodecelular').value;
    const nrodetelefono = document.querySelector('#nrodetelefono').value;
    const Domicilio = document.querySelector('#Domicilio').value;

    if (nombre.trim() === "") {
      alert("Por favor, ingrese el nombre.");
      event.preventDefault();
      retorno = false;
    }
    if (apellido.trim() === "") {
      alert("Por favor, ingrese el apellido.");
      event.preventDefault();
      retorno = false;
    }
    if (nrodeafiliado.trim() === "") {
      alert("Por favor, ingrese el Nro de Afiliado.");
      event.preventDefault();
      retorno = false;
    }

    if (nrodecelular.trim() === "") {
      alert("Por favor, ingrese el Nro de Celular.");
      event.preventDefault();
      retorno = false;
    }

    if (nrodetelefono.trim() === "") {
      alert("Por favor, ingrese el Nro de Teléfono.");
      event.preventDefault();
      retorno = false;
    }
    if (Domicilio.trim() === "") {
      alert("Por favor, ingrese el Domicilio.");
      event.preventDefault();
      retorno = false;
    }

    return retorno;
  });
});
