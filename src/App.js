import { FormControl, Select,MenuItem,Card,CardContent } from '@material-ui/core';
import { useState,useEffect } from 'react';
import './App.css';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import { sortData } from './util';
import "leaflet/dist/leaflet.css";
// import LineGraph from './LineGraph';

function App() {
  //setup country state initialization to empty array
  //state is i inializing a variable in react
  //api call url - https://disease.sh/v3/covid-19/countries 
  const [countries, setCountries] = useState([]); 
  const [country , setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({
    lat: 34.80746, lng: -40.4796});
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
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
  
        const sortedTableData = sortData(data);
        setTableData(sortedTableData);
        setMapCountries(data);
        setCountries(countries);
      });
    };
    getCountriesData();
   
  }, []);

  //works when the page loads....
  useEffect(()=>{
    fetch('https://disease.sh/v3/covid-19/all')
    .then((response)=>response.json())
    .then((data)=>{
      setCountryInfo(data);
    });
  },[]);


  //listener to get selected country and render api
  const onCountryChange = async(e) =>{
    const countryCode = e.target.value;
    
    //https://disease.sh/v3/covid-19/countries/usa
    //https://disease.sh/v3/covid-19/all
    const url = countryCode === 'worldwide'? 'https://disease.sh/v3/covid-19/all':
    `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
    .then(response=>response.json())
    .then(data=>{
      setCountry(countryCode);
      setCountryInfo(data);
      setMapCenter([data.countryInfo.lat,data.countryInfo.long]);
      setMapZoom(4);
    })
  };


  return (
    <div className="app">
      <div className="app__left">
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
        cases={countryInfo.todayCases}
        total={countryInfo.cases}
        />
        <InfoBox 
        title= "Recovered"
        cases={countryInfo.todayRecovered}
        total={countryInfo.recovered}
        />
        <InfoBox 
        title= "Deaths"
        cases={countryInfo.todayDeaths}
        total={countryInfo.deaths}
        />
        </div>
        
        {/* infobox ends */}

        {/* map */}
        <Map center={mapCenter} 
        zoom={mapZoom}
        countries={mapCountries}
        casesType="cases"/>
        {/* map ends */}
      </div>

      <div className="app__right">
            <Card>
              <CardContent>
                <h3>live cases by country</h3>
                <Table countries={tableData}/>
                {/* <h3>worldwide new cases</h3>
                <LineGraph/> */}
              </CardContent>
            </Card>
      </div>     

    </div>
  );
}

export default App;
