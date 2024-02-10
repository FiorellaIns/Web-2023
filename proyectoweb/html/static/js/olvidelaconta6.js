const formulario = document.getElementById('olvCon-form');
const emailInput = document.getElementById('email');

document.addEventListener("DOMContentLoaded", function() {
  const volver = document.getElementById("volver");

  if (volver) {
    volver.addEventListener("click", function() {
      if(window.location.href.indexOf("http://") === 0 || window.location.href.indexOf("https://") === 0)
        window.location.href = "/";
      else
        window.location.href = "login.html";
    });
  }
});


const expresionEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/ ;

const validarEmail = () => {
  if (expresionEmail.test(emailInput.value)) {
    document.getElementById('grupo__email').classList.remove('formulario__grupo_incorrecto');
    document.getElementById('grupo__email').classList.add('formulario__grupo_correcto');
    document.querySelector('#grupo__email .olvCon__input_error').classList.remove('olvCon__input_error_activo');
  } else {
    document.getElementById('grupo__email').classList.add('formulario__grupo_incorrecto');
    document.getElementById('grupo__email').classList.remove('formulario__grupo_correcto');
    document.querySelector('#grupo__email .olvCon__input_error').classList.add('olvCon__input_error_activo');
  }
};

emailInput.addEventListener('keyup', validarEmail);
emailInput.addEventListener('blur', validarEmail);

formulario.addEventListener('submit', (e) => {
  e.preventDefault();

  if (expresionEmail.test(emailInput.value)) {
    formulario.reset();
    window.location.href = 'login.html';
    document.getElementById('form_msj_exito').classList.add('form_msj_exito_activo');
    setTimeout(() => {
      document.getElementById('form_msj_exito').classList.remove('form_msj_exito_activo');
    }, 5000);

    document.querySelectorAll('.formulario__grupo_correcto').forEach((margen) => {
      margen.classList.remove('formulario__grupo_correcto');
    });
  } else {
    document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
    setTimeout(() => {
      document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
    }, 6000);
  }
});

document.addEventListener("DOMContentLoaded", function() {
  const links = document.querySelectorAll(".reg");

  links.forEach(function(link) {
      link.addEventListener("click", function(event) {
          const targetId = event.target.id;
          let url = "";

          if (targetId === "volver") {
              url = "/";
          }
          window.location.href = url;
      });
  });
});