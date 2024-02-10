import mysql.connector

def IniciarSeccion(lista=[]):
    retorno = -1

    conexion = mysql.connector.connect(host = "localhost",user = "root",password = "",database = "basedecoso")

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

    conexion = mysql.connector.connect(host = "localhost",user = "root",password = "",database = "basedecoso")

    herramienta = conexion.cursor()

    herramienta.execute("SELECT Clave FROM claves")

    consulta = herramienta.fetchall()

    
    for claves in consulta:
        print(claves)
        if(claveDada == claves[0]):
            retorno = True
            break
    return retorno

def ObtenerID(conexion,dato):
    herramienta = conexion.cursor()
    print(dato)
    comando = "SELECT ID FROM claves WHERE Clave = " + "\"" + dato + "\""
    herramienta.execute(comando)
    consulta = herramienta.fetchall()
    herramienta.close()
    return consulta

def QuitarColumna(conexion,ID):
    herramienta = conexion.cursor()
    comando = "DELETE FROM claves WHERE ID = {}".format(ID[0][0])
    herramienta.execute(comando)
    conexion.commit()
    herramienta.close()

def CargarEnUsuario(lista = []):
    longitud = 0
    conexion = mysql.connector.connect(host = "localhost",user = "root",password = "",database = "basedecoso")
    herramienta = conexion.cursor()
    longitud = len(lista)
    if longitud == 8:
        comando = "INSERT INTO usuarios (ID,Nombre,Apellido,DNI,`Matricula medica`,Usuario,Contraseña,EMail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s)"
        argumentos = (None,lista[0],lista[1],lista[2],lista[3],lista[4],lista[5],lista[6])
        herramienta.execute(comando,argumentos)
        conexion.commit()
        herramienta.close()
        ID = ObtenerID(conexion,lista[7])
        QuitarColumna(conexion,ID)
        conexion.close()
