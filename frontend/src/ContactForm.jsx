// create form to add contacts
import { useState } from "react"

const ContactForm = () => {
    //set state of contacts we want to store
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")

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
        const url = "http://127.0.0.1/5000/create_contact"
        // options for http request
        const options = {
            method: "POST",
            header: {
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
        <button type="submit">Create Contact</button>
    </form>
    )
}

export default ContactForm