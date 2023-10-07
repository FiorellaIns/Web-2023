


document.addEventListener("DOMContentLoaded",function()
{
    const ENVIO_FORMULARIO = document.querySelector("form");
    ENVIO_FORMULARIO.addEventListener("submit",function(event)
    {
        var retorno = true;
        const CONTRASENA = document.querySelector("input[id = \"contrasena\"]");
        const CONFIRMACION_CONTRASENA = document.querySelector("input[id = \"repeticion\"]");
        
        if(CONTRASENA.value === "" && CONFIRMACION_CONTRASENA.value === "")
        {
            alert("Rellene los dos campos");
            event.preventDefault();
            retorno = false;
        }
        else if(CONTRASENA.value === "")
        {
            alert("Rellene el campo de nueva contraseña");
            event.preventDefault();
            retorno = false;
        }
        else if(CONFIRMACION_CONTRASENA.value === "")
        {
            alert("Rellene el campo de repetir contraseña");
            event.preventDefault();
            retorno = false;
        }
        if(retorno && (CONTRASENA.value !== CONFIRMACION_CONTRASENA.value))
        {
            alert("Las contraseñas no coinciden");
            event.preventDefault();
            retorno = false;
        }
        return retorno;
    });
});