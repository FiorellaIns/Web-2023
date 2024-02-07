const emailinput = document.getElementById('email');
const formulario = document.getElementById('login-form');
const expresionEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

function validarEmail() {
  if (expresionEmail.test(emailinput.value)) {
    document.querySelector('#grupo__email .log__form__input_error').classList.remove('log__form__input_error_activo');
  } else {
    document.querySelector('#grupo__email .log__form__input_error').classList.add('log__form__input_error_activo');
  }
}

formulario.addEventListener('submit', (e) => 
{
  e.preventDefault();
  if (expresionEmail.test(emailinput.value)) 
  {
    formulario.reset();

    if (window.location.href.indexOf("http://") === 0 || window.location.href.indexOf("https://") === 0) 
      window.location.href = "/";
    else 
      window.location.href = "index.html";
  }
});

const olvideContraLink = document.getElementById("olvideContra");
const registrarseLink = document.getElementById("registrarse");

olvideContraLink.addEventListener("click", function () {
    window.location.href = "olvidelaconta.html";
});

registrarseLink.addEventListener("click", function () {
    window.location.href = "registrarse1.html";
});
