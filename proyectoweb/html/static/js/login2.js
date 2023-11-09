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
      window.location.href = "olvidelaconta.html"; 
  });

  registrarseLink.addEventListener("click", function() {
      window.location.href = "registrarse1.html"; 
  });
});