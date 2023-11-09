<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> parent of 588cdcd (aa)
const formulario = document.getElementById('login-form');
const emailinput = document.getElementById('email');

const expresionEmail =  /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/ ;


emailinput.addEventListener('keyup', validarEmail);
emailinput.addEventListener('blur', validarEmail);


const validarEmail = () => {
  if (expresionEmail.test(emailinput.value)) {
    document.querySelector('#grupo__email .log__form__input_error').classList.remove('log__form__input_error_activo');
  } else {
    document.querySelector('#grupo__email .log__form__input_error').classList.add('log__form__input_error_activo');
  }
};

formulario.addEventListener('submit', (e) => {
  e.preventDefault();

  if (expresionEmail.test(emailinput.value)) {
    formulario.reset();
    window.location.href = 'index.html';
  } 
<<<<<<< HEAD
});

>>>>>>> parent of 588cdcd (aa)
document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.getElementById("login-form");
  const emailinput = document.getElementById("email");
  const expresionEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;

<<<<<<< HEAD
  emailinput.addEventListener('keyup', validarEmail);
  emailinput.addEventListener('blur', validarEmail);

  function validarEmail() {
    if (expresionEmail.test(emailinput.value)) {
      document.querySelector('#grupo_email .log__form__input_error').classList.remove('log__form__input_error_activo');
    } else {
      document.querySelector('#grupo_email .log__form__input_error').classList.add('log__form__input_error_activo');
    }
  }

  formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    if (expresionEmail.test(emailinput.value)) {
      formulario.reset();
      if (window.location.href.indexOf("http://") === 0 || window.location.href.indexOf("https://") === 0) {
        window.location.href = "/";
      } else {
        window.location.href = "index.html";
      }
    }
=======
  formulario.addEventListener("submit", function (event) {
    window.location.href="index.html";
>>>>>>> parent of 588cdcd (aa)
  });

  const olvideContraLink = document.getElementById("olvideContra");
  const registrarseLink = document.getElementById("registrarse");

  olvideContraLink.addEventListener("click", function() {
<<<<<<< HEAD
    if (window.location.href.indexOf("http://") === 0 || window.location.href.indexOf("https://") === 0) {
      window.location.href = "/olvidelacontraseña";
    } else {
      window.location.href = "olvidelaconta.html";
    }
  });

  registrarseLink.addEventListener("click", function() {
    if (window.location.href.indexOf("http://") === 0 || window.location.href.indexOf("https://") === 0) {
      window.location.href = "/registro";
    } else {
      window.location.href = "registrarse1.html";
    }
  });
});
=======
=======
});

document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.getElementById("login-form");
  const mensajeError = document.getElementById("mensaje-error");

  formulario.addEventListener("submit", function (event) {
    window.location.href="index.html";
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const olvideContraLink = document.getElementById("olvideContra");
  const registrarseLink = document.getElementById("registrarse");
  
  olvideContraLink.addEventListener("click", function() {
>>>>>>> parent of 588cdcd (aa)
    window.location.href = "olvidelaconta.html"; 
  });

  registrarseLink.addEventListener("click", function() {
    window.location.href = "registrarse1.html"; 
  });
<<<<<<< HEAD
});
>>>>>>> parent of 588cdcd (aa)
=======
});
>>>>>>> parent of 588cdcd (aa)
