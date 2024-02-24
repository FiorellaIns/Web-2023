import random
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