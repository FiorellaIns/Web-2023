document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.getElementById("login-form");
  const mensajeError = document.getElementById("mensaje-error");

  formulario.addEventListener("submit", function (event) {
    window.location.href="index.html";
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

document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.getElementById("login-form");
  const mensajeError = document.getElementById("mensaje-error");

  formulario.addEventListener("submit", function (event) {
    const urlRegistro = window.location.origin + "/registro";
    window.location.href = urlRegistro;
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const olvideContraLink = document.getElementById("olvideContra");
  const registrarseLink = document.getElementById("registrarse");

  olvideContraLink.addEventListener("click", function() {
    const urlOlvidelaContra = window.location.origin + "/olvidelacontraseña";
    window.location.href = urlOlvidelaContra;
  });

  registrarseLink.addEventListener("click", function() {
    const urlRegistro = window.location.origin + "/registro";
    window.location.href = urlRegistro;
  });
});


