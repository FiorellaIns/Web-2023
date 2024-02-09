document.addEventListener("DOMContentLoaded", function() {
  const volverButton = document.getElementById("volver");
  const editarPerfilButton = document.getElementById("siguiente");

  if (volverButton) {
    volverButton.addEventListener("click", function() {
      window.location.href = "/index";
    });
  }

  if (editarPerfilButton) {
    editarPerfilButton.addEventListener("click", function() {
      window.location.href = "/editar_perfil_medico";
    });
  }
});
