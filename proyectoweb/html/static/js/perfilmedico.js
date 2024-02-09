<<<<<<< HEAD
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
=======
$(document).ready(function() {
  $(".boton1").click(function() {
      navigateTo("/index");
  });
  $(".boton").click(function() {
      navigateTo("/editar_perfil_medico"); 
  });

  function navigateTo(url) {
      window.location.href = url; 
>>>>>>> parent of 2374c25 (subidas)
  }
});
