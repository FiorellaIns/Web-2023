const formulario = document.getElementById('login-form');
const inputs = document.querySelectorAll('#login-form input');

document.addEventListener("DOMContentLoaded", function() {
    const volver = document.getElementById("volver");
  
    if (volver) {
      volver.addEventListener("click", function() {
        window.location.href = "login.html";
      });
    }
  });


const expresiones = {
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, 
    nombre: /^[a-zA-ZÀ-ÿ]{1,40}$/, 
    password: /^.{4,12}$/, 
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    dni: /^\d{7,8}$/, 
    password2: /^.{4,12}$/,
    matriculamedica: /^\d{7,15}$/,
    apellido: /^[a-zA-ZÀ-ÿ]{1,40}$/,

}

const campos = {
    usuario: false,
    nombre: false,
    apellido: false,
    email: false,
    dni: false,
    matriculamedica: false,
    password: false
}

const validarFormulario = (e) => {
    switch (e.target.name){
        case "usuario":
            validarCampo(expresiones.usuario, e.target, 'usuario' );
        break;
        case "nombre":
            validarCampo(expresiones.nombre,e.target, 'nombre');
            
        break;
        case "password":
            validarCampo(expresiones.password,e.target, 'password');
            validarPassword2()
            
        break;
        case "apellido":
            validarCampo(expresiones.apellido,e.target, 'apellido');
            
        break;
        case "dni":
            validarCampo(expresiones.dni,e.target, 'dni');
            
        break;
        case "matriculamedica":
            validarCampo(expresiones.matriculamedica,e.target, 'matriculamedica');
            
        break;
        case "email":
            validarCampo(expresiones.email,e.target, 'email');
            
        break;
        case "password2":
            validarPassword2();
            
        break;
    }
    
}



const validarCampo = (expresion, input, campo) => {
    if(expresion.test(input.value)){
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo_incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo_correcto');
        document.querySelector(`#grupo__${campo} .log__form__input_error`).classList.remove('log__form__input_error_activo');
        campos[campo] = true;
    }
    else{
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo_incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo_correcto');
        document.querySelector(`#grupo__${campo} .log__form__input_error`).classList.add('log__form__input_error_activo');
        campos[campo] = false;
    }
}

const validarPassword2 = () => {
    const inputPassword1 = document.getElementById('password');
    const inputPassword2 = document.getElementById('password2');
    if (inputPassword2 !== ''){
        document.getElementById('grupo__password2').classList.remove('formulario__grupo_incorrecto');
        document.querySelector('#grupo__password2 .log__form__input_error').classList.remove('log__form__input_error_activo');

        if(inputPassword1.value !== inputPassword2.value){
            document.getElementById('grupo__password2').classList.add('formulario__grupo_incorrecto');
            document.getElementById('grupo__password2').classList.remove('formulario__grupo_correcto');
            document.querySelector('#grupo__password2 .log__form__input_error').classList.add('log__form__input_error_activo');
            campos['password'] = false;
            
        } else{
            document.getElementById('grupo__password2').classList.remove('formulario__grupo_incorrecto');
            document.getElementById('grupo__password2').classList.add('formulario__grupo_correcto');
            document.querySelector('#grupo__password2 .log__form__input_error').classList.remove('log__form__input_error_activo');
            campos['password'] = true;
        }
    }else{
        document.getElementById('grupo__password2').classList.add('formulario__grupo_incorrecto');
        document.querySelector('#grupo__password2 .log__form__input_error').classList.add('log__form__input_error_activo');


    }
    
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario)
    input.addEventListener('blur',validarFormulario)

});


formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    if (campos.usuario && campos.password && campos.nombre && campos.apellido && campos.email && campos.dni && campos.matriculamedica ){
        formulario.reset();

        window.location.href = "login.html";

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

