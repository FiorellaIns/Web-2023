document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formulario");
  form.addEventListener("submit", function (event) {
    const nombre = document.getElementById('nombre');
    const apellido = document.getElementById('apellido');
    const nrodeafiliado = document.getElementById('nrodeafiliado');
    const nrodecelular = document.getElementById('nrodecelular');
    const nrodetelefono = document.getElementById('Domicilio');
    const Domicilio = document.getElementById('Fechadeprimeraconsulta');

    var retorno = true;

    if (nombre.value === "") {
      alert("Por favor, ingrese el nombre.");
      event.preventDefault();
      retorno = false;
    }
    if (apellido.value === "") {
      alert("Por favor, ingrese el apellido.");
      event.preventDefault();
      retorno = false;
    }
    if (nrodeafiliado.value === "") {
      alert("Por favor, ingrese el Nro de Afiliado.");
      event.preventDefault();
      retorno = false;
    }

    if (nrodecelular.value === "") {
      alert("Por favor, ingrese el Nro de Celular.");
      event.preventDefault();
      retorno = false;
    }

    if (nrodetelefono.value === "") {
      alert("Por favor, ingrese el Nro de Teléfono.");
      event.preventDefault();
      retorno = false;
    }
    if (Domicilio.value === "") {
      alert("Por favor, ingrese el Domicilio.");
      event.preventDefault();
      retorno = false;
    }
    
    return retorno;
  });
});
