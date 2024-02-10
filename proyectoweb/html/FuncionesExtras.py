def EstaCompleto(lista = []):
    retorno = True
    for s in lista:
        if s == "":
            retorno = False
            break
    return retorno