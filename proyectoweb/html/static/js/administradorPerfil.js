document.addEventListener("DOMContentLoaded", function() {
    const SOLICITUDHECHA = 4;
    const RESPUESTAEXITOSA = 200;
    const links = document.querySelectorAll(".reg");

    links.forEach(function(link) {
        link.addEventListener("click", function(event) {
            const elemento = event.target.id;
            let url = "";

            if (elemento === "editar") 
            {
                const peticion = new XMLHttpRequest();
                peticion.open("POST", "/redireccion", true);
                peticion.setRequestHeader("Content-Type", "application/json");
                peticion.onreadystatechange = function() {
                if (peticion.readyState === SOLICITUDHECHA && peticion.status === RESPUESTAEXITOSA) {
                    let respuesta = JSON.parse(peticion.responseText);
                    window.location.href = respuesta.url;}};
                peticion.send(JSON.stringify({"peticion": "tabla_admin"}));
            } else if (elemento === "cerrar") 
            {
                url="/"
                peticion = new XMLHttpRequest();
                peticion.open("GET","/CerrarSeccion",true);
                peticion.onreadystatechange = function()
                {
                    if(peticion.readyState === SOLICITUDHECHA && peticion.status === RESPUESTAEXITOSA)
                    {
                        respuesta = JSON.parse(peticion.responseText);
                        if(respuesta.exito)
                        {
                            window.location.href = url;
                        }
                        else
                            alert("A ocurrido un error...");
                    }
                };
                peticion.send();
            }
        });
    });
});