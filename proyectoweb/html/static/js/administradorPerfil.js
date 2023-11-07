document.addEventListener("DOMContentLoaded", function() {
    const editarLink = document.getElementById("editar");
    const cerrarLink = document.getElementById("cerrar");
  
    editarLink.addEventListener("click", function() {
        window.location.href = "tablaAdm.html"; 
    });
  
    cerrarLink.addEventListener("click", function() {
        window.location.href = "login.html"; 
    });
  });