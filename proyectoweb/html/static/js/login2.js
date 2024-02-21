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
    if (window.location.href.indexOf("http://") === 0 || window.location.href.indexOf("https://") === 0)
    {
      const SOLICITUDHECHA = 4;
      const RESPUESTAEXITOSA = 200;
      peticion = new XMLHttpRequest();
      datos = new FormData(document.getElementById("login-form"));

      peticion.open("POST","/Acceder",true);
      peticion.onreadystatechange = function()
      {
        if(peticion.readyState === SOLICITUDHECHA && peticion.status === RESPUESTAEXITOSA)
        {
          let respuesta = JSON.parse(peticion.responseText);
          if(respuesta.mensaje === "Hecho")
          {
            window.location.href = respuesta.url;
          }
        else
          alert(respuesta.mensaje);
    }
  };
  peticion.send(datos);
    }
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

function HacerPeticion(id = String,url = String)
{
  
}