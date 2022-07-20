import React, {useState, useEffect} from "react";
import Country from "./Country";

const Results = ({countries, loading, states, handleChangeState}) => {
    if(loading)
        return <div>Loading results, please wait...</div>
    if (!countries || countries.length === 0)
        return <div>There's no countries to show</div>
    else if (countries.length === 1) 
        return (
       <Country country={countries[0]} />
        )
    else if (countries.length < 10) 
        return (
        <ul>
            {countries.map((country, index) => {
                return (
                    <li key={country.name.common}>
                        {country.name.common}
                        <button value={index} onClick={handleChangeState}>{states[index] ? "Hide" : "Show"}</button>
                        {states[index]?<Country country={country}/>:''}
                        
                    </li>
                )
})}
        </ul>
        )
    else
        return <div>Too many matches, specify another filter</div>
}

export default Results