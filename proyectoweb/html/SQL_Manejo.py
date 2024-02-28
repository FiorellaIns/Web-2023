import mysql.connector
from datetime import datetime

def IniciarSeccion(lista=[]):
   mensaje = "Datos: incompletos"
   if len(lista) == 2:
       if lista[0] != "" and lista[1] != "":
           conexion = InicializarConexion()
           herramienta = conexion.cursor()
           comando = "SELECT Contraseña FROM usuarios WHERE EMail = \"{}\"".format(lista[0])
           herramienta.execute(comando)
           respuesta = herramienta.fetchall()
           if len(respuesta) > 0:
               if respuesta[0][0] == lista[1]:
                   mensaje = "Hecho"
                   herramienta.execute("SELECT Usuario FROM usuarios WHERE EMail=\"{}\"".format(lista[0]))
                   mensaje = mensaje + ":{}".format((herramienta.fetchall())[0][0])
                   herramienta.execute("SELECT Administrador FROM usuarios WHERE EMail=\"{}\"".format(lista[0]))
                   mensaje = mensaje + ":{}".format((herramienta.fetchall())[0][0])
                   herramienta.execute("SELECT ID FROM usuarios WHERE EMail=\"{}\"".format(lista[0]))
                   mensaje = mensaje + ":{}".format((herramienta.fetchall())[0][0])
               else:
                   mensaje = "Usuario y/o: contraseña incorrecto/s"
           else:
                mensaje = "Usuario y/o: contraseña incorrecto/s"
           conexion.close()
           herramienta.close()
   return mensaje

def CodigoValido(claveDada):
    retorno = False

    conexion = InicializarConexion()

    herramienta = conexion.cursor()

    herramienta.execute("SELECT Clave FROM claves")

    consulta = herramienta.fetchall()

    
    for claves in consulta:
        if(claveDada == claves[0]):
            retorno = True
            break
    herramienta.close()
    conexion.close()
    return retorno

def ObtenerID(conexion,dato):
    herramienta = conexion.cursor()
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

def EsAdministrador(herramienta,clave):
    retorno = False
    comando = "SELECT Administrador FROM claves WHERE Clave=\"{}\"".format(clave)
    herramienta.execute(comando)
    retorno = (herramienta.fetchall())[0][0]
    return retorno

def CargarEnUsuario(lista = []):
    longitud = 0
    conexion = InicializarConexion()
    herramienta = conexion.cursor()
    longitud = len(lista)
    if longitud == 8:
        comando = "INSERT INTO usuarios (ID,Nombre,Apellido,DNI,`Matricula medica`,Usuario,Contraseña,EMail,Administrador) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s)"
        argumentos = (None,lista[0],lista[1],lista[2],lista[3],lista[4],lista[5],lista[6],EsAdministrador(herramienta,lista[7]))
        herramienta.execute(comando,argumentos)
        conexion.commit()
        herramienta.close()
        ID = ObtenerID(conexion,lista[7])
        QuitarColumna(conexion,ID)
        conexion.close()
def ObtenerUsuario(ID):
    retorno = ""
    conexion = InicializarConexion()
    herramienta = conexion.cursor()
    herramienta.execute("SELECT Usuario FROM usuarios WHERE ID = {}".format(ID))
    retorno = (herramienta.fetchall())[0][0]
    herramienta.close()
    conexion.close()
    return retorno

def ObtenerNombrePaciente(ID_Paciente):
    retorno = ""
    conexion = InicializarConexion()
    herramienta = conexion.cursor()
    herramienta.execute("SELECT Nombre FROM pacientes WHERE ID = {}".format(ID_Paciente))
    retorno = (herramienta.fetchall())[0][0]
    herramienta.close()
    conexion.close()
    return retorno

def ObtenerApellidoPaciente(ID_Paciente):
    retorno = ""
    conexion = InicializarConexion()
    herramienta = conexion.cursor()
    herramienta.execute("SELECT Apellido FROM pacientes WHERE ID = {}".format(ID_Paciente))
    retorno = (herramienta.fetchall())[0][0]
    herramienta.close()
    conexion.close()
    return retorno

def ObtenerPacientes():
    retorno = []
    conexion = InicializarConexion()
    herramienta = conexion.cursor()
    herramienta.execute("SELECT * FROM pacientes")
    retorno = herramienta.fetchall()
    herramienta.close()
    conexion.close()
    return retorno

def  InicializarConexion():
    return mysql.connector.connect(host = "localhost",user = "root",password = "",database = "basedecoso")



def ObtenerDatosDiagnosticoPaciente(id):
    conexion = InicializarConexion()
    herramienta = conexion.cursor()
    comando = "SELECT * FROM `historias clinicas` WHERE `ID paciente` = {}".format(id)
    herramienta.execute(comando)    
    retorno = herramienta.fetchall()
    herramienta.close()
    conexion.close()
    return retorno

def VerificarSiEsAdministrador(ID):
    conexion = InicializarConexion()
    herrramienta = conexion.cursor()
    comando = "SELECT Administrador FROM usuarios WHERE ID = {}".format(ID)
    herrramienta.execute(comando)
    retorno = (herrramienta.fetchall())[0][0]
    herrramienta.close()
    conexion.close()
    return bool(retorno)


def ObtenerUsuarios():
    retorno = []
    conexion = InicializarConexion()
    herramienta = conexion.cursor()
    herramienta.execute("SELECT * FROM usuarios")
    retorno = herramienta.fetchall()
    herramienta.close()
    conexion.close()
    return retorno

def eliminar(ID):
    conexion = InicializarConexion()
    herramienta = conexion.cursor()
    herramienta.execute("DELETE FROM usuarios WHERE ID = %s", (ID,))
    conexion.commit()
    herramienta.close()
    conexion.close()

def ObtenerUsuarioPorID(ID):
    retorno = ""
    conexion = InicializarConexion()
    herramienta = conexion.cursor()
    herramienta.execute("SELECT * FROM usuarios WHERE ID = {}".format(ID))
    retorno = (herramienta.fetchall())[0]
    herramienta.close()
    conexion.close()
    return retorno

def obtener_nombre_medico(id_medico):
    conexion = InicializarConexion()
    herramienta = conexion.cursor()
    comando = "SELECT Nombre FROM usuarios WHERE ID = %s"
    herramienta.execute(comando, (id_medico,))
    nombre_medico = herramienta.fetchone()[0]
    herramienta.close()
    conexion.close()
    return nombre_medico

def Datosdediagnostico(lista=[],id_medico = 0,id_paciente = 0):
    longitud = 0
    conexion = InicializarConexion()
    herramienta = conexion.cursor()
    longitud = len(lista)
    if longitud == 4:  
        comando = "INSERT INTO `historias clinicas` (ID,`Diagnostico medico`, Descripcion, `Fecha de atencion`, `Motivo de atencion`,`ID medico`,`ID paciente`) VALUES (%s,%s,%s,%s,%s,%s,%s)"
        argumentos = (None, lista[2], lista[3], datetime.now().date(), lista[1],id_medico,id_paciente)
        herramienta.execute(comando,argumentos)
        conexion.commit()
        herramienta.close()
        conexion.close()



def InsertarClave(clave,admin):
    conexion = InicializarConexion()
    herrramienta = conexion.cursor()
    comando = "INSERT INTO claves (ID,Clave,Administrador) VALUES(%s,%s,%s)"
    argumentos = (None,clave,admin)
    herrramienta.execute(comando,argumentos)
    conexion.commit()
    herrramienta.close()
    conexion.close()
    return "exito"

def VerificarSiEsMedico(ID):
    conexion = InicializarConexion()
    herrramienta = conexion.cursor()
    comando = "SELECT Administrador FROM usuarios WHERE ID = {}".format(ID)
    herrramienta.execute(comando)
    retorno = (herrramienta.fetchall())[0][0]
    herrramienta.close()
    conexion.close()
    return not bool(retorno)

def EditarPerfilDelMedico(id, nombre, apellido, dni, matricula, usuario, email):
    conexion = InicializarConexion()
    herramienta = conexion.cursor()
    comando = "UPDATE usuarios SET Nombre = %s, Apellido = %s, DNI = %s, `Matricula medica` = %s, Usuario = %s, Email = %s WHERE id = %s"
    valores = (nombre, apellido, dni, matricula, usuario, email, id)
    herramienta.execute(comando, valores)
    conexion.commit()
    herramienta.close()
    conexion.close()
    return("Cambio exitoso")



def datospacientess(lista=[]):
    longitud = 0
    conexion = InicializarConexion()
    herramienta = conexion.cursor()
    longitud = len(lista)
    if longitud == 9:  
        comando = "INSERT INTO `pacientes` (`ID`, `Nombre`, `Apellido`, `DNI`, `Nro de afiliado`, `Obra social`, `Nro de obra social`, `Nro de telefono`, `Domicilio`, `Fecha_De_Consulta`) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
        argumentos = (None, lista[0], lista[1], lista[2], lista[3], lista[4], lista[5], lista[6], lista[7], datetime.now().date())  # Corrección de índices
        herramienta.execute(comando, argumentos)
        conexion.commit()
        herramienta.close()
        conexion.close()

def eliminar_pacientes(ID):
    conexion = InicializarConexion()
    herramienta = conexion.cursor()
    herramienta.execute("DELETE FROM pacientes WHERE ID = %s", (ID,))
    conexion.commit()
    herramienta.close()
    conexion.close()