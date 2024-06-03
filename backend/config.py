#import packages
#Flask acts as ORM to write python to interact with db
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

#intialize flask app and send CORS requests
app = Flask(__name__)
CORS(app)

#intialize db
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mydatabase.db"
#disable tracking db updates
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

#create instance of db
db = SQLAlchemy(app)

