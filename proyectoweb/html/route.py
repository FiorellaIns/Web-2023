from flask import Flask,redirect,url_for,request,render_template,jsonify,session
from SQL_Manejo import IniciarSeccion

error = ""

def Route(aplicacion = Flask):
    
    @aplicacion.route("/")
    def home():
        return render_template("login.html",errorVar = error)
    @aplicacion.route("/GuardarDatosPerfil",methods = ["post"])
    def DeterminarValidez():
        id = -1
        usuario = request.form["email"]
        contrasena = request.form["contrasena"]
        id = IniciarSeccion([usuario,contrasena])
        session["id"] = id
        session["contraseña"] = contrasena
        if id != -1:
            return redirect("/index")
        else:
            return render_template("login.html",errorVar = "Usuario o contraseña incorrectos. Por favor, inténtelo de nuevo.")
    @aplicacion.route("/index")
    def indice():
        return render_template("index.html") 
    @aplicacion.route("/consultarseccion",methods=["get"])
    def seccionActual():
        usuario = {"id":session["id"]}
        return jsonify(usuario)
    
    



