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
      window.location.href = "/a";
    else 
      window.location.href = "index.html";
  }
});

document.addEventListener("DOMContentLoaded", function() {
  const links = document.querySelectorAll(".reg");

  links.forEach(function(link) {
      link.addEventListener("click", function(event) {
          const targetId = event.target.id;
          let url = "";

          if (targetId === "olvideContra") {
              url = "/olvidado";
          } else if (targetId === "registrarse") {
              url = "/registro";
          }
          window.location.href = url;
      });
  });
});