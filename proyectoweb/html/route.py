from flask import Flask, redirect, url_for, request, render_template, jsonify, session
from SQL_Manejo import *
import time
from FuncionesExtras import *

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

    @aplicacion.route("/registro")
    def registro():
        return render_template("registrarse1.html")
    
    @aplicacion.route("/Registro_Post",methods=["POST"])
    def Posteo():
        respuesta = ""
        listaDeDatos = [request.form.get("nombre"),
                        request.form.get("apellido"),
                        request.form.get("dni"),
                        request.form.get("matriculamedica"),
                        request.form.get("usuario"),
                        request.form.get("password"),
                        request.form.get("email"),
                        request.form.get("codigoUnico")]
        print("Error")
        if(EstaCompleto(listaDeDatos)):
            if(CodigoValido(listaDeDatos[7])):
                CargarEnUsuario(listaDeDatos)
                respuesta = "Hecho"
            else:
                respuesta = "Clave no valida."
        else:
            respuesta = "No se recibieron todos los datos."
        return jsonify({"respuesta":respuesta})
    @aplicacion.route("/Exito")
    def exito():
        return render_template("exito.html")

    @aplicacion.route("/olvidado")
    def olvidado():
        return render_template("olvidelaconta.html")
    @aplicacion.route("/administrador_perfil")
    def administradorperfill():
        return render_template("administradorPerfil.html")
    @aplicacion.route("/tabla_administrador")
    def administradortabla():
        return render_template("tablaAdm.html")
    @aplicacion.route("/paciente")
    def paciente():
        return render_template("paciente.html")
    @aplicacion.route("/perfil_medico")
    def perfilmedico():
        return render_template("perfilMedico.html")
    @aplicacion.route("/editar_perfil_medico")
    def editarperfilmedico():
        return render_template("editarperfilMedico.html")
    @aplicacion.route("/diagnostico")
    def diagnostico():
        return render_template("diagnostico.html")
    @aplicacion.route("/añadir_paciente")
    def añadirpaciente():
        return render_template("Añadirpaciente.html")