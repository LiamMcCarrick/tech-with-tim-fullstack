/*Write component to render our contacts*/
import React from "react"

const ContactList = ({ contacts, updateContact, updateCallback }) => {

    // delete contact from list
    const onDelete = async (id) => {
        try {
            const options = {
                method: "DELETE"
            }
            // send delete request to page
            const response = await fetch(`http://127.0.0.1:5000/delete_contact/${id}`, options)
            // if delete is successfull
            if (response.status === 200) {
                updateCallback()
            } else {
                console.error("Failed to delete")
            }
        } catch (error) {
            alert(error)
        }
    }

    return <div>
        <h2>Contacts</h2>
        <table>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {contacts.map((contact) => (
                    <tr key={contact.id}>
                        <td>{contact.firstName}</td>
                        <td>{contact.lastName}</td>
                        <td>{contact.email}</td>
                        <td>
                            <button onClick={() => updateContact(contact)}>Update</button>
                            <button onClick={() => onDelete(contact.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}

/*Export in order to imoprt */
export default ContactList