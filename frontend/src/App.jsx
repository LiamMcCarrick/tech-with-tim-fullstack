import { useState, useEffect } from 'react'
import ContactList from './ContactList'
import './App.css'
import ContactForm from './ContactForm'

function App() {
  /*Set up state to store contacts*/
  const [contacts, setContacts] = useState([])
  // set modal (detach form) to start as false
  const [isModalOpen, setIsModalOpen] = useState(false)

  /*Render once function is called*/
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

  // toggle modal
  const closeModal = () => {
    setIsModalOpen(false)
  }

  // open modal when creating contact
  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true)
  }

  // create fragment to render contact form
  return (
    <>
      <ContactList contacts={contacts} />
      <button onClick={openCreateModal}>Create New Contact</button>
      {isModalOpen && <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
          <ContactForm />
        </div>
      </div>

      }
    </>
  )
}

export default App
