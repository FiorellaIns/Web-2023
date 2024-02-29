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
                const peticionEditar = new XMLHttpRequest();
                peticionEditar.open("POST", "/redireccion", true);
                peticionEditar.setRequestHeader("Content-Type", "application/json");
                peticionEditar.onreadystatechange = function() {
                    if (peticionEditar.readyState === SOLICITUDHECHA && peticionEditar.status === RESPUESTAEXITOSA) {
                        let respuestaEditar = JSON.parse(peticionEditar.responseText);
                        window.location.href = respuestaEditar.url;
                    }
                };
                peticionEditar.send(JSON.stringify({"peticion": "tabla_admin"}));
            } else if (elemento === "cerrar") 
            {
                url="/"
                const peticionCerrar = new XMLHttpRequest();
                peticionCerrar.open("GET","/CerrarSeccion",true);
                peticionCerrar.onreadystatechange = function()
                {
                    if(peticionCerrar.readyState === SOLICITUDHECHA && peticionCerrar.status === RESPUESTAEXITOSA)
                    {
                        respuestaCerrar = JSON.parse(peticionCerrar.responseText);
                        if(respuestaCerrar.exito)
                        {
                            window.location.href = url;
                        }
                        else
                            alert("A ocurrido un error...");
                    }
                };
                peticionCerrar.send();
            }
        });
    });

    const boton_generador = document.getElementById("boton_generador");
    const clave_generada = document.getElementById("clave_generada");
    const es_administrador = document.getElementById("es_administrador");
    const resultado_generacion = document.getElementById("resultado_generacion");
    
    boton_generador.addEventListener("click", function(event) {
        const admin = es_administrador.checked ? 1 : 0;
        const peticionGenerar = new XMLHttpRequest();
        peticionGenerar.open("POST", "/Generador", true);
        peticionGenerar.setRequestHeader("Content-Type", "application/json");
        peticionGenerar.onreadystatechange = function() {
            if (peticionGenerar.readyState === SOLICITUDHECHA && peticionGenerar.status === RESPUESTAEXITOSA) {
                const respuestaGenerar = peticionGenerar.responseText;
                document.getElementById("resultado_generacion").textContent = respuestaGenerar;
                clave_generada.style.display = "block";
                resultado_generacion.style.display="inline-block";

                setTimeout(function() {
                    location.reload()
                }, 10000);
            }
        };
        peticionGenerar.send(JSON.stringify({administrador:admin}));
    });

    const peticionObtenerClaves = new XMLHttpRequest();
    peticionObtenerClaves.open("GET", "/claves");
    peticionObtenerClaves.onreadystatechange = function() {
      if (peticionObtenerClaves.readyState === SOLICITUDHECHA && peticionObtenerClaves.status === RESPUESTAEXITOSA) {
        const respuestaObtenerClaves = JSON.parse(peticionObtenerClaves.responseText);
        ActualizarTabla(respuestaObtenerClaves, respuestaObtenerClaves);
        const elementos = table.getElementsByTagName("td");
        for (let i = 0, c = elementos.length; i < c; i++) {
          clases = elementos[i].classList;
          arrClases = Array.from(clases);
        }
      }
    };
    peticionObtenerClaves.send();
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
