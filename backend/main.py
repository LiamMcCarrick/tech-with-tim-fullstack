# create API for CRUD
# perform requests and return json data
from flask import request, jsonify
#import app and db
from config import app, db
# import contact table
from models import Contact

# get (method) context
# decorater  
@app.route("/contacts",methods=["GET"])

# handle GET request that gets sent to /contacts route (URL)
def get_contacts():

    # get all contacts in Contact table
    contacts = Contact.query.all()

    # get contact data and convert to json
    json_contacts = list(map(lambda x: x.to_json(), contacts))

    # return json data
    return jsonify({"contacts": json_contacts})

# run flask application
# handles running file directly so it doesn't run when imported
if __name__ == "__main__":

    # create database
    with app.app_context():
        db.create_all()

    app.run(debug=True)
