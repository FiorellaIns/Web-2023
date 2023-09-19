class Buscador
{
    idDeLaTabla = HTMLElement;
    html = "";
    posicion = [];
    arrayAColocar = [[""]];
    arrayRecibido = [[""]];
    constructor(arrayDeSQL=[[]],idTabla="")
    {
        this.arrayRecibido = arrayDeSQL;
        this.arrayAColocar = arrayDeSQL;
        this.idDeLaTabla = document.getElementById(idTabla);
        this.ArmarHTML();
        this.ModificarHTML();
    }
    Cambio(texto="",posicion = 0)
    {
        this.posicion = [];
        var arraysSeleccionados = [[]];
        let longitud = this.arrayRecibido.length;
        for(let i = 0;i<longitud;i++)
        {
            let arrayRec = this.arrayRecibido[i];
            let cant = arrayRec[posicion].length;
            if(texto.length == 0)
            {
                arraysSeleccionados = this.arrayRecibido;
            }
            else if(texto.length < cant)
            {
                if(this.Aminuscula(arrayRec[posicion]).includes(this.Aminuscula(texto)))
                {
                    this.posicion.push(i);
                    arraysSeleccionados.push(arrayRec);
                }
            }
            if(texto.length == cant)
                if(this.Aminuscula(arrayRec[posicion]) == this.Aminuscula(texto))
                {
                    this.posicion = [i];
                    arraysSeleccionados.push(arrayRec);
                }
        }
        this.arrayAColocar = arraysSeleccionados;
        this.html = "";
        this.ArmarHTML();
        this.ModificarHTML();
    }
    ModificarHTML()
    {
        this.idDeLaTabla.innerHTML = this.html;
    }
    ArmarHTML()
    {
        var lArrayAColocar = this.arrayAColocar;
        var lHTML = this.html;
        lHTML = this.Encabezado(lHTML);
        for(let i = 0,cant = lArrayAColocar.length;i<cant;i++)
            lHTML = this.AgregarArray(lArrayAColocar[i],lHTML);
        this.html = lHTML;
    }
    Encabezado(html)
    {
        var retorno = html + "<tr>\n";
        const COLUMNAS = ["Nombre","Apellido","DNI","Nro de afiliado","Obra social","Nro de obra social","Nro de celular","Nro de telefono","Domicilio","Fecha de primera consulta","Fecha de ultima consulta"];
        for(let i = 0;i<11;i++)
            retorno = retorno +  "<th>" + COLUMNAS[i] + "</th>" + "\n";
        return retorno + "</tr>\n";
    }
    AgregarArray(array=[],html="")
    {
        var retorno = html + "<tr>\n";
        for(let i = 0,cant = array.length;i<cant;i++)
            retorno = retorno + "<td>" + array[i] + "</td>\n";
        return retorno + "</tr>\n";
    }
    Aminuscula(str="")
    {
        var retorno = "";
        for(let i = 0,cant = str.length;i<cant;i++)
        {
            if(str.charCodeAt(i) >= 65 && str.charCodeAt(i) <= 90)
                retorno = retorno + String.fromCharCode((str.charCodeAt(i))+32);
            else if(str.charAt(i) == "ñ")
                retorno = retorno + "Ñ";
            else
                retorno = retorno + str.charAt(i);
        }
        return retorno;
    }
}
var comboBox = document.getElementById("caja");
var tabla = Buscador;
var tablaDeHTML = document.getElementById("miTabla");
arrayArtificial = [["dasdas","asdasdsada","sdasdasdas","dasdaa","asddasdas","sdasda","asddas","sdasda","dasda","dasdasasda","sdasda"],["Coca cola","afil","pacien","das","zvb","ote","sa","mn","po","lo","ñl"],["Tercera","das","nb","fa","cv","cx","año","Nuevo","HD","lol","XD"]];
tabla = new Buscador(arrayArtificial,"miTabla");
var control = document.getElementById("Entrada");
control.addEventListener("input",function()
{
    tabla.Cambio(control.value,comboBox.value);
});