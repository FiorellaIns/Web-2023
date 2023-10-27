document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formulario");
  form.addEventListener("submit", function (event) {
    const campos = form.querySelectorAll('input[required]');
    
    for (let i = 0; i < campos.length; i++) {
      const campo = campos[i];
      if (campo.value.trim() === "") {
        mostrarError(campo);
        event.preventDefault();
        return;
      }
      else{
        window.location.assign("tabla.html");
      }
    }
  });
  
  function mostrarError(input) {
    const errorDiv = input.nextElementSibling;
    errorDiv.textContent = "Campo Incompleto";
    errorDiv.style.color = "red";
  }
});
