import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Listing from './components/Listing'

function App() {

  const [country, setCountry] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    fetch('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => response.json())
      .then(data => {
        setAllCountries(data)
        setFilteredCountries(data)
      })
      .catch(error => console.error('Error fetching countries:', error))
  }, [])


  const handleCountryFiltering = (event) => {
    const inputValue = event.target.value.toLowerCase()
    setCountry(inputValue)

    const filtered = allCountries.filter(country => 
      country.name && country.name.common && 
      country.name.common.toLowerCase().includes(inputValue)
    )
    
    setFilteredCountries(filtered);
  }

  return (
    <>
      <Filter
        value={country}
        onChange={handleCountryFiltering}
      />
      <Listing 
        countries={filteredCountries}
      />
    </>
  )
}

export default App
