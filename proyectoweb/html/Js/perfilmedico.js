document.addEventListener("DOMContentLoaded", function() {
    const editarPerfilLink = document.getElementById("siguiente");
  
    if (editarPerfilLink) {
        editarPerfilLink.style.cursor = "pointer"; // Cambia el cursor al estilo de enlace
        editarPerfilLink.addEventListener("click", function() {
            // Redirige a la página de edición
            window.location.href = "editarperfilMedico.html";
        });
    }
});
