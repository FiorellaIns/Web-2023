document.addEventListener("DOMContentLoaded", function() {
    const volver = document.getElementById("volver");
  
    if (volver) {
      volver.addEventListener("click", function() {
        window.location.href = "tabla.html";
      });
    }
  });
document.addEventListener("DOMContentLoaded",function(){
    const aniadir = document.getElementById("anotar");
    
    if(anotar){
        anotar.addEventListener("click",function() {
            window.location.href = "Añadirpaciente.html"
        });
    }
});