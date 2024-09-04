import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [showAllPersons, setShowAllPersons] = useState(true)

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
      alert(`${newName} is already added to phonebook`)
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
      })

    setNewName("")
    setNewNumber("")
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
      />}
    </div>
  )

}

export default App