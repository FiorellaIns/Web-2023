from flask import Flask, redirect, url_for, request, render_template, jsonify, session
from SQL_Manejo import IniciarSeccion

error = ""

def Route(aplicacion=Flask):

    @aplicacion.route("/")
    def home():
        return render_template("login.html", errorVar=error)

    @aplicacion.route("/GuardarDatosPerfil", methods=["POST"])
    def DeterminarValidez():
        id = -1
        usuario = request.form["email"]
        contrasena = request.form["contrasena"]
        id = IniciarSeccion([usuario, contrasena])
        session["id"] = id
        session["contraseña"] = contrasena
        if id != -1:
            return redirect("/index")
        else:
            return render_template("login.html", errorVar="Usuario o contraseña incorrectos. Por favor, inténtelo de nuevo")

    @aplicacion.route("/index")
    def indice():
        return render_template("index.html")

    @aplicacion.route("/consultarseccion", methods=["GET"])
    def seccionActual():
        usuario = {"id": session["id"]}
        return jsonify(usuario)

    @aplicacion.route("/Registro")
    def registro():
        return render_template("registrarse1.html")
    
    @aplicacion.route("/Registro_Post",methods=["POST"])
    def Posteo():
        return request.form.get("nombre")

    @aplicacion.route("/Olvidado")
    def olvidado():
        return render_template("olvidelaconta.html")
    @aplicacion.route("/Administrador Perfil")
    def administradorperfill():
        return render_template("administradorPerfil.html")
    @aplicacion.route("/tabla administrador")
    def administradortabla():
        return render_template("tablaAdm.html")
    @aplicacion.route("/paciente")
    def paciente():
        return render_template("paciente.html")
    @aplicacion.route("/Perfil medico")
    def perfilmedico():
        return render_template("perfilMedico.html")
    @aplicacion.route("/Editar perfil medico")
    def editarperfilmedico():
        return render_template("editarperfilMedico.html")
    @aplicacion.route("/Diagnostico")
    def diagnostico():
        return render_template("diagnostico.html")
    @aplicacion.route("/Añadir paciente")
    def añadirpaciente():
        return render_template("Añadirpaciente.html")
    
    



