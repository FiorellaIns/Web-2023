document.addEventListener("DOMContentLoaded", function() {
    const pacienteLink = document.getElementById("paciente");
    const PerfilLink = document.getElementById("Perfil");
    const cerrarLink = document.getElementById("cerrar");
  
    pacienteLink.addEventListener("click", function() {
        window.location.href = "Tabla.html"; 
    });
  
    PerfilLink.addEventListener("click", function() {
        window.location.href = "perfilMedico.html"; 
    });

    cerrarLink.addEventListener("click", function() {
        window.location.href = "login.html"; 
    });
})