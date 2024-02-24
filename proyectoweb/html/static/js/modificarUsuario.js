document.addEventListener("DOMContentLoaded",function(evento)
{
    const SOLICITUDHECHA = 4;
    const RESPUESTAEXITOSA = 200;
    
    const volver = document.getElementById("volver");
    volver.addEventListener("click", function(event) {
        const peticion = new XMLHttpRequest();
        peticion.open("POST", "/redireccion", true);
        peticion.setRequestHeader("Content-Type", "application/json");
        peticion.onreadystatechange = function() {
            if (peticion.readyState === SOLICITUDHECHA && peticion.status === RESPUESTAEXITOSA) {
                let respuesta = JSON.parse(peticion.responseText);
                window.location.href = respuesta.url;}};
          peticion.send(JSON.stringify({"peticion": "tabla_admin"}));
    })
});