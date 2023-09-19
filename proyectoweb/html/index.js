function Encabezado(html)
{
    var retorno = html + "<tr>\n";
    const COLUMNAS = ["Nombre","Apellido","DNI","Nro de afiliado","Obra social","Nro de obra social","Nro de celular","Nro de telefono","Domicilio","Fecha de primera consulta","Fecha de ultima consulta"];
    for(let i = 0;i<11;i++)
        retorno = retorno +  "<th>" + COLUMNAS[i] + "</th>" + "\n";
    return retorno + "</tr>\n";
}

function agregarArray(array=[],html="")
{
    var retorno = html + "<tr>\n";
    for(let i = 0,cant = array.length;i<cant;i++)
        retorno = retorno + "<td>" + array[i] + "</td>\n";
    return retorno + "</tr>\n";
}
var tabla = ""
var tablaDeHTML = document.getElementById("miTabla");
tabla = Encabezado();
tablaDeHTML.innerHTML = tabla;