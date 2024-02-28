document.addEventListener("DOMContentLoaded", function() {
  const links = document.querySelectorAll(".reg");
  const boton = document.getElementById("enviar");
  links.forEach(function(link) {
    link.addEventListener("click", function(event) {
      const targetId = event.target.id;
      if (targetId === "volver") {
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
        peticion.send(JSON.stringify({"peticion":"volverl"}));
      } 
    });
  });
  
});