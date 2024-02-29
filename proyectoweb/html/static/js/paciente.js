document.addEventListener("DOMContentLoaded", function() {
  const SOLICITUDHECHA = 4;
  const RESPUESTAEXITOSA = 200;
  var datosRecibidos;
  const usuariosSeleccionados=[];

  const volver = document.getElementById("volver");
  volver.addEventListener("click", function(event) {
    const peticion = new XMLHttpRequest();
    peticion.open("POST", "/redireccion", true);
    peticion.setRequestHeader("Content-Type", "application/json");
    peticion.onreadystatechange = function() {
          if (peticion.readyState === SOLICITUDHECHA && peticion.status === RESPUESTAEXITOSA) {
              let respuesta = JSON.parse(peticion.responseText);
              window.location.href = respuesta.url; }
        };
      peticion.send(JSON.stringify({"peticion": "volverT"}));
    });

  const linkDiagnostico = document.getElementById("anotar");
  linkDiagnostico.addEventListener("click", function(event) {
    const peticion = new XMLHttpRequest();
    peticion.open("POST", "/redireccion", true);
    peticion.setRequestHeader("Content-Type", "application/json");
    peticion.onreadystatechange = function() {
          if (peticion.readyState === SOLICITUDHECHA && peticion.status === RESPUESTAEXITOSA) {
              let respuesta = JSON.parse(peticion.responseText);
              window.location.href = respuesta.url; }
        };
      peticion.send(JSON.stringify({"peticion": "obtener_diagnostico"}));
    });

  const peticion = new XMLHttpRequest();
  peticion.open("GET", "/obtenerdatosdepacientes", true);
  peticion.onreadystatechange = function() {
      if (peticion.readyState === SOLICITUDHECHA && peticion.status === RESPUESTAEXITOSA) {
          const respuesta = JSON.parse(peticion.responseText);
          ActualizarTabla(respuesta);
          datosRecibidos = respuesta;
      }
  };
  peticion.send();
  const table = document.getElementById("miTabla");
table.addEventListener("change", function(event) {
    if (event.target.type === "checkbox") {
        const checkboxId = event.target.id;
        const id = checkboxId.split("_")[1]; // Obtener el ID del diagnóstico desde el ID del checkbox
        const isChecked = event.target.checked;

        if (isChecked) {
            usuariosSeleccionados.push(id);
        } else {
            const index = usuariosSeleccionados.indexOf(id);
            if (index !== -1) {
                usuariosSeleccionados.splice(index, 1);
            }
        }

        console.log("Usuarios seleccionados:", usuariosSeleccionados);
    }
});

//este es el boton que realiza la accion
const boton = document.getElementById("Eliminardiagnostico");
boton.addEventListener("click", function() {
    eliminar_diagnostico(usuariosSeleccionados);
});
//funcion para eliminar el diagnostico
function eliminar_diagnostico(usuariosSeleccionados) {
    const SOLICITUDHECHA = 4;
    const RESPUESTAEXITOSA = 200;
    const peticion = new XMLHttpRequest();
    peticion.open("POST", "/eliminar_diagnostico", true);
    peticion.setRequestHeader("Content-Type", "application/json");
    peticion.onreadystatechange = function() {
      if (peticion.readyState === SOLICITUDHECHA && peticion.status === RESPUESTAEXITOSA) {
        const respuesta = peticion.responseText;
        console.log("Respuesta del servidor:", respuesta);
        window.location.reload();
      }
    };
    peticion.send(JSON.stringify({ diagnostico_a_eliminar: usuariosSeleccionados }));
}

  function ActualizarTabla(diccionarios = []) {
      let lectura = "";
      const cuerpoTabla = document.getElementById("cuerpo");
      for (let i = 0; i < diccionarios.length; i++) {
          lectura += ConstruirStringTabla(diccionarios[i]);
      }
      cuerpoTabla.innerHTML = lectura;
  }

  function ConstruirStringTabla(diccionario = {}) {
    const datos = ["Diagnostico medico", "Descripcion", "Fecha de atencion", "Motivo de la atencion", "ID medico"];
    let retorno = "<tr class=\"fila\">";
    let id = diccionario["ID"];

    for (let i = 0; i < datos.length; i++) {
        retorno += ConstruirStringColumna(id, diccionario[datos[i]]);
    }

    // Agregar checkbox al final
    retorno += "<td><input type=\"checkbox\" id=\"check_" + id + "\"></td>";

    retorno += "</tr>";
    return retorno;
}


  function ConstruirStringColumna(id, dato) {
      return "<td id=\"" + id + "\">" + dato + "</td>";
  }

  function BuscarEnLista(palabra = "", diccionario = [], filtro = "") {
      var retorno = [];
      for (let i = 0, lon = diccionario.length; i < lon; i++) {
          if (VerificarIgualdad(palabra, diccionario[i][filtro])) {
              retorno.push(diccionario[i]);
          }
      }
      return retorno;
  }

  function VerificarIgualdad(palabra = "", rec) {
      var sAux = "" + rec;
      return sAux.includes(palabra);
  }
});