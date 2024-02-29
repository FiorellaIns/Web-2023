document.addEventListener("DOMContentLoaded", function() {
  const SOLICITUDHECHA = 4;
  const RESPUESTAEXITOSA = 200;
  const input = document.getElementById("buscador");
  const criterio = document.getElementById("criterio");
  const table = document.getElementById("miTabla");

  input.addEventListener("input", function() {
    const nuevo = BuscarEnLista(input.value, datosRecibidos, criterio.value);
    ActualizarTabla(nuevo);
  });

  const volver = document.getElementById("volver");
  volver.addEventListener("click", function(event) {
    const peticion = new XMLHttpRequest();
    peticion.open("POST", "/redireccion", true);
    peticion.setRequestHeader("Content-Type", "application/json");
    peticion.onreadystatechange = function() {
      if (peticion.readyState === SOLICITUDHECHA && peticion.status === RESPUESTAEXITOSA) {
        let respuesta = JSON.parse(peticion.responseText);
        window.location.href = respuesta.url;
      }
    };
    peticion.send(JSON.stringify({"peticion": "perfil_admin"}));
  });

  const usuariosSeleccionados = [];
  table.addEventListener("change", function(event) {
    if (event.target.type === "checkbox") {
      if (event.target.checked) {
        usuariosSeleccionados.push(event.target.id);
      } else {
        const seleccionado = usuariosSeleccionados.indexOf(event.target.id);
        if (seleccionado !== -1) {
          usuariosSeleccionados.splice(seleccionado, 1);
        }
      }
      console.log(usuariosSeleccionados);
    }
  });

  

  const boton = document.getElementById("eliminarusuario");
  boton.addEventListener("click", function() {
    eliminarUsuarios(usuariosSeleccionados);
  });

  const peticion = new XMLHttpRequest();
  peticion.open("GET", "/Datos_usuarios");
  peticion.onreadystatechange = function() {
    if (peticion.readyState === SOLICITUDHECHA && peticion.status === RESPUESTAEXITOSA) {
      const respuesta = JSON.parse(peticion.responseText);
      ActualizarTabla(respuesta, respuesta, usuariosSeleccionados);
      elementos = table.getElementsByTagName("td");
      for (let i = 0, c = elementos.length; i < c; i++) {
        clases = elementos[i].classList;
        arrClases = Array.from(clases);
        if (arrClases[0] !== "checkFila") {
          elementos[i].addEventListener("click", function(evento) {
            var enviarData = new XMLHttpRequest();
            enviarData.open("POST", "/redireccion", true);
            enviarData.setRequestHeader("Content-Type", "application/json");
            enviarData.onreadystatechange = function() {
              if (enviarData.readyState === SOLICITUDHECHA && enviarData.status === RESPUESTAEXITOSA) {
                var datosRecibidos = JSON.parse(enviarData.responseText);
                if (datosRecibidos["url"] !== "valor") {
                  window.location.href = datosRecibidos["url"];
                } else {
                  alert("Error en el servidor...");
                }
              }
            };
            enviarData.send(JSON.stringify({"peticion": "Gestionar_Datos_Por_Admin", "ID": evento.target.id}));
          });
        }
      }
    }
  };
  peticion.send();


  

});

function eliminarUsuarios(usuariosSeleccionados) {
  const SOLICITUDHECHA = 4;
  const RESPUESTAEXITOSA = 200;
  const peticion = new XMLHttpRequest();
  peticion.open("POST", "/eliminar_perfiles", true);
  peticion.setRequestHeader("Content-Type", "application/json");
  peticion.onreadystatechange = function() {
    if (peticion.readyState === SOLICITUDHECHA && peticion.status === RESPUESTAEXITOSA) {
      const respuesta = peticion.responseText;
      console.log("Respuesta del servidor:", respuesta);
      window.location.reload();
    }
  };
  peticion.send(JSON.stringify({"perfiles_a_eliminar": usuariosSeleccionados}));
}

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
  const datos = ["Nombre", "Apellido", "DNI", "Matricula medica", "Usuario", "Contraseña", "EMail"];
  let retorno = "<tr class=\"fila\">";
  const id = diccionario["ID"];
  retorno += "<td class=\"checkFila\"><input type=\"checkbox\" id=\"" + id + "\"></td>";
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
