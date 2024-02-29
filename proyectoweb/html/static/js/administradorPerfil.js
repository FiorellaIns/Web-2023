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
                setTimeout(function() {
                    location.reload()
                }, 10000);
            }
        };
        peticion.send(JSON.stringify({administrador:admin}));
    });
    
    const peticion = new XMLHttpRequest();
    peticion.open("GET", "/claves");
    peticion.onreadystatechange = function() {
      if (peticion.readyState === SOLICITUDHECHA && peticion.status === RESPUESTAEXITOSA) {
        const respuesta = JSON.parse(peticion.responseText);
        ActualizarTabla(respuesta, respuesta);
        elementos = table.getElementsByTagName("td");
        for (let i = 0, c = elementos.length; i < c; i++) {
          clases = elementos[i].classList;
          arrClases = Array.from(clases);
        }
      }
    };
    peticion.send();
});

function ActualizarTabla(diccionarios = [], datosRecibidos, usuariosSeleccionados) {
    let lectura = "";
    const cuerpoTabla = document.getElementById("cuerpo");
    cuerpoTabla.innerHTML = "";
  
    for (let i = 0; i < diccionarios.length; i++) {
      lectura += ConstruirStringTabla(diccionarios[i]);
    }
    cuerpoTabla.innerHTML = lectura;
  }
  
  function ConstruirStringTabla(diccionario = {}) {
    const datos = ["ID","Clave","Administrador"];
    let retorno = "<tr class=\"fila\">";
    const id = diccionario["ID"];
    for (let i = 0; i < datos.length; i++) {
      retorno += ConstruirStringColumna(id, diccionario[datos[i]]);
    }
    retorno += "</tr>";
    return retorno;
  }
  
  function ConstruirStringColumna(id, dato) {
    return "<td id=\"" + id + "\">" + dato + "</td>";
  }
  
  function BuscarEnLista(palabra = "",diccionario = [],filtro = "")
  {
    var retorno = [];
    for(let i = 0,lon = diccionario.length;i<lon;i++)
    {
      if(VerificarIgualdad(palabra,diccionario[i][filtro]))
        retorno.push(diccionario[i]);
    }
    return retorno;
  }
  
  function VerificarIgualdad(palabra = "",rec)
  {
    var sAux = "" + rec;
    return sAux.includes(palabra);
  }
  