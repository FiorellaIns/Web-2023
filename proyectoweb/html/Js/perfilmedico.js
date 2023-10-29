document.addEventListener("DOMContentLoaded", function() {
    const editarPerfilLink = document.getElementById("siguiente");
  
    if (editarPerfilLink) {
        editarPerfilLink.style.cursor = "pointer";
        editarPerfilLink.addEventListener("click", function() {
            // Redirige a la página de edición
            window.location.href = "editarperfilMedico.html";
        });
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const volver = document.getElementById("volver");
  
    if (volver) {
        volver.style.cursor = "pointer";
        volver.addEventListener("click", function() {
            window.location.href = "login.html";
      });
    }
  });