const SOLICITUDHECHA = 4;
const RESPUESTAEXITOSA = 200;

var datosRecibidos;

document.addEventListener("DOMContentLoaded", function() {
  const input = document.getElementById("buscador");
  const criterio = document.getElementById("criterio");
  const table = document.getElementById("miTabla");

  input.addEventListener("input", function() {
    nuevo = BuscarEnLista(input.value, datosRecibidos, criterio.value);
    ActualizarTabla(nuevo);
  });

  const peticion = new XMLHttpRequest();
  peticion.open("GET", "/Datos_usuarios");
  peticion.onreadystatechange = function() {
    if (peticion.readyState === SOLICITUDHECHA && peticion.status === RESPUESTAEXITOSA) {
      const respuesta = JSON.parse(peticion.responseText);
      ActualizarTabla(respuesta);
      datosRecibidos = respuesta;
    }
  };
  peticion.send();

  const volver = document.getElementById("volver");
  volver.addEventListener("click", function(event) {
    let url = "/administrador_perfil";
    window.location.href = url;
  });

  table.addEventListener("click", function(evento) {
    objetivo = evento.target;
    if (objetivo.tagName.toLowerCase() === "td") {
      let peticion = new XMLHttpRequest();
      peticion.open("POST", "/SeleccionarPaciente", true);
      peticion.setRequestHeader("Content-Type", "application/json");
      peticion.onreadystatechange = function() {
        if (peticion.readyState == SOLICITUDHECHA && peticion.status == RESPUESTAEXITOSA) {
          conversion = JSON.parse(peticion.responseText);
          if (conversion.exito)
            window.location.href = "/paciente";
          else
            alert("Ha ocurrido un error en el servidor");
        }
      };
      peticion.send(JSON.stringify({
        "ID_Paciente": objetivo.id
      }));
    }
  });

});

function ActualizarTabla(diccionarios = []) {
  let lectura = ""
  const cuerpoTabla = document.getElementById("cuerpo");
  for (let i = 0; i < diccionarios.length; i++)
    lectura = lectura + ConstruirStringTabla(diccionarios[i]);
  cuerpoTabla.innerHTML = lectura;
}

function ConstruirStringTabla(diccionario = {}) {
  const datos = ["Nombre", "Apellido", "DNI", "Matricula medica", "Usuario", "Contraseña", "EMail"];
  var retorno = "<tr class = \"fila\">";
  let id = diccionario["ID"];
  for (let i = 0; i < datos.length; i++)
    retorno = retorno + ConstruirStringColumna(id, diccionario[datos[i]]);
  retorno = retorno + "</tr>";
  return retorno;
}

function ConstruirStringColumna(id, dato) {
  return "<td id = \"" + id + "\">" + dato + "</td>";
}

function BuscarEnLista(palabra = "", diccionario = [], filtro = "") {
  var retorno = [];
  for (let i = 0, lon = diccionario.length; i < lon; i++) {
    if (VerificarIgualdad(palabra, diccionario[i][filtro]))
      retorno.push(diccionario[i]);
  }
  return retorno;
}

function VerificarIgualdad(palabra = "", rec) {
  var sAux = "" + rec;
  return sAux.includes(palabra);
}
