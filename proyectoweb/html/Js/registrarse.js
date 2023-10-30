function SwitchDeErroes(ids=0)
{
  var retorno = "";
  switch(ids)
  {
    case 0:
      retorno = "Nombre";
      break;
    case 1:
      retorno = "Apellido";
      break;
    case 2:
      retorno = "DNI valido";
      break;
    case 3:
      retorno = "Matricula valida";
      break;
    case 4:
      retorno = "ambos campos de contraseña";
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
      var retorno = true;
      let cantErrores = 0,idErr = [];
      const NOMBRE = document.querySelector('input[name="Nombre"]').value;
      const APELLIDO = document.querySelector('input[name="Apellido"]').value;
      const DNI = document.querySelector('input[name="DNI"]').value;
      const MATRICULA = document.querySelector('input[name="Numero_de_Afiliado"]').value;
      const PASSWORD = document.querySelector('input[name="password"]').value;
      const CONFIRM_PASSWORD = document.querySelector('input[name="confirm-password"]').value;
      if (NOMBRE.trim() === "") {
        idErr.push(0);
        cantErrores++;
        retorno = false;
      }
      if (APELLIDO.trim() === "") {
        idErr.push(1);
        cantErrores++;
        retorno = false;
      }

      if (DNI.trim() === "" || !/^[\d.]+$/.test(DNI)) {
        idErr.push(2);
        cantErrores++;
        retorno = false;
      }
      //buscar error
      if (MATRICULA.trim() === "" || !/^[\d.]+$/.test(MATRICULA)) {
        idErr.push(3);
        cantErrores++;
        retorno = false;
    }

      // Validación de las contraseñas
      if (PASSWORD.trim() === "" || CONFIRM_PASSWORD.trim() === "") {
        idErr.push(4);
        cantErrores++;
        retorno = false;
      } else if (retorno && PASSWORD !== CONFIRM_PASSWORD) {
        alert("Las contraseñas no coinciden. Por favor, inténtelo de nuevo.");
        event.preventDefault();
        retorno = false;
      }
      if(!retorno && cantErrores > 1 )
      {
        console.log(cantErrores);
        alert(ControlDeErrores(cantErrores,idErr));
        event.preventDefault();
      }
      else if(!retorno && cantErrores == 1)
      {
        alert("Por favor ingrese " + SwitchDeErroes(idErr[0]) + ".");
        event.preventDefault();
      }
      return retorno;
    });
});
