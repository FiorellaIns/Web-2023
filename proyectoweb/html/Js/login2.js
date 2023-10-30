document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.getElementById("login-form");
  const mensajeError = document.getElementById("mensaje-error");

  formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const usuario = document.getElementById("usuario").value;
    const contrasena = document.getElementById("contrasena").value;

    if (usuario === "usuario_valido" && contrasena === "contrasena_valida") {
      window.location.href = "index.html";
    }
    else if (usuario === "user" && contrasena === "user") {
      window.location.href = "index.html";
    }
    else if (usuario === "admin" && contrasena === "admin") {
      window.location.href = "administradorPerfil.html";
    } 
    else {
      mensajeError.textContent = "Usuario o contraseña incorrectos. Por favor, inténtelo de nuevo.";
    }
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const olvideContraLink = document.getElementById("olvideContra");
  const registrarseLink = document.getElementById("registrarse");

  olvideContraLink.addEventListener("click", function() {
      window.location.href = "olvidelaconta.html"; 
  });

  registrarseLink.addEventListener("click", function() {
<<<<<<< HEAD
      window.location.href = "registrarse.html"; 
=======
      window.location.href = "registrarsePruebaFran.html"; 
>>>>>>> parent of f1fa377 (a)
  });
});