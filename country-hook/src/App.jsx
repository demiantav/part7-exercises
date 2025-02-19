import React, { useState, useEffect } from 'react'
import axios from 'axios'

const API_ENDPOINT_SINGLECOUNTRY= "https://studies.cs.helsinki.fi/restcountries/api/name";

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {

  const [country, setCountry] = useState(null)

  useEffect( () => {
   
    if(!name)
     
      return;

    console.log(name)

    async function fetchCountry () {
       try {
      const countryToFind = await axios.get(`${API_ENDPOINT_SINGLECOUNTRY}/${name}`)
      
      console.log(countryToFind.data)
      
      setCountry({...countryToFind.data, found: true})

      
      
      
    } catch (error) {

      setCountry({ found: false });

      
    }
     }

    fetchCountry();

  }, [name])

  console.log(country)
  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null;
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.name.common} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div> 
      <img src={country.flags.svg} height='100' alt={`flag of ${country.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }


  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>
      
      <Country country={country} />
    </div>
  )
}

export default App