from flask import Flask,redirect,url_for,request,render_template,jsonify
#######################Variables de entorno############################
usuario = ""
id = ""
#######################################################################


def Route(aplicacion = Flask):
    
    @aplicacion.route("/")
    def home():
        return render_template("login.html")

