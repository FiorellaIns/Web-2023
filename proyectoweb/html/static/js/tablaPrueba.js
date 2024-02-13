const SOLICITUDHECHA = 4;
const RESPUESTAEXITOSA = 200;

document.addEventListener("DOMContentLoaded", function() 
{
  const input = document.getElementById("buscador");
  const criterio = document.getElementById("criterio");
  const table = document.getElementById("miTabla");

  input.addEventListener("input", function() 
  {
    const filtro = input.value.toLowerCase();
    const filas = table.querySelectorAll("tbody tr");
  
    for (let i = 0; i < filas.length; i++) 
    {
      const tds = filas[i].querySelectorAll("td");
      let filaCoincide = false;
  
      for (let j = 0; j < tds.length; j++) 
      {
        const valorCriterio = tds[j].textContent.toLowerCase();
        if (valorCriterio.includes(filtro)) 
        {
            filaCoincide = true;
            break;
        }
      }
        if (filaCoincide) 
          filas[i].style.display = "";
         else 
          filas[i].style.display = "none";
      }
  });


  const peticion = new XMLHttpRequest();
  peticion.open("GET", "/ObtenerPacientes");
  peticion.onreadystatechange = function() 
  {
    if (peticion.readyState === SOLICITUDHECHA && peticion.status === RESPUESTAEXITOSA) 
    {
      const respuesta = JSON.parse(peticion.responseText);
      ActualizarTabla(respuesta);
    }
  };
  peticion.send();

  const links = document.querySelectorAll(".fila");
  links.forEach(function(link) 
  {
    link.addEventListener("click", function(event) 
    {
      const targetId = event.target.id;
      let url = "/paciente";
      window.location.href = url;
    });
  });


  const volver = document.querySelectorAll("#volver");
  volver.forEach(function(button) 
  {
    button.addEventListener("click", function(event) 
    {
      let url = "/index";
      window.location.href = url;
    });
  });

  const añadir = document.querySelectorAll("#añadirpaciente");
  añadir.forEach(function(button) 
  {
    button.addEventListener("click", function(event) 
    {
      let url = "/añadir_paciente";
      window.location.href = url;
    });
  });

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
          if(conversion.exito)
            window.location.href = "/paciente";
          else
            alert("Ha ocurrido un error en el servidor");
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