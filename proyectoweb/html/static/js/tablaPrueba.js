document.addEventListener("DOMContentLoaded", function() 
{
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
              window.location.href = respuesta.url;}};
        peticion.send(JSON.stringify({"peticion": "volverI"}));
  });
  
  const editar = document.getElementById("eliminarpaciente");
  editar.addEventListener("click", function(event) {
    const peticion = new XMLHttpRequest();
    peticion.open("POST", "/redireccion", true);
    peticion.setRequestHeader("Content-Type", "application/json");
    peticion.onreadystatechange = function() {
        if (peticion.readyState === SOLICITUDHECHA && peticion.status === RESPUESTAEXITOSA) {
            let respuesta = JSON.parse(peticion.responseText);
            window.location.href = respuesta.url;}};
    peticion.send(JSON.stringify({"peticion": "editar_paciente"}));
    
  });

  const añadir = document.getElementById("añadirpaciente");
  añadir.addEventListener("click", function(event) {
      const peticion = new XMLHttpRequest();
      peticion.open("POST", "/redireccion", true);
      peticion.setRequestHeader("Content-Type", "application/json");
      peticion.onreadystatechange = function() {
          if (peticion.readyState === SOLICITUDHECHA && peticion.status === RESPUESTAEXITOSA) {
              let respuesta = JSON.parse(peticion.responseText);
              window.location.href = respuesta.url;}};
      peticion.send(JSON.stringify({"peticion": "añadir_paciente"}));
  });

  const input = document.getElementById("buscador");
  const criterio = document.getElementById("criterio");
  const table = document.getElementById("miTabla");
  input.addEventListener("input", function() 
  {
    nuevo = BuscarEnLista(input.value,datosRecibidos,criterio.value);
    ActualizarTabla(nuevo);
  });
  const peticion = new XMLHttpRequest();
  peticion.open("GET", "/ObtenerPacientes");
  peticion.onreadystatechange = function() 
  {
    if (peticion.readyState === SOLICITUDHECHA && peticion.status === RESPUESTAEXITOSA) 
    {
      const respuesta = JSON.parse(peticion.responseText);
      ActualizarTabla(respuesta);
      datosRecibidos = respuesta;
    }
  };
  peticion.send();

  table.addEventListener("click",function(evento)
  {
    objetivo = evento.target;
    if(objetivo.tagName.toLowerCase() === "td")
    {
      let peticion = new XMLHttpRequest();
      peticion.open("POST","/SeleccionarPaciente",true);
      peticion.setRequestHeader("Content-Type","application/json");
      peticion.onreadystatechange = function()
      {
        if(peticion.readyState == SOLICITUDHECHA && peticion.status == RESPUESTAEXITOSA)
        {
          conversion = JSON.parse(peticion.responseText);
          if(conversion.exito){
            const peticion = new XMLHttpRequest();
            peticion.open("POST", "/redireccion", true);
            peticion.setRequestHeader("Content-Type", "application/json");
            peticion.onreadystatechange = function() {
            if (peticion.readyState === SOLICITUDHECHA && peticion.status === RESPUESTAEXITOSA) {
                let respuesta = JSON.parse(peticion.responseText);
                window.location.href = respuesta.url;}};
            peticion.send(JSON.stringify({"peticion": "todos_los_pacientes"}));
          }
          else{
            alert("Ha ocurrido un error en el servidor");}
        }
      };
      peticion.send(JSON.stringify({"ID_Paciente":objetivo.id}));
    }
  });
  
});

function ActualizarTabla(diccionarios = [])
{
  let lectura = ""
  const cuerpoTabla = document.getElementById("cuerpo");
  for(let i = 0;i<diccionarios.length;i++)
    lectura = lectura + ConstruirStringTabla(diccionarios[i]);
  cuerpoTabla.innerHTML = lectura;
}

function ConstruirStringTabla(diccionario = {})
{
  const datos = ["Nombre","Apellido","DNI","Nro de afiliado","Obra social","Nro de obra social","Nro de telefono","Domicilo","Fecha de consulta"];
  var retorno = "<tr class = \"fila\">";
  let id = diccionario["ID"];
  for(let i = 0;i<datos.length;i++)
    retorno = retorno + ConstruirStringColumna(id,diccionario[datos[i]]);
  retorno = retorno + "</tr>";
  return retorno;
}

function ConstruirStringColumna(id,dato)
{
  return "<td id = \"" + id + "\">" + dato + "</td>";
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