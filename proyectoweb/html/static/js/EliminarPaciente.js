document.addEventListener("DOMContentLoaded", function() {
  const SOLICITUDHECHA = 4;
  const RESPUESTAEXITOSA = 200;
  var datosRecibidos;
  const usuariosSeleccionados = [];

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
    peticion.send(JSON.stringify({ "peticion": "volverT" }));
  });

  const input = document.getElementById("buscador");
  const criterio = document.getElementById("criterio");
  const table = document.getElementById("miTabla");

  input.addEventListener("input", function() {
    const nuevo = BuscarEnLista(input.value, datosRecibidos, criterio.value);
    ActualizarTabla(nuevo);
  });

  const peticion = new XMLHttpRequest();
  peticion.open("GET", "/ObtenerPacientes");
  peticion.onreadystatechange = function() {
    if (peticion.readyState === SOLICITUDHECHA && peticion.status === RESPUESTAEXITOSA) {
      const respuesta = JSON.parse(peticion.responseText);
      ActualizarTabla(respuesta);
      datosRecibidos = respuesta;
    }
  };
  peticion.send();

  table.addEventListener("click", function(evento) {
    objetivo = evento.target;
    if (objetivo.tagName.toLowerCase() === "td") {
      let peticion = new XMLHttpRequest();
      peticion.open("POST", "/SeleccionarPaciente", true);
      peticion.setRequestHeader("Content-Type", "application/json");
      peticion.onreadystatechange = function() {
        if (peticion.readyState == SOLICITUDHECHA && peticion.status == RESPUESTAEXITOSA) {
          conversion = JSON.parse(peticion.responseText);
          if (conversion.exito) {
            const peticion = new XMLHttpRequest();
            peticion.open("POST", "/redireccion", true);
            peticion.setRequestHeader("Content-Type", "application/json");
            peticion.onreadystatechange = function() {
              if (peticion.readyState === SOLICITUDHECHA && peticion.status === RESPUESTAEXITOSA) {
                let respuesta = JSON.parse(peticion.responseText);
                window.location.href = respuesta.url;
              }
            };
            peticion.send(JSON.stringify({ "peticion": "editar_al_paciente" }));
          } else {
            alert("Ha ocurrido un error en el servidor");
          }
        }
      };
      peticion.send(JSON.stringify({ "ID_Paciente": objetivo.id }));
    }
  });

  table.addEventListener("change", function(event) {
    if (event.target.type === "checkbox") {
        const checkboxId = event.target.id;
        const isChecked = event.target.checked;

        if (isChecked) {
            usuariosSeleccionados.push(checkboxId);
        } else {
            const index = usuariosSeleccionados.indexOf(checkboxId);
            if (index !== -1) {
                usuariosSeleccionados.splice(index, 1);
            }
        }

        console.log("Usuarios seleccionados:", usuariosSeleccionados);
    }
});

const boton = document.getElementById("eliminarpaciente");
boton.addEventListener("click", function() {
  eliminarPaciente(usuariosSeleccionados);
});

});


function eliminarPaciente(usuariosSeleccionados) {
  const SOLICITUDHECHA = 4;
  const RESPUESTAEXITOSA = 200;
  const peticion = new XMLHttpRequest();
  peticion.open("POST", "/eliminar_pacientes", true);
  peticion.setRequestHeader("Content-Type", "application/json");
  peticion.onreadystatechange = function() {
    if (peticion.readyState === SOLICITUDHECHA && peticion.status === RESPUESTAEXITOSA) {
      const respuesta = peticion.responseText;
      console.log("Respuesta del servidor:", respuesta);
      window.location.reload();
    }
  };
  peticion.send(JSON.stringify({ pacientes_a_eliminar: usuariosSeleccionados }));
}

function ActualizarTabla(diccionarios = []) {
  let lectura = "";
  const cuerpoTabla = document.getElementById("cuerpo");
  for (let i = 0; i < diccionarios.length; i++)
    lectura += ConstruirStringTabla(diccionarios[i]);
  cuerpoTabla.innerHTML = lectura;
}

function ConstruirStringTabla(diccionario = {}) {
  const datos = ["Nombre","Apellido","DNI","Nro de afiliado","Obra social","Nro de obra social","Nro de telefono","Domicilo","Fecha de consulta"];
  let retorno = "<tr class=\"fila\">";
  const id = diccionario["ID"];
  retorno += "<td class=\"checkFila\"><input type=\"checkbox\" id=\"" + id + "\"></td>";
  for (let i = 0; i < datos.length; i++)
    retorno += ConstruirStringColumna(id, diccionario[datos[i]]);
  retorno += "</tr>";
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
