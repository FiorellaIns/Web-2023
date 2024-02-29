document.addEventListener("DOMContentLoaded", function() {
  const links = document.querySelectorAll(".reg");
  const botonConfirmarCambio = document.getElementById("confirmarCambio");
  const botonConfirmarClave = document.getElementById("confirmarClave");
  const recuperarUsuario = document.getElementById("enviar");
  const boton = document.getElementById("volver");
  const campoDeMail = document.getElementById("email");
  const campoDeClave = document.getElementById("clave");
  const campoContra = document.getElementById("nuevaContra");
  const campoContraRepetir = document.getElementById("repetir");

  var eMailValido = false;
  var contraseniaValida = false;

  if(boton != null) boton.addEventListener("click",function(evento)
  {
    const SOLICITUDHECHA = 4;
    const RESPUESTAEXITOSA = 200;
    const peticion = new XMLHttpRequest();

    peticion.open("POST", "/redireccion", true);
    peticion.setRequestHeader("Content-Type","application/json");
    peticion.onreadystatechange = function() 
    {
      if (peticion.readyState === SOLICITUDHECHA && peticion.status === RESPUESTAEXITOSA) 
      {
            let respuesta = JSON.parse(peticion.responseText);
            window.location.href = respuesta.url; 
      }
    };
    peticion.send(JSON.stringify({"peticion":"volver"}));
  });

  if(botonConfirmarClave != null)botonConfirmarClave.addEventListener("click",function(evento)
  {
    const SOLICITUDHECHA = 4;
    const RESPUESTAEXITOSA = 200;
    const peticion = new XMLHttpRequest();

    peticion.open("POST","/ControladorDeContrasenia",true);
    peticion.setRequestHeader("Content-Type","application/json");
    peticion.onreadystatechange = function()
    {
      if (peticion.readyState === SOLICITUDHECHA && peticion.status === RESPUESTAEXITOSA)
      {
        variables = JSON.parse(peticion.responseText);
        if(variables.exito)
          location.reload();
        else
          alert("La clave no es valida...");
      }
    };
    peticion.send(JSON.stringify({"modo":"ConfirmarClave","clave":campoDeClave.value}));
  });

  if(botonConfirmarCambio != null)botonConfirmarCambio.addEventListener("click",function(evento)
  {
    if(contraseniaValida)
    {
      const SOLICITUDHECHA = 4;
      const RESPUESTAEXITOSA = 200;
      const peticion = new XMLHttpRequest();

      peticion.open("POST","/ControladorDeContrasenia",true);
      peticion.setRequestHeader("Content-Type","application/json");
      peticion.onreadystatechange = function()
      {
        if (peticion.readyState === SOLICITUDHECHA && peticion.status === RESPUESTAEXITOSA)
        {
          variables = JSON.parse(peticion.responseText);
          if(variables.exito)
          {
            alert("Se cambio correctamente la contraseña");
            location.href = variables.url;
          }
          else
            alert("Hubo un problema en el servidor");
        }
      };
      peticion.send(JSON.stringify({"modo":"ConfirmarContrasenia","contrasenia":campoContra.value}));
    }
    else
      alert("Las contraseñas no coinciden");
  });
  if(recuperarUsuario != null)recuperarUsuario.addEventListener("click",function(evento)
  {
    if(eMailValido)
    {
      const SOLICITUDHECHA = 4;
      const RESPUESTAEXITOSA = 200;
      const peticion = new XMLHttpRequest();

      peticion.open("POST","/ControladorDeContrasenia",true);
      peticion.setRequestHeader("Content-Type","application/json");
      peticion.onreadystatechange = function()
      {
        if (peticion.readyState === SOLICITUDHECHA && peticion.status === RESPUESTAEXITOSA)
        {
          variables = JSON.parse(peticion.responseText);
          if(variables.exito)
            location.reload();
          else
            alert("No se encontro el mail solicitado");
        }
      };
      peticion.send(JSON.stringify({"modo":"ObtenerEMail","mail":campoDeMail.value}));
    }
    else 
      alert("No se ha ingresado un Mail valido");
  });

  if(campoDeMail != null)campoDeMail.addEventListener("input",function(eventos)
  {
    texto = campoDeMail.value;
    regEx = /^[^\s@]+[@][^\s@]+[.][^\s@]+$/
    eMailValido = regEx.test(texto);
  });
  if(campoContra != null && campoContraRepetir != null)
  {
    var campoP;
    var campCB;
    campoContra.addEventListener("input",function(evento)
    {
      const regEx = /^[^\s]+$/;
      campoP = campoContra.value;
      campCB = campoContraRepetir.value;
      contraseniaValida = campoP === campCB && regEx.test(campoP);
    });
    campoContraRepetir.addEventListener("input",function(evento)
    {
      const regEx = /^[^\s]+$/;
      campoP = campoContra.value;
      campCB = campoContraRepetir.value;
      contraseniaValida = campoP === campCB && regEx.test(campoP);
    });
}
});