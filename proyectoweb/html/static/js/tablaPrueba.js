const SOLICITUDHECHA = 4;
const RESPUESTAEXITOSA = 200; 

document.getElementById("miTabla").addEventListener("click",function(evento)
{
  objetivo = evento.target;
  if(objetivo.tagName.toLowerCase() === "td")
  {
    
  }
});

document.addEventListener("DOMContentLoaded", function() 
{
  peticion = new XMLHttpRequest();
  peticion.open("GET","/ObtenerPacientes");
  peticion.onreadystatechange = function()
  {
    if(peticion.readyState === SOLICITUDHECHA && peticion.status === RESPUESTAEXITOSA)
    {
      diccionarios = JSON.parse(peticion.responseText);
      console.log(diccionarios);
    }
  };
peticion.send();
  
});