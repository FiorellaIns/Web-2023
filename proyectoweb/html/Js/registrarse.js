document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", function (event) {
      // Validación del campo Nombre
      const nombre = document.querySelector('input[name="Nombre"]').value;
      if (nombre.trim() === "") {
        alert("Por favor, ingrese su Nombre.");
        event.preventDefault();
        return false;
      }

      // Validación del campo Apellido
      const apellido = document.querySelector('input[name="Apellido"]').value;
      if (apellido.trim() === "") {
        alert("Por favor, ingrese su Apellido.");
        event.preventDefault();
        return false;
      }

      // Validación del campo DNI //buscar error
      const dni = document.querySelector('input[name="DNI"]').value;
      if (dni.trim() === "" || !/^[\d.]+$/.test(dni)) {
        alert("Por favor, ingrese un DNI válido.");
        event.preventDefault();
        return false;}
      // Validación del campo matriculado //buscar error
      const Matricula = document.querySelector('input[name="Matricula"]').value;
      if (Matricula.trim() === "" || !/^[\d.]+$/.test(Matricula)) {
      alert("Por favor, ingrese un Matricula válida.");
      event.preventDefault();
      return false;
    }

      // Validación de las contraseñas
      const password = document.querySelector('input[name="usuario"]').value;
      const confirmPassword = document.querySelector('input[name="usuario_confirm"]').value;
      if (password.trim() === "" || confirmPassword.trim() === "") {
        alert("Por favor, complete ambos campos de contraseña.");
        event.preventDefault();
        return false;
      } else if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden. Por favor, inténtelo de nuevo.");
        event.preventDefault();
        return false;
      }

      return true;
    });
});
