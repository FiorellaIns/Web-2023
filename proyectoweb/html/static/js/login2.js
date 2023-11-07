/*fetch("/SeHaProducidoError").then(response => response.json()).then(
  data =>
  {
    if(data.error)
    {
      document.getElementById("mensaje-error").textContent = "Usuario o contraseña incorrectos. Por favor, inténtelo de nuevo."
    }
  }
)*/

document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.getElementById("login-form");
  const mensajeError = document.getElementById("mensaje-error");

  formulario.addEventListener("submit", function (event) {
    
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const olvideContraLink = document.getElementById("olvideContra");
  const registrarseLink = document.getElementById("registrarse");

  olvideContraLink.addEventListener("click", function() {
      window.location.href = "olvidelaconta.html"; 
  });

  registrarseLink.addEventListener("click", function() {
      window.location.href = "registrarse1.html"; 
  });
});