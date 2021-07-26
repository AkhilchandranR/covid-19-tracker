import { FormControl, Select,MenuItem } from '@material-ui/core';
import { useState,useEffect } from 'react';
import './App.css';
import InfoBox from './InfoBox';
import Map from './Map';

function App() {
  //setup country state initialization to empty array
  //state is i inializing a variable in react
  //api call url - https://disease.sh/v3/covid-19/countries 
  const [countries, setCountries] = useState([]); 
  const [country , setCountry] = useState('worldwide');
  //useeffect runs a piece of code on a given condition
  useEffect(() => {
    //runs once whwn component loads and when country variable changes,in [] is a dependancy
    const getCountriesData = async ()=>{
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response)=>response.json())
      .then((data)=>{
        const countries = data.map((country)=>({
          name: country.country,
          value: country.countryInfo.iso3,
        }));
        setCountries(countries);
      })
    }
    getCountriesData();
   
  }, [])

  //listener to get selected country
  const onCountryChange = async(e) =>{
    const countryCode = e.target.value;
    setCountry(countryCode);

  }


  return (
    <div className="app">

      {/* header */}
      <div className="app__header">
      <h1>covid-19 tracker</h1>
      <FormControl className="app__dropdown">
        <Select variant="outlined" value={country} id="app___options" onChange={onCountryChange}>
          <MenuItem value="worldwide">Worldwide</MenuItem>
          {/* loop through all the countries and show it  */}
          {
            countries.map(country=>(
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
      </div>
      {/* header ends   */}

      {/* infobox */}
      <div className="app__stats">
      <InfoBox 
      title= "Coronavirus Cases"
      cases={123}
      total={2000}
      />
      <InfoBox 
      title= "Recovered"
      cases={1234}
      total={3000}
      />
      <InfoBox 
      title= "Deaths"
      cases={12345}
      total={4000}
      />
      </div>
      
      {/* infobox ends */}

      {/* map */}
      <Map/>
      {/* map ends */}

    </div>
  );
}

export default App;
