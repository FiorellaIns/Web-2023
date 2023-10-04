function validarFormulario() {
    var usuario = document.getElementById("usuario").value;
    var contrasena = document.getElementById("contrasena").value;

    // Realiza la validación en el lado del cliente
    if (usuario === "" || contrasena === "") {
        alert("Por favor, complete todos los campos.");
        return false;
    }

    // Puedes agregar más reglas de validación según tus necesidades aquí.

    return true;
}