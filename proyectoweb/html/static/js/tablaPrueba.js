const SOLICITUDHECHA = 4;
const RESPUESTAEXITOSA = 200; 

document.getElementById("miTabla").addEventListener("click",function(evento)
{
  objetivo = evento.target;
  if(objetivo.tagName.toLowerCase() === "td")
  {
    
  }
});

peticion = new XMLHttpRequest();
  peticion.open("GET","/ObtenerPacientes");
  peticion.onreadystatechange = function()
  {
    if(peticion.readyState === SOLICITUDHECHA && peticion.status === RESPUESTAEXITOSA)
    {
      
    }
  };
  peticion.send();

/*document.addEventListener("DOMContentLoaded", function() 
{
  
});*/