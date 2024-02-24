document.addEventListener("DOMContentLoaded", function() {
  const links = document.querySelectorAll(".boton");
  links.forEach(function(link) {
      link.addEventListener("click", function(event) {
          const targetId = event.target.id;
          let url = "/tabla";
          window.location.href = url;
      });
  });


const peticion = new XMLHttpRequest();

peticion.open("GET", "/obtenerdatosdepacientes",true);

peticion.onreadystatechange = function() {
  if (peticion.readyState === SOLICITUDHECHA && peticion.status === RESPUESTAEXITOSA) {
    const respuesta = JSON.parse(peticion.responseText);
    ActualizarTabla(respuesta);
    datosRecibidos = respuesta;
  }
};
peticion.send();


});

/*
document.addEventListener("DOMContentLoaded", function() {
    const targetId = document.getElementById("volver");
    targetId.addEventListener("click", function(event) {
        const SOLICITUDHECHA = 4;
        const RESPUESTAEXITOSA = 200;
        const peticion = new XMLHttpRequest();

        peticion.open("POST", "/redireccion", true);
        peticion.setRequestHeader("Content-Type", "application/json");
        peticion.onreadystatechange = function() {
            if (peticion.readyState === SOLICITUDHECHA && peticion.status === RESPUESTAEXITOSA) {
                let respuesta = JSON.parse(peticion.responseText);
                window.location.href = respuesta.url; 
            }
        };
        peticion.send(JSON.stringify({"peticion": "volver"}));
    });
});
*/


document.addEventListener("DOMContentLoaded", function() {
  const SOLICITUDHECHA = 4;
  const RESPUESTAEXITOSA = 200;
  var datosRecibidos;
  const links = document.querySelectorAll(".boton1");

  links.forEach(function(link) {
      link.addEventListener("click", function(event) {
          const targetId = event.target.id;
          let url = "/diagnostico";
          window.location.href = url;
      });
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
  const datos = ["Diagnostico medico", "Descripcion", "Fecha de atencion", "Motivo de la atencion","ID medico"];
  var retorno = "<tr class=\"fila\">";
  let id = diccionario["ID"];
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
