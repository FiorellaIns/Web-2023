from flask import Flask
from route import Route
def main():
    
    flask = Flask(__name__,template_folder="templates",static_folder="static")

    Route(flask)

    flask.run("0.0.0.0",5000,debug = True)
main()