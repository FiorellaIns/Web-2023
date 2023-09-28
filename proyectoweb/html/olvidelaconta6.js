var Box1 = document.getElementById("hjñ");
var Box2 = document.getElementById("hj");

var boton = document.getElementById("boton");



boton.addEventListener("click",function()
{
    console.log(Box1.value);
})


function validarinputs(box1,box2){
    var largo=box1.length;
    
    if (box1!=box2){
        alert("Eror, los campos son distintos");
    }
    
    else if(largo<8 && largo>16 ){
        alert("La contraseña debe estar entre 8 y 16 caracteres");
    }

    else if (box1 == null || box1 == "" || box2 == null || box2 == "" ){
        alert("Eror, hay un campo esta vacio");
    }
    
    else{
        alert("Su contraseña se ha cambiado correctamente.");
        i=0;
    }

}