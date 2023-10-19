document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formulario");
  console.log(form)
  form.addEventListener("submit", function (event) {
    const nombre = document.getElementById('nombre');
    const apellido = document.getElementById('apellido');
    const nrodeafiliado = document.getElementById('nrodeafiliado');
    const nrodecelular = document.getElementById('nrodecelular');
    const nrodetelefono = document.getElementById('nrodetelefono');
    const Domicilio = document.getElementById('Domicilio');

    console.log(Domicilio);

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
    console.log("Hola");
    event.preventDefault();
    return retorno;
  });
});
