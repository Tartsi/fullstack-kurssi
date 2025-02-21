import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Person'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [showAllPersons, setShowAllPersons] = useState(true)
  const [notificationMessage, setNotificationMessage] = useState('No recent changes')
  const [success, setSuccess] = useState(true)

  useEffect(() => {
    personService
      .getAllPersons()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addNewPerson = (event) => {
    event.preventDefault()

    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {

      let personToBeChanged = persons.find(person => person.name === newName)

      personService
        .updatePerson(personToBeChanged.id, { ...personToBeChanged, number: newNumber })
        .then(updatedPerson => {
        setPersons(persons.map(person => person.id === updatedPerson.id ? updatedPerson : person))
        setNotificationMessage(`Succesfully changed ${newName}'s number!`)
        })
        .catch(() => {
          setSuccess(false)
          setNotificationMessage(
            `Could not find ${newName}'s number from the server`
          )
        })
      }
      setTimeout(() => {
        setNotificationMessage(null)
        setSuccess(true)
      }, 5000);
      setNewName("")
      setNewNumber("")
      return
    }

    const newPersonObject = {
      name: newName,
      number: newNumber
    }

    personService
      .addNewPerson(newPersonObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNotificationMessage(`Succesfully added ${newPersonObject.name} to the phonebook!`)
      })
      .catch(error => {
        setSuccess(false)
        setNotificationMessage(
          error.response.data.error
        )
      })
    setTimeout(() => {
      setSuccess(true)
      setNotificationMessage(null)
    }, 5000);
    setNewName("")
    setNewNumber("")
  }

  const deletePerson = (id) => {

    const personToBeDeleted = persons.find(person => person.id === id)

    if (window.confirm(`Delete ${personToBeDeleted.name}?`)) {
      personService
      .deletePerson(id)
      .then(() => {
      setPersons(persons.filter(person => person.id !== id))
      setNotificationMessage(`${personToBeDeleted.name} succesfully removed!`)
      })
      .catch(() => {
        setSuccess(false)
        setNotificationMessage(
          `Information of ${personToBeDeleted.name} has already been removed from the server`
        )
      })
      setTimeout(() => {
        setSuccess(true)
        setNotificationMessage(null)
      }, 5000);
    }

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameFiltering = (event) => {
    setShowAllPersons(false)
    setNameFilter(event.target.value)
  }

  const personsToShow = showAllPersons
  ? persons :
  persons.filter(person =>
  person.name.toLowerCase().includes(nameFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} success={success} />
      <Filter 
      value={nameFilter}
      onChange={handleNameFiltering}
      />
      <h3>Add a new</h3>
      <PersonForm 
      onSubmit={addNewPerson}
      name={newName}
      nameChange={handleNameChange}
      number={newNumber}
      numberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      {<Persons 
      persons={personsToShow}
      onClick={deletePerson}
      />}
    </div>
  )

}

export default App