var Box1 = document.getElementById("hjñ");
var Box2 = document.getElementById("hj");

var boton = document.getElementById("boton");



boton.addEventListener("click",function()
{
    console.log(Box1.value);
})

function validateForm() {
    res = true
    var x = document.forms["myForm"]["fname"].value;
    
    if (x == null || x == "") {
        alert("Debe completar el campo 'Nombre'");
        res = false;
    }

    return res 
}
