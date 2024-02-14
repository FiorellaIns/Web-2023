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