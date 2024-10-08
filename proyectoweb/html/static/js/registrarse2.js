const formulario = document.getElementById('login-form');
const inputs = document.querySelectorAll('#login-form input');



document.addEventListener("DOMContentLoaded", function() {
    const targetId = document.getElementById("volver");
    targetId.addEventListener("click", function(event) {
        const SOLICITUDHECHA = 4;
        const RESPUESTAEXITOSA = 200;
        const peticion = new XMLHttpRequest();

        peticion.open("POST", "/redireccion", true);
        peticion.setRequestHeader("Content-Type", "application/json");
        peticion.onreadystatechange = function() {
            if (peticion.readyState === SOLICITUDHECHA && peticion.status === RESPUESTAEXITOSA) {
                let respuesta = JSON.parse(peticion.responseText);
                window.location.href = respuesta.url; 
            }
        };
        peticion.send(JSON.stringify({"peticion": "volver"}));
    });
});


const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ]{4,16}$/,
    apellido: /^[a-zA-ZÀ-ÿ]{4,40}$/,
    password: /^.{4,12}$/, 
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    dni: /^\d{7,8}$/, 
    password2: /^.{4,12}$/,
    matriculamedica: /^\d{7,15}$/,

}

campos = {
    "nombre": false,
    "apellido": false,
    "usuario": false,
    "email": false,
    "dni": false,
    "matriculamedica": false,
    "codigoUnico": false,
    "password": false
}

const validarFormulario = (e) => {
    switch (e.target.name){
        case "usuario":
            validarCampo(undefined, e.target, 'usuario' );
        break;
        case "nombre":
            validarCampo(expresiones.nombre,e.target, 'nombre');
           
        break;
        case "password":
            validarCampo(expresiones.password,e.target, 'password');
            
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
        case "codigoUnico":
            validarCampo(undefined,e.target,"codigoUnico")
    }
    
}



const validarCampo = (expresion, input, campo) => {
    if(expresion != undefined && expresion.test(input.value)){
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo_incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo_correcto');
        document.querySelector(`#grupo__${campo} .log__form__input_error`).classList.remove('log__form__input_error_activo');
        campos[campo] = true;
    }
    else if(expresion == undefined && input.value != '' && EstaDentro(campo))
    {
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo_incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo_correcto');
        document.querySelector(`#grupo__${campo} .log__form__input_error`).classList.remove('log__form__input_error_activo');
        campos[campo] = true;
    }
    else
    {
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo_incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo_correcto');
        document.querySelector(`#grupo__${campo} .log__form__input_error`).classList.add('log__form__input_error_activo');
        campos[campo] = false;
    }
}

const validarPassword2 = () => {
    const inputPassword1 = document.getElementById('password');
    const inputPassword2 = document.getElementById('password2');
    if (inputPassword1.value !== ''){
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
    }
    else{
        document.getElementById('grupo__password2').classList.add('formulario__grupo_incorrecto');
        document.getElementById('grupo__password2').classList.remove('formulario__grupo_correcto');
        document.querySelector('#grupo__password2 .log__form__input_error').classList.remove('log__form__input_error_activo');
    }
    
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario)
    input.addEventListener('blur',validarFormulario)

});


formulario.addEventListener('submit', (e) => {
    const SOLICITUDHECHA = 4;
    const RESPUESTAEXITOSA = 200;
    if (!EsValido())
    {
        e.preventDefault();
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
        setTimeout(() => {
            document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
        }, 6000);
    }
    else
    {
        e.preventDefault();
        var envioAlServidor = new XMLHttpRequest();
        var formatoDeData = new FormData(document.getElementById("login-form"));
        envioAlServidor.open("POST","/Registro_Post",true);
        envioAlServidor.onreadystatechange = function() 
        {
            if(envioAlServidor.readyState === SOLICITUDHECHA && envioAlServidor.status === RESPUESTAEXITOSA)
            {
                var respuesta = JSON.parse(envioAlServidor.responseText);
                if(respuesta.respuesta === "Hecho")
                {
                    alert("Hecho");
                    window.location.href = "/";
                }
                else
                    alert(respuesta.respuesta);
            }
        };
        envioAlServidor.send(formatoDeData);
    }
});

function EstaDentro(campo = String)
{
    retorno = false;
    const existentes = ["usuario","nombre","apellido","codigoUnico"];
    if(existentes.includes(campo))
        retorno = true;
    return retorno;
}

function EsValido()
{
    retorno = true;
    const CAMPOS_A_VALIDAR = ["usuario","nombre","apellido","password","email","matriculamedica","dni","codigoUnico"];
    for(let i = 0,lo = CAMPOS_A_VALIDAR.length;i<lo && retorno;i++)
        retorno = campos[CAMPOS_A_VALIDAR[i]];
    return retorno;
}