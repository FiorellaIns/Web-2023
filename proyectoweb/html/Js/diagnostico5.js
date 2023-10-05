function SwitchDeErroes(ids=0)
{
  var retorno = "";
  switch(ids)
  {
    case 0:
      retorno = "Fecha";
      break;
    case 1:
      retorno = "Motivo de concurrencia";
      break;
    case 2:
      retorno = "Nombre del medico";
      break;
    case 3:
      retorno = "Diagnostico del medico";
      break;
    case 4:
      retorno = "Descripción";
      break;
    default:
      retorno = undefined;
  }
  return retorno;
}

function ControlDeErrores(cant=0,ids=[])
{
  var retorno = "Por favor ingrese ";
  for(let i = 0;i<cant;i++)
  {
    if(i == 0)
      retorno = retorno + SwitchDeErroes(ids[i]) ;
    else if(i + 1 < cant)
      retorno = retorno + ", " + SwitchDeErroes(ids[i]);
    else if (i + 1 == cant)
      retorno = retorno + " y " +SwitchDeErroes(ids[i]) + ".";
  }
  return retorno;
}

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
  
    form.addEventListener("submit", function (event) {
      let idErr = [];
      let cantErrores = 0;
      var retorno = true;
      const fecha = document.querySelector('#Fecha').value;
      const descripcion = document.querySelector('#Descri').value;
      const motivo = document.querySelector('#Motivo').value;
      const nombreMedico = document.querySelector('#Nombre').value;
      const diagnosticoMedico = document.querySelector('#Diag').value;
      if (fecha.trim() == "") {
        cantErrores++;
        idErr.push(0);
        retorno = false;
      }
      if (motivo.trim() == "") {
        cantErrores++;
        idErr.push(1);
        retorno = false;
      }
      if (nombreMedico.trim() == "") {
        cantErrores++;
        idErr.push(2);
        retorno = false;
      }
      if (diagnosticoMedico.trim() == "") {
        cantErrores++;
        idErr.push(3);
        retorno = false;
      }
      if (descripcion.trim() == "") {
        cantErrores++;
        idErr.push(4);
        retorno = false;
      }
      if(!retorno && cantErrores > 1)
      {
        alert(ControlDeErrores(cantErrores,idErr));
        event.preventDefault();
      }
      else if(!retorno && cantErrores == 1)
      {
        alert("Por favor ingrese " + SwitchDeErroes(idErr[0]) +".");
        event.preventDefault();
      }
      return retorno;
    });
  });
  