import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phonebookService from './services/phonebook'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const filteredPersons = filter === '' ? persons : persons.filter(person => person.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
  const addPerson = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(person => person.name === newName);
    if(existingPerson) {
      if(window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const updatedPerson = {...existingPerson, number: newNumber}
        phonebookService
          .updatePerson(updatedPerson.id, updatedPerson)
          .then(modifiedPerson => {
            setPersons(persons.map(person => person.id === modifiedPerson.id ? modifiedPerson : person))
          })
      }
      return
    }
    const newPerson = {
      name: newName,
      number: newNumber
    }
    phonebookService
      .create(newPerson)
      .then(createdPerson => {
        setPersons(persons.concat(createdPerson))
        setNewName('')
        setNewNumber('')
      })
 
  }
  const handleNewNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNewNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  const handleDeleteNumber = (id) => {
    const personToDelete = persons.find(person => person.id === id)
    if(window.confirm(`Are you sure you want to delete ${personToDelete.name}`)) {
      console.log(`Person with id ${id} must be deleted`)
      phonebookService
        .deletePerson(id)
        .then(deletedPerson => {
          console.log(deletedPerson)
          setPersons(persons.filter(person => person.id !== id))
        })
    }

  }

  const hook = () => {
    phonebookService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }

  useEffect(hook, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} filter={filter} />
      <h3>Add a new</h3>
      <PersonForm 
      addPerson={addPerson} 
      handleNewNameChange={handleNewNameChange} 
      newName={newName} 
      handleNewNumberChange={handleNewNumberChange}
      newNumber={newNumber} />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} deleteHandler={handleDeleteNumber}/>
    </div>
  )
}

export default App
