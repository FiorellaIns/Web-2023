from flask import Flask, redirect, url_for, request, render_template, jsonify, session
from SQL_Manejo import *
import time
from FuncionesExtras import *

error = ""

def Route(aplicacion=Flask):

    @aplicacion.route("/")
    def home():
        error="email o contraseña incorrectos."
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

    @aplicacion.route("/registro",methods=["GET"])
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
            id_usuario = session["ID"]
            usuario = ObtenerUsuario(id_usuario)
            if VerificarSiEsAdministrador(id_usuario):
                return render_template("administradorPerfil.html", usuario=usuario)
            else:
                return redirect(url_for("home"))
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
            id_usuario = session["ID"]
            usuario = ObtenerUsuario(id_usuario)
            if VerificarSiEsAdministrador(id_usuario):
                return render_template("tablaAdm.html", usuario=usuario)
            else:
                return redirect(url_for("home"))
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
    @aplicacion.route("/obtenerdatosdepacientes", methods=["GET"])
    def obtener_diagnostico():
        retorno=[]
        try:
            id = session["ID"]
            ID_Paciente = session["ID_Paciente"]
            datos_diagnostico = ObtenerDatosDiagnosticoPaciente(ID_Paciente)
            for diagnostico in datos_diagnostico:
                retorno.append(ConvertirADiccionarioPacientes(diagnostico))
            return jsonify(retorno)           
                
        except KeyError:
            return redirect(url_for("home"))
    
    @aplicacion.route("/eliminar_perfiles", methods=["POST"])
    def eliminar_perfiles():
        exito = False
        mnj = ""
        try:
            id = session["ID"]
            if VerificarSiEsAdministrador(id):
                perfiles_a_eliminar = request.json.get("perfiles_a_eliminar", [])
                for ID in perfiles_a_eliminar:
                    eliminar(ID)
                exito = True
                mnj = "PERFIL ELIMINADO EXITOSAMENTE."
            else:
                mnj = "Acceso no autorizado. No eres administrador."
        except KeyError:
            mnj = "Acceso no autorizado. No has iniciado sesión."
        return jsonify({"success": exito, "message": mnj})
    


    @aplicacion.route("/ModificarUsuario",methods = ["GET"])
    def ObtenerInfoDeMedico():
        try:
            id = session["ID"]
            if VerificarSiEsAdministrador(id):
                medico = session["ID_Usuario_Gestion"]
                datos = ConfigurarParaJinja(ObtenerUsuarioPorID(medico))
                return render_template(
                                        "modificarUsuario.html",
                                        nombre = datos[1],
                                        apellido = datos[2],
                                        dni = datos[3],
                                        matricula = datos[4],
                                        usuario = datos[5],
                                        contrasenia = datos[6],
                                        email = datos[7],
                                        administrador = datos[8])
            else:
                 return redirect(url_for("home"))
        except KeyError:
            return redirect(url_for("home"))
        

    @aplicacion.route("/redireccion",methods=["GET","POST"])
    def redireccion():
        try:
            retorno = {"url":"valor"}


            if request.get_json().get("peticion",None) == "olvide":
                retorno["url"] = "/olvidado"

            elif request.get_json().get("peticion",None) == "registra":
                retorno["url"] = "/registro"

            elif request.get_json().get("peticion",None) == "volver":
                retorno["url"] = "/login"

            elif request.get_json().get("peticion",None) == "Gestionar_Datos_Por_Admin":
                session["ID_Usuario_Gestion"] = request.get_json().get("ID",None)
                retorno["url"] = "/ModificarUsuario"

            elif request.get_json().get("peticion",None) == "Tabla_Pacientes":
                retorno["url"] = "/tabla"

            elif request.get_json().get("peticion",None) == "Perfil_Del_Medico":
                retorno["url"] = "/perfil_medico"

            elif request.get_json().get("peticion",None) == "volverI":
                retorno["url"] = "/index"

            elif request.get_json().get("peticion",None) == "editar":
                retorno["url"] = "/editar_perfil_medico"
        
            elif request.get_json().get("peticion",None) == "volverP":
                retorno["url"] = "/perfil_medico"

            elif request.get_json().get("peticion",None) == "añadir_paciente":
                retorno["url"] = "/añadir_paciente"

            elif request.get_json().get("peticion",None) == "volverT":
                retorno["url"] = "/tabla"

            elif request.get_json().get("peticion",None) == "obtener_diagnostico":
                retorno["url"] = "/diagnostico"


            return jsonify(retorno)
        except KeyError:
            return redirect(url_for("home"))


        