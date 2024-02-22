const SOLICITUDHECHA = 4;
const RESPUESTAEXITOSA = 200;

document.addEventListener("DOMContentLoaded", function() 
{
  const input = document.getElementById("buscador");
  const criterio = document.getElementById("criterio");
  const table = document.getElementById("miTabla");

  input.addEventListener("input", function() {
    const nuevo = BuscarEnLista(input.value, datosRecibidos, criterio.value);
    ActualizarTabla(nuevo, datosRecibidos, usuariosSeleccionados);
  });

  const volver = document.getElementById("volver");
  volver.addEventListener("click", function(event) {
    let url = "/administrador_perfil";
    window.location.href = url;
  });

  const usuariosSeleccionados = [];
  table.addEventListener("change", function(event) 
  {
    if(event.target.type === "checkbox")
      if(event.target.checked)
        usuariosSeleccionados.push(event.target.id);
      else
        usuariosSeleccionados.pop(event.target.id);
      console.log(usuariosSeleccionados);
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
      for(let i = 0,c = elementos.length;i<c;i++)
      {
        clases = elementos[i].classList
        arrClases = Array.from(clases);
        if(arrClases[0] !== "checkFila")
          elementos[i].addEventListener("click",function(evento)
        {
          var enviarData = new XMLHttpRequest();
          enviarData.open("POST","/redireccion",true);
          enviarData.setRequestHeader("Content-Type","application/json");
          enviarData.onreadystatechange = function()
          {
            if(enviarData.readyState === SOLICITUDHECHA && enviarData.status === RESPUESTAEXITOSA)
            {
              var datosRecibidos = JSON.parse(enviarData.responseText);
              if(datosRecibidos["url"] !== "valor")
                window.location.href = datosRecibidos["url"];
              else
                alert("Error en el servidor...");
            }
          };
          enviarData.send(JSON.stringify({"peticion":"Gestionar_Datos_Por_Admin","ID":evento.target.id}));
        })
      }
    }
  };
  peticion.send();

});

function ActualizarTabla(diccionarios = [], datosRecibidos, usuariosSeleccionados) 
{
  let lectura = "";
  const cuerpoTabla = document.getElementById("cuerpo");
  cuerpoTabla.innerHTML = "";

  for (let i = 0; i < diccionarios.length; i++) 
    lectura += ConstruirStringTabla(diccionarios[i]);
  cuerpoTabla.innerHTML = lectura;
}

function ConstruirStringTabla(diccionario = {}) {
  const datos = ["Nombre", "Apellido", "DNI", "Matricula medica", "Usuario", "Contraseña", "EMail"];
  let retorno = "<tr class=\"fila\">";
  const id = diccionario["ID"];
  retorno += "<td class=\"checkFila\"><input type=\"checkbox\" id=\"" + id + "\"></td>";
  for (let i = 0; i < datos.length; i++) 
    retorno += ConstruirStringColumna(id, diccionario[datos[i]]);
  retorno += "</tr>";
  return retorno;
}

function ConstruirStringColumna(id, dato) 
{
  return "<td id=\"" + id + "\">" + dato + "</td>";
}

function BuscarEnLista(palabra = "", diccionario = [], filtro = "") {
  const retorno = [];
  for (let i = 0, lon = diccionario.length; i < lon; i++) {
    if (VerificarIgualdad(palabra, diccionario[i][filtro])) {
      retorno.push(diccionario[i]);
    }
  }
  return retorno;
}

function VerificarIgualdad(palabra = "", rec) {
  const sAux = "" + rec;
  return sAux.includes(palabra);
}

function eliminarUsuarios(usuariosSeleccionados) {
  const ids = usuariosSeleccionados.map(usuario => usuario.ID);
  console.log("Eliminar usuarios con IDs:", ids);
  // Aquí deberías enviar una solicitud al servidor para eliminar los usuarios con los IDs obtenidos
  // Por ejemplo, puedes usar una solicitud XMLHttpRequest o fetch para enviar una solicitud DELETE al servidor
  // y pasar los IDs de los usuarios como parámetros en la URL o en el cuerpo de la solicitud
  // Una vez que se eliminen los usuarios, puedes recargar la página o actualizar la tabla de usuarios
}