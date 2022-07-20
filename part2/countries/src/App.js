import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Results from "./components/Results";


function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [loading, setLoading] = useState(false)
  const [showStates, setShowStates] = useState([])

  const setShowStateEffect = () => {
    if(countries.length > 1 && countries.length < 11) {
        const newShowStates = Array(countries.length).fill(false)
        setShowStates(newShowStates)
    } else {
        setShowStates([])
    }
  }
  
  const searchCountries = () => {
    setLoading(true)
    if(filter === '') {
      axios
        .get('https://restcountries.com/v3.1/all')
        .then(response => {
          setCountries(response.data)
          setLoading(false)
        })
    } else {
      axios
        .get(`https://restcountries.com/v3.1/name/${filter}`)
        .then(response => {
          setCountries(response.data)
          setLoading(false)
        })
    }
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  const handleChangeState = (event) => {
    console.log(event.target.value);
    const newStateArray = [...showStates];
    newStateArray[event.target.value] = !newStateArray[event.target.value];
    setShowStates(newStateArray)
  }

  useEffect(searchCountries, [filter])
  useEffect(setShowStateEffect, [countries])
  return (
    <div >
      <Filter handleFilterChange={handleFilterChange} filter={filter} />
      <Results countries={countries} loading={loading} states={showStates} handleChangeState={handleChangeState}/>
    </div>
  );
}

export default App;
