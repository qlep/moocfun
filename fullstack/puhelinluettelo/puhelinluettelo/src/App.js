import React, {useState, useEffect} from 'react'

import FilterInput from './components/FilterInput'
import NewPersonInput from './components/NewPersonInput'
import ContactsDisplay from './components/ContactsDisplay'
import Notification from './components/Notification'

import personService from './services/persons'

const App = (props) => {
  const [persons, setPersons] = useState([]) 
  const [newPersonName, setNewPersonName] = useState('')
  const [newPersonPhone, setNewPersonPhone] = useState('')
  const [filterTerm, setFilterTerm] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationClassName, setNotificationClassName] = useState('notification')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const personsToDisplay = persons.filter(
    person => person.name.toLowerCase().includes(filterTerm.toLowerCase())
  )

  const addPerson = (event) => {
    event.preventDefault()
    
    const personObject = {
      name: newPersonName,
      number: newPersonPhone
    }

    if (newPersonName !== '') {
      const names = persons.map(person => person.name)

      if (names.includes(newPersonName)) {
        if (window.confirm(
          `${newPersonName} is already added to the phonebook. Replace the number with a new one?`)
          ) {
            const personToUpdate = persons.find(person => person.name === newPersonName)
            const changedPerson = {...personToUpdate, number: newPersonPhone}

            personService
              .updatePerson(personToUpdate.id, changedPerson)
              .then(response => {
                setPersons(persons.map(p => p.id !== personToUpdate.id ? p : response.data))

                const message = `${personToUpdate.name} updated`
                displayNotification(message, 'notification')
              })
              .catch(error => {
                const message = `${personToUpdate.name} was already removed from phonebook`
                displayNotification(message, 'error-notification')
                setPersons(persons.filter(p => p.id !== personToUpdate.id))
              })
          }
      } else {
        personService
          .createPerson(personObject)
          .then(response => {
            setPersons(persons.concat(response.data))

            const message = `${personObject.name} added to phonebook`
            displayNotification(message, 'notification')
          })
      }
    }

    setNewPersonName('')
    setNewPersonPhone('')
  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)

    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deletePerson(person.id)
        .then(setPersons(persons.filter(p => p.id !== id)))

        const message = `${person.name} deleted`
        displayNotification(message, 'notification')
    }
  }

  const handleNameChange = (event) => {
    setNewPersonName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPersonPhone(event.target.value)
  }

  const handleFilterTermChange = (event) => {
    setFilterTerm(event.target.value)
    console.log(filterTerm)
  }

  const displayNotification = (message, messageType) => {
    setNotificationMessage(message)
    setNotificationClassName(messageType)
                
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  return (
    <>
      <h2>Phonebook</h2>
      <Notification message = {notificationMessage} className = {notificationClassName}/>

      <NewPersonInput addPerson = {addPerson} newPersonName = {newPersonName} newPersonPhone = {newPersonPhone}
      handleNameChange = {handleNameChange} handlePhoneChange = {handlePhoneChange}/>

      <h2>Phone Numbers</h2>

      <FilterInput filterTerm = {filterTerm} handleFilterTermChange = {handleFilterTermChange}
      personsToDisplay = {personsToDisplay}/>
      
      <ContactsDisplay personsToDisplay = {personsToDisplay} deletePerson = {deletePerson}/>
    </>
  )
}

export default App