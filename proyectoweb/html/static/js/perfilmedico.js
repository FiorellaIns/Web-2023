document.addEventListener("DOMContentLoaded", function() {
  const volverButton = document.getElementById("volver");
  const editarPerfilButton = document.getElementById("siguiente");

  volverButton.addEventListener("click", function() {
      redireccionar("/index"); 
  });

  editarPerfilButton.addEventListener("click", function() {
      redireccionar("/editar_perfil_medico");
  });

  function redireccionar(url) {
      window.location.href = url;
  }
});
