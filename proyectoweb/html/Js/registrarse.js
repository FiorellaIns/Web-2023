function validarFormulario(event) {
  var nombre = document.getElementById('nombre').value;
  var apellido = document.getElementById('apellido').value;
  var dni = document.getElementById('dni').value;
  var matricula = document.getElementById('matricula').value;
  var usuario = document.getElementById('usuario').value;
  var password = document.getElementById('password').value;
  var confirmPassword = document.getElementById('confirm-password').value;

  if (nombre === "" || apellido === "" || dni === "" || matricula === "" || usuario === "" || password === "" || confirmPassword === "") {
      document.getElementById('error-message').textContent = "Por favor, complete todos los campos.";
      event.preventDefault(); // Evitar el envío del formulario si no se completaron todos los campos
  } else {
    window.location.href = "login.html";
      // Si todos los campos están completos, el formulario se enviará automáticamente a "login.html"
  }
}
