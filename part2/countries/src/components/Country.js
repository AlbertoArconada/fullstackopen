import React from "react";
import Weather from "./Weather";

const Country = ({country}) => {
   
    return (
        <div> 
        <h1>{country.name.common}</h1>
       {country.capital ?  <p>Capital: {country.capital[0]}</p> : ''}
        <p>Population: {country.population}</p>
        <h2>Languages</h2>
        <ul>
            {Object.entries(country.languages).map(language => 
                <li key={language[0]}>{language[1]}</li>
            )}
        </ul>
        <img src={country.flags.png} alt=""/>
        <Weather name={country.name.common}/>
    </div>
    )
}

export default Country;