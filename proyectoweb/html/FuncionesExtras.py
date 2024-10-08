import random
from SQL_Manejo import *

def EstaCompleto(lista = []):
    retorno = True
    for s in lista:
        if s == "":
            retorno = False
            break
    return retorno

def ConvertirADiccionario(lista=[]):
    retorno = {"exito":False}
    if len(lista) == 10:
        retorno = {"exito":True,"ID":lista[0],"Nombre":lista[1],"Apellido":lista[2],"DNI":lista[3],"Nro de afiliado":lista[4]
                   ,"Obra social":lista[5],"Nro de obra social":lista[6],"Nro de telefono":lista[7],"Domicilo":lista[8],"Fecha de consulta":lista[9].strftime('%d/%m/%Y')}
    return retorno

def ConvertirADiccionarioUsuarios(lista=[]):
    retorno = {"exito":False}
    if len(lista) == 9:
        retorno = {"exito":True,"ID":lista[0],"Nombre":lista[1],"Apellido":lista[2],"DNI":lista[3],"Matricula medica":lista[4],"Usuario":lista[5],"Contraseña":lista[6],"EMail":lista[7]}
    return retorno

def ConvertirADiccionarioPacientes(lista=[]):
    retorno = {"exito":False}
    if len(lista) ==7:
        retorno = {"exito":True,"ID":lista[0],"Diagnostico medico":lista[1],"Descripcion":lista[2],"Fecha de atencion":lista[3].strftime('%d/%m/%Y'),"Motivo de la atencion":lista[4],"ID medico":lista[5],"ID paciente":lista[6]}
    return retorno

def ConfigurarParaJinja(tupla=()):
    retorno = []
    longitud = len(tupla)
    if longitud == 9:
        i = 0
        while(i < 8):
            retorno.append("value = " + str(tupla[i]))
            i = i + 1
        if bool(tupla[8]):
            retorno.append("checked")
        else:
            retorno.append("")
    return retorno

def GeneradorDeClaves():
    retoro=""
    for i in range (10):
        retoro += chr(random.randint(33,127))
    return retoro

def ConfigurarParaJinja2(tupla=()):
    retorno = []
    longitud = len(tupla)
    if longitud == 9:
        i = 0
        while(i < 8):
            retorno.append(str(tupla[i]))
            i = i + 1
        if bool(tupla[8]):
            retorno.append("checked")
        else:
            retorno.append("")
    return retorno

def GeneradorDeClaves():
    retoro=""
    for i in range (10):
        retoro += chr(random.randint(33,127))
    return retoro

def proporcionarelnombredelmedicoynoelid(lista=[]):
    longitud=len(lista)
    retornodelista=[]
    for diccionario in lista:
        diccionario['ID medico']=obtener_nombre_medico(diccionario['ID medico'])
        retornodelista.append(diccionario)
    return retornodelista

    
def ConvertirADiccionarioClaves(lista=[]):
    retorno = {"exito":False}
    if len(lista) == 3:
        retorno = {"exito":True,"ID":lista[0],"Clave":lista[1],"Administrador":lista[2]}
    return retorno


def TratamientoDeDiccionarioTAD(lista = []):
    retorno = []
    for diccionarios in lista:
        dato = diccionarios["Administrador"]
        diccionarios.pop("Administrador",None)
        if bool(dato):
            diccionarios["Administrador"] = "Si"
        else:
            diccionarios["Administrador"] = "No"
        retorno.append(diccionarios)
    return retorno

def PasarDePaso(diccionario = {}):
    retorno = {
        "primero":True,
        "segundoPaso": False,
        "tercerPaso": False
    }
    if "ID_Medico_Recuperar" in diccionario:
        retorno["primero"] = False
        retorno["segundoPaso"] = True
        retorno["tercerPaso"] = False
    if "ID_Medico_Recuperar" in diccionario and "Clave_Obtenida" in diccionario:
        retorno["primero"] = False
        retorno["segundoPaso"] = False
        retorno["tercerPaso"] = True
    return retorno
def VerificarSiExisteClave(clave = ""):
    retorno = -1
    conexion = InicializarConexion()
    lista = ObtenerID(conexion,clave)
    conexion.close()
    if len(lista) > 0:
        retorno = lista[0][0]
    return retorno
def VerificacionFacilAClave(ID_Clave):
    conexion = InicializarConexion()
    herramienta = conexion.cursor()
    retorno = EsAdministrador(herramienta,ID_Clave)
    herramienta.close()
    conexion.close()
    return retorno
def ModificarContrasenia(ID_Clave = 0,ID_Usuario = 0,contrasenia = ""):
    retorno = False
    if ActulizarContrasenia(contrasenia,ID_Usuario):
        conexion = InicializarConexion()
        QuitarClavePorId(conexion,ID_Clave)
        conexion.close()
        retorno = True
    return retorno