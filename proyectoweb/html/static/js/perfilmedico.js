document.addEventListener("DOMContentLoaded", function() {
  const volverButton = document.getElementById("volver");
  const editarPerfilButton = document.getElementById("siguiente");
  const SOLICITUDHECHA = 4;
  const RESPUESTAEXITOSA = 200;
  volverButton.addEventListener("click", function() {
    const peticion = new XMLHttpRequest();
    peticion.open("POST", "/redireccion", true);
    peticion.setRequestHeader("Content-Type", "application/json");
    peticion.onreadystatechange = function() {
        if (peticion.readyState === SOLICITUDHECHA && peticion.status === RESPUESTAEXITOSA) {
            let respuesta = JSON.parse(peticion.responseText);
            window.location.href = respuesta.url; 
        }
    };
    peticion.send(JSON.stringify({"peticion": "volverI"}));
  });

  editarPerfilButton.addEventListener("click", function() {
    const peticion = new XMLHttpRequest();
    peticion.open("POST", "/redireccion", true);
    peticion.setRequestHeader("Content-Type", "application/json");
    peticion.onreadystatechange = function() {
        if (peticion.readyState === SOLICITUDHECHA && peticion.status === RESPUESTAEXITOSA) {
            let respuesta = JSON.parse(peticion.responseText);
            window.location.href = respuesta.url; 
        }
    };
    peticion.send(JSON.stringify({"peticion": "editar"}));
  });
});