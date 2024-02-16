from flask import Flask, redirect, url_for, request, render_template, jsonify, session
from SQL_Manejo import *
import time
from FuncionesExtras import *

error = ""

def Route(aplicacion=Flask):

    @aplicacion.route("/")
    def home():
        return render_template("login.html", errorVar=error)

    @aplicacion.route("/Acceder", methods=["POST"])
    def IniciarSeccionR():
        retorno = {}
        datos = [request.form.get("email"),request.form.get("contrasena")]
        mensaje = IniciarSeccion(datos)
        division = mensaje.split(":")   
        if(division[0] == "Hecho"):
            esAdmin = bool(int(division[2]))
            session["ID"] = division[3]
            if esAdmin:
                retorno = {"mensaje":division[0],"usuario":division[1],"url":"/administrador_perfil"}
            else:
                retorno = {"mensaje":division[0],"usuario":division[1],"url":"/index"}
        else:
            retorno = {"mensaje":(division[0] + division[1])}
        return jsonify(retorno)

    @aplicacion.route("/consultarseccion", methods=["GET"])
    def seccionActual():
        usuario = {"id": session["id"]}
        return jsonify(usuario)

    @aplicacion.route("/CerrarSeccion",methods=["GET"])
    def TerminarSeccion():
        retorno = {"exito":True}
        try:
            session.pop("ID",None)
        except KeyError:
            retorno = {"exito":False}
        return jsonify(retorno)

    @aplicacion.route("/ObtenerPacientes",methods = ["GET"])
    def ObtenerPacientesO():
        retorno = {"exito":False}
        try:
            id = session["ID"]
            usuario = ObtenerUsuario(id)
            if usuario != "":
                datos = ObtenerPacientes()
                if len(datos[0]) == 10:
                    convertido = []
                    for lista in datos:
                        lista = ConvertirADiccionario(lista)
                        convertido.append(lista)
                    if convertido[0]["exito"]:
                        retorno = convertido
                datos = ObtenerPacientes()
                if len(datos[0]) == 10:
                    convertido = []
                    for lista in datos:
                        lista = ConvertirADiccionario(lista)
                        convertido.append(lista)
                    if convertido[0]["exito"]:
                        retorno = convertido
            else:
                retorno = {"exito":False}
        except KeyError:
          retorno = {"exito":False}
        return jsonify(retorno)

    @aplicacion.route("/registro")
    def registro():
        return render_template("registrarse1.html")
    
    @aplicacion.route("/olvidado")
    def olvidado():
        return render_template("olvidelaconta.html")

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
        if(EstaCompleto(listaDeDatos)):
            if(CodigoValido(listaDeDatos[7])):
                CargarEnUsuario(listaDeDatos)
                respuesta = "Hecho"
            else:
                respuesta = "Clave no valida."
        else:
            respuesta = "No se recibieron todos los datos."
        return jsonify({"respuesta":respuesta})

    @aplicacion.route("/index")
    def indice():
        try:
            id = session["ID"]
            usuario = ObtenerUsuario(id)
            return render_template("index.html",usuario = usuario)
        except KeyError:
            return redirect(url_for("home"))

    @aplicacion.route("/administrador_perfil")
    def administradorPerfil():
        try:
            id = session["ID"]
            usuario = ObtenerUsuario(id)
            return render_template("administradorPerfil.html",usuario = usuario)
        except KeyError:
            return redirect(url_for("home"))

    @aplicacion.route("/paciente")
    def paciente():
        try:
            id = session["ID"]
            ID_Paciente = session["ID_Paciente"]
            #session.pop("ID_Paciente",None)
            return render_template("paciente.html",paciente = (ObtenerNombrePaciente(ID_Paciente) + " " + ObtenerApellidoPaciente(ID_Paciente)))
        except KeyError:
            return redirect(url_for("home"))

    @aplicacion.route("/perfil_medico")
    def perfil_medico():
        try:
            id = session["ID"]
            usuario = ObtenerUsuario(id)
            return render_template("perfilMedico.html",usuario = usuario)
        except KeyError:
            return redirect(url_for("home"))

    @aplicacion.route("/editar_perfil_medico")
    def editar_perfilMedico():
        try:
            id = session["ID"]
            usuario = ObtenerUsuario(id)
            return render_template("editarperfilMedico.html",usuario = usuario)
        except KeyError:
            return redirect(url_for("home"))

    @aplicacion.route("/diagnostico")
    def diagnostico():
        try:
            id = session["ID"]
            usuario = ObtenerUsuario(id)
            return render_template("diagnostico.html",usuario = usuario)
        except KeyError:
            return redirect(url_for("home"))

    @aplicacion.route("/añadir_paciente")
    def añadir_paciente():
        try:
            id = session["ID"]
            usuario = ObtenerUsuario(id)
            return render_template("Añadirpaciente.html",usuario = usuario)
        except KeyError:
            return redirect(url_for("home"))

    @aplicacion.route("/tabla")
    def tabla():
        try:
            id = session["ID"]
            usuario = ObtenerUsuario(id)
            return render_template("tabla.html",usuario = usuario)
        except KeyError:
            return redirect(url_for("home"))
        
    @aplicacion.route("/SeleccionarPaciente",methods = ["POST"])
    def GuardarSeleccion():
        retorno = {"exito":False}
        id = (request.get_json()).get("ID_Paciente",None)
        if ObtenerNombrePaciente(id) != "":
            session["ID_Paciente"] = id
            retorno = {"exito":True}
        return jsonify(retorno)

    @aplicacion.route('/<name>', methods=['POST', 'GET'])
    def noEncontrada(name):
        return redirect(url_for("home"))
    
    @aplicacion.route("/tabla_administrador", methods=['POST','GET'])
    def tabla_administrador():
        try:
            id = session["ID"]
            usuario = ObtenerUsuario(id)
            return render_template("tablaAdm.html",usuario = usuario)
        except KeyError:
            return redirect(url_for("home"))
        
    @aplicacion.route("/Datos_usuarios",methods=["GET"])
    def datos_usuarios():
        retorno = []
        try:
            id = session["ID"]
            usuario = ObtenerUsuarios()
            for lista in usuario:
                retorno.append(ConvertirADiccionarioUsuarios(lista))
            return jsonify(retorno)
        except KeyError:
            return redirect(url_for("home"))

    @aplicacion.route("/obtenerdatosdepacientes", methods=["POST","GET"])
    def obtener_diagnostico(ID_paciente):
        try:
            # Aquí deberías tener una función para obtener los diagnósticos del paciente con el ID dado
            datos_diagnostico = ObtenerDatosDiagnosticoPaciente(ID_paciente)
            if datos_diagnostico:
                retorno = [ConvertirADiccionarioPacientes(diagnostico) for diagnostico in datos_diagnostico]
                return jsonify(retorno)
            else:
                return jsonify({"mensaje": "No se encontraron diagnósticos para el paciente con ID {}".format(ID_paciente)})
        except Exception as e:
            print("Error:", e)
            return jsonify({"error": "Hubo un error al obtener los diagnósticos del paciente"})

        