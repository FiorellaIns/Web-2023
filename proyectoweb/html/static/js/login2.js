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

function mostrarError() {
  const mensajeError = document.getElementById('mensaje-error');
  const caja = document.getElementById('caja');
  caja.style.display = "block";
  mensajeError.style.display = "block"; 
  
  setTimeout(function () {
    ocultarError();
}, 3000);
}

function ocultarError() {
  const mensajeError = document.getElementById('mensaje-error');
  const caja = document.getElementById('caja');
  caja.style.display = "none";
  mensajeError.style.display = "none";
}

function mostrarError2(mensaje) {
  const mensajeError = document.getElementById('mensaje-error');
  const caja = document.getElementById('caja');
  caja.style.display = "block";
  mensajeError.textContent=mensaje
  mensajeError.style.display = "block"; 
  
  setTimeout(function () {
    ocultarError();
}, 3000);
}

function ocultarError2() {
  const mensajeError = document.getElementById('mensaje-error');
  caja.style.display = "none";
  mensajeError.style.display = "none";
}

formulario.addEventListener('submit', (e) => {
  e.preventDefault();
  if (expresionEmail.test(emailinput.value)) {
    enviarFormulario();
  } else {
    mostrarError();
  }
});

function enviarFormulario() {
  const SOLICITUDHECHA = 4;
  const RESPUESTAEXITOSA = 200;
  const peticion = new XMLHttpRequest();

  const datos = new FormData(formulario);
  peticion.open("POST", "/Acceder", true);
  peticion.onreadystatechange = function() {
    if (peticion.readyState === SOLICITUDHECHA && peticion.status === RESPUESTAEXITOSA) {
      let respuesta = JSON.parse(peticion.responseText);
      if (respuesta.mensaje === "Hecho") {
        window.location.href = respuesta.url;
      } else {
        mostrarError2(respuesta.mensaje);
      }
    }
  };
  peticion.send(datos);
}

document.addEventListener("DOMContentLoaded", function() {
  const links = document.querySelectorAll(".reg");

  links.forEach(function(link) {
    link.addEventListener("click", function(event) {
      const targetId = event.target.id;
      if (targetId === "olvideContra") {
        const SOLICITUDHECHA = 4;
        const RESPUESTAEXITOSA = 200;
        const peticion = new XMLHttpRequest();

        peticion.open("POST", "/redireccion", true);
        peticion.setRequestHeader("Content-Type","application/json");
        peticion.onreadystatechange = function() {
          if (peticion.readyState === SOLICITUDHECHA && peticion.status === RESPUESTAEXITOSA) {
            let respuesta = JSON.parse(peticion.responseText);
            window.location.href = respuesta.url; 
          }
        };
        peticion.send(JSON.stringify({"peticion":"olvide"}));
      } 

       if (targetId === "registrarse") {
        const SOLICITUDHECHA = 4;
        const RESPUESTAEXITOSA = 200;
        const peticion = new XMLHttpRequest();

        peticion.open("POST", "/redireccion", true);
        
        peticion.setRequestHeader("Content-Type","application/json");
        peticion.onreadystatechange = function() {
          if (peticion.readyState === SOLICITUDHECHA && peticion.status === RESPUESTAEXITOSA) {
            let respuesta = JSON.parse(peticion.responseText);
            window.location.href = respuesta.url;
            console.log(respuesta.url) 
          }
        };
        peticion.send(JSON.stringify({"peticion":"registra"}));
      }
    });
  });
});
