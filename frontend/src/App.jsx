import { useState, useEffect } from 'react'
import ContactList from './ContactList'
import './App.css'
import ContactForm from './ContactForm'

function App() {
  /*Set up state to store contacts*/
  const [contacts, setContacts] = useState([])
  // set modal (detach form) to start as false
  const [isModalOpen, setIsModalOpen] = useState(false)
  // store contact we are currently editing
  const [currentContact, setCurrentContact] = useState({})

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
    // reset modal
    setCurrentContact({})
  }

  // open modal when creating contact
  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true)
  }

  // open modal when updating contact
  const openEditModal = (contact) => {
    if (isModalOpen) return
    setCurrentContact(contact)
    setIsModalOpen(true)
  }

  // close modal and get updated contacts after update is performed
  const onUpdate = () => {
    closeModal()
    fetchContacts()
  }

  // create fragment to render contact form
  return (
    <>
      <ContactList contacts={contacts} updateContact={openEditModal} updateCallback={onUpdate} />
      <button onClick={openCreateModal}>Create New Contact</button>
      {isModalOpen && <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
          <ContactForm existingContact={currentContact} updateCallback={onUpdate} />
        </div>
      </div>

      }
    </>
  )
}

export default App
