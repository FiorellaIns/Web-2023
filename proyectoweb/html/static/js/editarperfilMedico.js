document.addEventListener("DOMContentLoaded", function() {
  const targetId = document.getElementById("volver");
  const SOLICITUDHECHA = 4;
  const RESPUESTAEXITOSA = 200;
  targetId.addEventListener("click", function(event) {
      const peticion = new XMLHttpRequest();
      peticion.open("POST", "/redireccion", true);
      peticion.setRequestHeader("Content-Type", "application/json");
      peticion.onreadystatechange = function() {
          if (peticion.readyState === SOLICITUDHECHA && peticion.status === RESPUESTAEXITOSA) {
              let respuesta = JSON.parse(peticion.responseText);
              window.location.href = respuesta.url; 
          }
      };
      peticion.send(JSON.stringify({"peticion": "volverP"}));
  });

  const form = document.querySelector("form");
  form.addEventListener("submit", function(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const email = document.getElementById("email").value.trim();

    if (nombre === "" || apellido === "" || email === "") {
      mostrarMensaje("Por favor, complete todos los campos.");
    } 
    else if (!validarEmail(email)) {
      mostrarMensaje("Ingrese una dirección de correo electrónico válida.");
    } 
    else if (!validarNombreApellido(nombre) || !validarNombreApellido(apellido)) {
      mostrarMensaje("El nombre y el apellido no pueden contener números.");
    } 
    else {
      const peticion = new XMLHttpRequest(); 
      peticion.open("POST", "/redireccion", true);
      peticion.setRequestHeader("Content-Type", "application/json");
      peticion.onreadystatechange = function() {
          if (peticion.readyState === 4 && peticion.status === 200) {      
              const peticionEdicion = new XMLHttpRequest();
              peticionEdicion.open("POST", "/Edicion_de_perfil_medico", true);
              const formatoDeData = new FormData(document.getElementById("form"));
              peticionEdicion.onreadystatechange = function() {
                  if (peticionEdicion.readyState === 4 && peticionEdicion.status === 200) {
                      const respuestaEdicion = JSON.parse(peticionEdicion.responseText);
                  }
              };
              peticionEdicion.send(formatoDeData);
              let respuesta = JSON.parse(peticion.responseText);
              setTimeout(function() {
                window.location.href = respuesta.url;
            }, 100);
          }
      };
      peticion.send(JSON.stringify({"peticion": "Perfil_Del_Medico"}));
      
    }
  });

  function mostrarMensaje(mensaje) {
    const mensajeDiv = document.createElement("div");
    mensajeDiv.textContent = mensaje;
    mensajeDiv.classList.add("mensaje");
    form.appendChild(mensajeDiv);

    setTimeout(function() {
      mensajeDiv.remove();
    }, 3000);
  }

  function validarEmail(email) {
    const regex = /^[a-zA-ZÀ-ÿ0-9._-]+@[a-zA-ZÀ-ÿ0-9.-]+\.[a-zA-ZÀ-ÿ]{2,}$/;
    return regex.test(email);
  }

  function validarNombreApellido(valor) {
    const regex = /^[a-zA-ZÀ-ÿ\s]+$/;
    return regex.test(valor);
  } 
});