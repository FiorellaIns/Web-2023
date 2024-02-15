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

  table.addEventListener("change", function(event) {
    if (event.target.type === "checkbox") {
      const checkboxId = event.target.id;
      const userId = checkboxId.split("_")[1]; // Obtener el ID de usuario de la casilla de verificación
      const usuarioSeleccionado = datosRecibidos.find(usuario => usuario.ID === parseInt(userId));
      
      
      // Desmarcar todas las casillas de verificación excepto la seleccionada
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach(function(checkbox) {
        if (checkbox.id !== checkboxId) {
          checkbox.checked = false;
        }
      });
      
      console.log("Medico seleccionado:", usuarioSeleccionado.Nombre,usuarioSeleccionado.Apellido,",con usuario:",usuarioSeleccionado.Usuario,"y ID:",userId);
      // futuras acciones adicionales que desees con el usuario seleccionado
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
  var retorno = "<tr class=\"fila\">";
  let id = diccionario["ID"];
  retorno += "<td><input type=\"checkbox\" class=\"checkFila\" id=\"checkbox_" + id + "\"></td>";
  for (let i = 0; i < datos.length; i++)
    retorno = retorno + ConstruirStringColumna(id, diccionario[datos[i]]);
  retorno = retorno + "</tr>";
  return retorno;
}

function ConstruirStringColumna(id, dato) {
  return "<td id=\"" + id + "\">" + dato + "</td>";
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
