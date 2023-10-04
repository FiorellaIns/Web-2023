document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
  
    form.addEventListener("submit", function (event) {
      // Validación del campo Fecha
      const fecha = document.querySelector('#Fecha').value;
      if (fecha.trim() === "") {
        alert("Por favor, ingrese una Fecha.");
        event.preventDefault();
        return false;
      }
  
      // Validación del campo Motivo de concurrencia
      const motivo = document.querySelector('#Motivo').value;
      if (motivo.trim() === "") {
        alert("Por favor, ingrese un Motivo de concurrencia.");
        event.preventDefault();
        return false;
      }
  
      // Validación del campo Nombre del Medico
      const nombreMedico = document.querySelector('#Nombre').value;
      if (nombreMedico.trim() === "") {
        alert("Por favor, ingrese un Nombre del Medico.");
        event.preventDefault();
        return false;
      }
  
      // Validación del campo Diagnóstico médico
      const diagnosticoMedico = document.querySelector('#Diag').value;
      if (diagnosticoMedico.trim() === "") {
        alert("Por favor, ingrese un Diagnóstico médico.");
        event.preventDefault();
        return false;
      }
  
      // Validación del campo Descripción
      const descripcion = document.querySelector('#Descri').value;
      if (descripcion.trim() === "") {
        alert("Por favor, ingrese una Descripción.");
        event.preventDefault();
        return false;
      }
  
      // Si todas las validaciones son exitosas, el formulario se enviará.
      return true;
    });
  });
  