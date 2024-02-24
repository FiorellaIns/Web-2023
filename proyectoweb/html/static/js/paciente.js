document.addEventListener("DOMContentLoaded", function() {
  const SOLICITUDHECHA = 4;
  const RESPUESTAEXITOSA = 200;
  var datosRecibidos;

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