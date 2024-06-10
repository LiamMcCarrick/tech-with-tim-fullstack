import { useState, useEffect } from 'react'
import ContactList from './ContactList'
import './App.css'
import ContactForm from './ContactForm'

function App() {
  /*Set up state to store contacts*/
  const [contacts, setContacts] = useState([])

  /*Render once when function is called*/
  useEffect(() => {
    fetchContacts()
  }, [])

  /*Function to send get request to backend to get contacts*/
  const fetchContacts = async () => {
    const response = await fetch("http://127.0.0.1:5000/contacts")
    /*Get JSON data associated with request*/
    const data = await response.json()
    setContacts(data.contacts)
    console.log(data.contacts)
  }

  // create fragment to render contact form
  return (
    <>
      <ContactList contacts={contacts} />
      <ContactForm />
    </>
  )
}

export default App
