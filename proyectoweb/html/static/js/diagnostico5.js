const formulario = document.getElementById('agregarpaciente-form');
const inputs = document.querySelectorAll('#agregarpaciente-form input');

const expresiones = {
    nombreM: /^[a-zA-ZÀ-ÿ]{4,16}$/, 
    motivo: /^[a-zA-ZÀ-ÿ]{1,120}$/
};

const campos = {
    nombreM: false,
    motivo: false
};

const validarFormulario = (e) => {
  switch (e.target.name){
      case "nombreM":
        validarCampo(expresiones.nombreM, e.target, 'nombreM' );
      break;
      case "motivo":
        validarCampo(expresiones.motivo,e.target, 'motivo');
          
      break;
  }
  
}




const validarCampo = (expresion, input, campo) => {
  if(expresion.test(input.value)){
      document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo_incorrecto');
      document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo_correcto');
      document.querySelector(`#grupo__${campo} .diag__form__error`).classList.remove('diag__form__error__activo');
      campos[campo] = true;
  }
  else{
      document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo_incorrecto');
      document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo_correcto');
      document.querySelector(`#grupo__${campo} .diag__form__error`).classList.add('diag__form__error__activo');
      campos[campo] = false;
  }
}

inputs.forEach((input) => {
  input.addEventListener('keyup', validarFormulario)
  input.addEventListener('blur',validarFormulario)

});


formulario.addEventListener('submit', (e) => {
  e.preventDefault();

  if (campos.motivo && campos.nombreM ){
      formulario.reset();

      window.location.href = "tabla.html";

      document.getElementById('form_msj_exito').classList.add('form_msj_exito_activo');
      setTimeout(() => {
          document.getElementById('form_msj_exito').classList.remove('form_msj_exito_activo');


      }, 5000);

      document.querySelectorAll('.formulario__grupo_correcto').forEach((margen) => {
          margen.classList.remove('formulario__grupo_correcto');

      });
      
  } else{
      document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
      setTimeout(() => {
          document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');


      }, 6000);
  }

  

  
});











document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formulario");
  const mensajeError = document.getElementById("mensaje-error");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    
    const nombre = document.getElementById("Fecha").value;
    const apellido = document.getElementById("Motivo").value;
    const dni = document.getElementById("Nombre").value;
    const nrodeafiliado = document.getElementById("Diag").value;
    const obrasocial = document.getElementById("Descri").value;
    if (nombre && apellido && dni && nrodeafiliado && obrasocial ) {
      window.location.href = "paciente.html";
    } else {
      mensajeError.textContent = "Por favor, complete todos los campos.";
    }
  });
});
  