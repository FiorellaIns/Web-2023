from flask import Flask
from route import Route
def main():
    
    flask = Flask(__name__,template_folder="templates",static_folder="static")

    flask.secret_key = "Ultra secreta XD"

    Route(flask)

    flask.run("0.0.0.0",5000,debug = True)
main()