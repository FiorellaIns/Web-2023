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


    const generar_clave = document.getElementById("boton_generador");
    const clave_generada = document.getElementById("clave_generada");
    const es_administrador = document.getElementById("es_administrador");
    const resultado_generacion=document.getElementById("resultado_generacion")
    
    generar_clave.addEventListener("click", function(event) {
        const admin = es_administrador.checked ? 1 : 0;
        const peticion = new XMLHttpRequest();
        peticion.open("POST", "/Generador", true);
        peticion.setRequestHeader("Content-Type", "application/json");
        peticion.onreadystatechange = function() {
            if (peticion.readyState === SOLICITUDHECHA && peticion.status === RESPUESTAEXITOSA) {
                const respuesta = peticion.responseText;
                document.getElementById("resultado_generacion").textContent = respuesta;
                clave_generada.style.display = "block";
                resultado_generacion.style.display="inline-block";

            }
        };
        peticion.send(JSON.stringify({administrador:admin}));
    });
    
    
});