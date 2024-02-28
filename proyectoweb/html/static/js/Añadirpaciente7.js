document.addEventListener("DOMContentLoaded", function() {
    const volver = document.getElementById("volver");
    const SOLICITUDHECHA = 4;
    const RESPUESTAEXITOSA = 200;
    const formulario = document.getElementById('agregarpaciente-form');
    const inputs = document.querySelectorAll('#agregarpaciente-form input');

    formulario.addEventListener("submit", function(event) {
        event.preventDefault(); 
        if (validateForm()) {
            var envioAlServidor = new XMLHttpRequest();
            var formatoDeData = new FormData(document.getElementById("agregarpaciente-form"));
            envioAlServidor.open("POST", "/subirdatospacientes", true);
            envioAlServidor.onreadystatechange = function() {
                if (envioAlServidor.readyState === SOLICITUDHECHA && envioAlServidor.status === RESPUESTAEXITOSA) {
                    var respuesta = JSON.parse(envioAlServidor.responseText);
                    if (respuesta.respuesta === "Hecho") {
                        alert("Paciente registrado exitosamente.");
                        window.location.href = "/";
                    } else {
                        alert(respuesta.respuesta);
                    }
                }
            };
            envioAlServidor.send(formatoDeData);
            formulario.reset();
            window.location.href = "/tabla";
            document.getElementById('form_msj_exito').classList.add('form_msj_exito_activo');
            setTimeout(() => {
                document.getElementById('form_msj_exito').classList.remove('form_msj_exito_activo');
            }, 5000);
            document.querySelectorAll('.formulario__grupo_correcto').forEach((margen) => {
                margen.classList.remove('formulario__grupo_correcto');
            });
        } else {
            document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
            setTimeout(() => {
                document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
            }, 6000);
        }
    });
    
    volver.addEventListener("click", function(event) {
        const peticion = new XMLHttpRequest();
        peticion.open("POST", "/redireccion", true);
        peticion.setRequestHeader("Content-Type", "application/json");
        peticion.onreadystatechange = function() {
            if (peticion.readyState === SOLICITUDHECHA && peticion.status === RESPUESTAEXITOSA) {
                let respuesta = JSON.parse(peticion.responseText);
                window.location.href = respuesta.url;
            }
        };
        peticion.send(JSON.stringify({"peticion": "volverT"}));
    });

    const fechaInput = document.getElementById('Fecha');
    const fechaHoy = new Date().toISOString().split('T')[0];
    fechaInput.setAttribute('value', fechaHoy);

    const expresiones = {
        nombre: /^[a-zA-ZÀ-ÿ]{3,20}$/,
        apellido: /^[a-zA-ZÀ-ÿ]{3,40}$/,
        dni: /^\d{7,8}$/,
        numerodeafiliado: /^\d{7,15}$/,
        obraSocial: /^[a-zA-Z0-9]{4,16}$/,
        numObraSocial: /^.{4,12}$/,
        nroTelefono: /^.{8,14}$/,
        domicilio:/^[a-zA-Z0-9 ]+.{4,40}$/
    };

    const campos = {
        nombre: false,
        apellido: false,
        dni: false,
        numerodeafiliado: false,
        obraSocial: false,
        numObraSocial: false,
        nroTelefono: false,
        domicilio: false
    };

    const validarFormulario = (e) => {
        switch (e.target.name){
            case "numerodeafiliado":
                validarCampo(expresiones.numerodeafiliado, e.target, 'numerodeafiliado' );
                break;
            case "nombre":
                validarCampo(expresiones.nombre,e.target, 'nombre');
                break;
            case "obraSocial":
                validarCampo(expresiones.obraSocial,e.target, 'obraSocial');
                break;
            case "apellido":
                validarCampo(expresiones.apellido,e.target, 'apellido');
                break;
            case "dni":
                validarCampo(expresiones.dni,e.target, 'dni');
                break;
            case "numObraSocial":
                validarCampo(expresiones.numObraSocial,e.target, 'numObraSocial');
                break;
            case "domicilio":
                validarCampo(expresiones.domicilio,e.target, 'domicilio');
                break;
            case "nroTelefono":
                validarCampo(expresiones.nroTelefono,e.target, 'nroTelefono');
                break;
        }
    };

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
    };

    inputs.forEach((input) => {
        input.addEventListener('keyup', validarFormulario);
        input.addEventListener('blur', validarFormulario);
    });

    const validateForm = () => {
        let formValido = true;

        Object.values(campos).forEach(valor => {
            if(!valor) {
                formValido = false;
            }
        });

        return formValido;
    };

});
