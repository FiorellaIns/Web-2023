const SOLICITUDHECHA = 4;
const RESPUESTAEXITOSA = 200;
document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll(".reg");

    links.forEach(function(link) {
        link.addEventListener("click", function(event) {
            const targetId = event.target.id;
            let url = "";

            if (targetId === "paciente") 
            {
                peticion = new XMLHttpRequest();
                url = "/tabla";
                window.location.href = url;
            } else if (targetId === "Perfil") 
            {
                url = "/perfil_medico";
                window.location.href = url;
            } else if (targetId === "cerrar") 
            {
                peticion = new XMLHttpRequest();
                peticion.open("GET","/CerrarSeccion",true);
                peticion.onreadystatechange = function()
                {
                    if(peticion.readyState === SOLICITUDHECHA && peticion.status === RESPUESTAEXITOSA)
                    {
                        respuesta = JSON.parse(peticion.responseText);
                        if(respuesta.exito)
                        {
                            alert("Se ha cerrado la sección");
                            window.location.href = "/";
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