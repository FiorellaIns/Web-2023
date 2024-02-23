document.addEventListener("DOMContentLoaded", function() {
  const volver = document.getElementById("volver");
  const SOLICITUDHECHA = 4;
  const RESPUESTAEXITOSA = 200;
  
  volver.addEventListener("click", function(event) {
    const peticion = new XMLHttpRequest();
    peticion.open("POST", "/redireccion", true);
    peticion.setRequestHeader("Content-Type", "application/json");
    peticion.onreadystatechange = function() {
        if (peticion.readyState === SOLICITUDHECHA && peticion.status === RESPUESTAEXITOSA) {
            let respuesta = JSON.parse(peticion.responseText);
            window.location.href = respuesta.url;}};
      peticion.send(JSON.stringify({"peticion": "volverT"}));
});

  const formulario = document.getElementById('agregarpaciente-form');
  const inputs = document.querySelectorAll('#agregarpaciente-form input');

  const expresiones = {
      nombre: /^[a-zA-ZÀ-ÿ]{4,16}$/,
      apellido: /^[a-zA-ZÀ-ÿ]{4,40}$/,
      dni: /^\d{7,8}$/,
      numerodeafiliado: /^\d{7,15}$/,
      obraSocial: /^[a-zA-Z0-9]{4,16}$/,
      numObraSocial: /^.{4,12}$/,
      nroTelefono: /^.{4,12}$/,
      email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
  };

  const campos = {
      nombre: false,
      apellido: false,
      dni: false,
      numerodeafiliado: false,
      obraSocial: false,
      numObraSocial: false,
      nroTelefono: false,
      email: false
  };

  const validarFormulario = (e) => {
      switch (e.target.name){
          case "numerodeafiliado":
              validarCampo(expresiones.numerodeafiliado, e.target, 'numerodeafiliado' );
              break;
          case "nombre":
              validarCampo(expresiones.nombre,e.target, 'nombre');
              break;
          case "obraSocial":
              validarCampo(expresiones.obraSocial,e.target, 'obraSocial');
              break;
          case "apellido":
              validarCampo(expresiones.apellido,e.target, 'apellido');
              break;
          case "dni":
              validarCampo(expresiones.dni,e.target, 'dni');
              break;
          case "numObraSocial":
              validarCampo(expresiones.numObraSocial,e.target, 'numObraSocial');
              break;
          case "email":
              validarCampo(expresiones.email,e.target, 'email');
              break;
          case "nroTelefono":
              validarCampo(expresiones.nroTelefono,e.target, 'nroTelefono');
              break;
      }
  }

  const validarCampo = (expresion, input, campo) => {
      if(expresion.test(input.value)){
          document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo_incorrecto');
          document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo_correcto');
          document.querySelector(`#grupo__${campo} .log__form__input_error`).classList.remove('log__form__input_error_activo');
          campos[campo] = true;
      }
      else{
          document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo_incorrecto');
          document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo_correcto');
          document.querySelector(`#grupo__${campo} .log__form__input_error`).classList.add('log__form__input_error_activo');
          campos[campo] = false;
      }
  }

  inputs.forEach((input) => {
      input.addEventListener('keyup', validarFormulario)
      input.addEventListener('blur',validarFormulario)
  });

  formulario.addEventListener('submit', (e) => {
      e.preventDefault();

      if (campos.numObraSocial && campos.obraSocial && campos.nombre && campos.apellido && campos.email && campos.dni && campos.numerodeafiliado && campos.nroTelefono){
          formulario.reset();
          window.location.href = "/tabla";
          document.getElementById('form_msj_exito').classList.add('form_msj_exito_activo');
          setTimeout(() => {
              document.getElementById('form_msj_exito').classList.remove('form_msj_exito_activo');
          }, 5000);
          document.querySelectorAll('.formulario__grupo_correcto').forEach((margen) => {
              margen.classList.remove('formulario__grupo_correcto');
          });
      } else{
          document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
          setTimeout(() => {
              document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
          }, 6000);
      }
  });
});
