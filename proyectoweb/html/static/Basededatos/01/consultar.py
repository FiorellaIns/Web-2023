# pip install mysql-connector-python
# https://www.w3schools.com/python/python_mysql_getstarted.asp
def main():
    import mysql.connector
    #crear conexion con la base de datos
     
    connDB = mysql.connector.connect(    #crear conexion con la base de datos
                host="localhost",
                user="root", 
                password="",
                database="consultorio"
            )
 
    sQuery="select * from usuario"       #(1)  Construir string con la consulta 
                                         #(1.1)
    curDB = connDB.cursor()              #(2)  Crera un cursor. Un curso es una estrucura de datos
                                         #     para contener y controlar la respuesta. 
    curDB.execute(sQuery)                #(3)  Ejecuta la consulta en la base de datos

    resultado = curDB.fetchall()         # Obtener la respuesta (en formato list)
 
    for fila in resultado:               # Recorrer la lista
        print(fila)                      # Imprimir la lista con el resultado (Uni fila de la tabla)
    #print(resultado)                    # Imprimir la lista con el resultado
    connDB.close()                       # cierra un conexión a una base de datos.

main()


# CON CONTROL DE SQL INJECTION
#     sQuery="select * from usuario where id=%s"       #(1) Construir string con la consulta 
#     val=('13',)                                      #(1.1) tupla con valores
#     curDB = connDB.cursor()                          #(2) Crera un cursor. Un curso es una estrucura de datos
#                                                           para contener y controlar la respuesta. 
#     curDB.execute(sQuery,val)                        #(3) Ejecuta la consulta en la base de datos
