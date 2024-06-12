// create form to add contacts
import { useState } from "react"

const ContactForm = ({ existingContact = {}, updateCallback }) => {
    //set state of contacts we want to store
    // if we have contact we input the contact data otherwise keep empty string
    const [firstName, setFirstName] = useState(existingContact.firstName || "")
    const [lastName, setLastName] = useState(existingContact.lastName || "")
    const [email, setEmail] = useState(existingContact.email || "")

    // if object passed has at least 1 entry we're updating otherwise we're creating
    const updating = Object.entries(existingContact).length !== 0

    // add contact to db when button is clicked
    const onSubmit = async (e) => {
        // dont refresh automatically
        e.preventDefault()

        // create fuction to add contact data, javascript object
        const data = {
            firstName,
            lastName,
            email
        }
        // url for page
        // if updating contact then go to update page with contact id otherwise go to create contact
        const url = "http://127.0.0.1:5000/" + (updating ? `update_contact/${existingContact.id}` : "create_contact")
        // options for http request
        const options = {
            method: updating ? "PATCH" : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            // turn data javascript object to json data
            body: JSON.stringify(data)
        }
        // send request
        const response = await fetch(url, options)
        //if request was successfull
        if (response.status !== 201 && response.status !== 200) {
            // if not successfull send error
            const data = await response.json()
            alert(data.message)
        } else {
            // close modal if update/create operation is completed
            updateCallback()
        }
    }

    // return form
    return (<form onSubmit={onSubmit}>
        <div>
            <label htmlFor="firstName">First Name: </label>
            <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div>
            <label htmlFor="LastName">Last Name: </label>
            <input
                type="text"
                id="LastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div>
            <label htmlFor="email">Email: </label>
            <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button type="submit">{updating ? "Update Contact" : "Create Contact"}</button>
    </form>
    )
}

export default ContactForm