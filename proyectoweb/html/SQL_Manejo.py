import mysql.connector

def IniciarSeccion(lista=[]):
    retorno = -1

    conexion = mysql.connector.connect(host = "localhost",user = "root",password = "",database = "basededatos")

    herramienta = conexion.cursor()

    herramienta.execute("SELECT * FROM usuarios")

    consulta = herramienta.fetchall()

    for listas in consulta:
        if(lista[0] == listas[6] and lista[1] == listas[5]):
            retorno = listas[0]
            break
    return retorno
def CodigoValido(claveDada):
    retorno = False

    conexion = mysql.connector.connect(host = "localhost",user = "root",password = "",database = "basededatos")

    herramienta = conexion.cursor()

    herramienta.execute("SELECT codigo FROM Claves")

    consulta = herramienta.fetchall()

    for claves in consulta:
        if(claveDada == claves):
            retorno = True
            break
    return retorno