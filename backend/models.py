# build out data model and tables for database
from config import db

# db model reresented in python class
# define fields object will have
class Contact(db.Model):

    # primary id
    id = db.Column(db.Integer, primary_key=True)

    # first name - have to pass first name
    first_name = db.Column(db.String(80),unique=False,nullable=False)

    # last name
    last_name = db.Column(db.String(80),unique=False,nullable=False)

    # email address - no 2 contacts can have same email
    email = db.Column(db.String(120),unique=True,nullable=False)

    # convert table data -> python data -> json for API to handle
    # pass json data to and from backend
    def to_json(self):
        return {
            "id": self.id,
            "firstName": self.first_name,
            "lastName": self.last_name,
            "email": self.email,
        }