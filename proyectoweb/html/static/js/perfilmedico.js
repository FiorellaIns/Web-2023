$(document).ready(function() {
  $(".boton1").click(function() {
      navigateTo("/index");
  });
  $(".boton").click(function() {
      navigateTo("/editar_perfil_medico"); 
  });

  function navigateTo(url) {
      window.location.href = url; 
  }
});
