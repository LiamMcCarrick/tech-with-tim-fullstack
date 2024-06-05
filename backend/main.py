# create API for CRUD
# perform requests and return json data
from flask import request, jsonify
#import app and db
from config import app, db
# import contact table
from models import Contact

# get (method) context
# handle GET request that gets sent to /contacts route (URL)
@app.route("/contacts",methods=["GET"])
def get_contacts():

    # get all contacts in Contact table
    contacts = Contact.query.all()

    # get contact data and convert to json
    json_contacts = list(map(lambda x: x.to_json(), contacts))

    # return json data
    return jsonify({"contacts": json_contacts})

# handle POST request that creates contacts
@app.route("/create_contact",methods=["POST"])
def create_contact():

    # get data associated with contact we want to create
    first_name = request.json.get("firstName")
    last_name = request.json.get("lastName")
    email = request.json.get("email")

    # handle when data for contact isn't given
    if not first_name or not last_name or not email:
        return (jsonify({"message":"You must include first and last name and email"}), 400) # error code for bad request
    
    # create new contact object
    new_contact = Contact(first_name=first_name, last_name=last_name,email=email)

    # add to database
    try:
        db.session.add(new_contact)
        db.session.commit()
    # return error if doesn't work
    except Exception as e:
        return (jsonify({"message":str(e)}), 400)
    
    # return message that contact was created successfully
    return (jsonify({"message":"User created"}), 201)

# handle request that will update a contact
@app.route("/update_contact/<int:user_id>",methods=["PATCH"])
def update_contact(user_id):

    # look in database and find user_id you want to update
    contact = Contact.query.get(user_id)

    # if user doesn't exist return user not found error
    if not contact:
        return (jsonify({"message":"User not found"}), 404)
    
    # modify contact variable to either update or keep data given from json data
    data = request.json
    contact.first_name = data.get("firstName", contact.first_name)
    contact.last_name = data.get("lastName", contact.last_name)
    contact.email = data.get("email",contact.email)

    # commit change to database
    db.session.commit()

    # return message that contact was updated
    return (jsonify({"message":"User updated"}), 200)

# run flask application
# handles running file directly so it doesn't run when imported
if __name__ == "__main__":

    # create database
    with app.app_context():
        db.create_all()

    app.run(debug=True)
