import mysql.connector

def IniciarSeccion(lista=[]):
    retorno = -1

    conexion = mysql.connector.connect(host = "localhost",user = "root",password = "",database = "consultorio")

    herramienta = conexion.cursor()

    herramienta.execute("SELECT * FROM usuario")

    consulta = herramienta.fetchall()

    for listas in consulta:
        if(lista[0] == listas[1] and lista[1] == listas[2]):
            retorno = listas[0]
            break
    return retorno