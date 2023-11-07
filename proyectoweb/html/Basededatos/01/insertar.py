# pip install mysql-connector-python
# https://www.w3schools.com/python/python_mysql_getstarted.asp

import mysql.connector
def main():
    #crear conexion con la base de datos
    connDB = mysql.connector.connect(   
                host="localhost",
                user="root", 
                password="",
                database="consultorio"
            )
    # Construir string con la consulta
    
    sQuery=""" 
        INSERT INTO usuario
        (id, nombre, apellido, email, dni, direccion,pass)
        VALUES
        (%s,%s, %s, %s, %s, %s,%s)
    """
    val=("","Castro", "Angelina", "angelina@g.com", "9652", "abc 890","")

    curDB = connDB.cursor()                # Crea un cursor. Un curso es una estrucura de datos
                                           # para contener y controlar la respuesta. 
                  
    res=0
    try: 
        curDB.execute(sQuery,val)          # Ejecuta consulta
        connDB.commit()                    # commit() Hace efectiva la operacion en la base de datos
        res=curDB.rowcount                 # obtengo la cantidad de filas afectadas por la consulta
    except mysql.connector.Error as e:
        connDB.rollback()                  # rollback() Vuelve hacia atras las opercaciones que se realizaron 
        print("ERROR ->",e) 
        
    msj="Cantidad de filas afectadas:"
    print(msj,res)                         # Imprimir la lista con el resultado
 
    connDB.close()                         # cierra un conexión a una base de datos.

main()