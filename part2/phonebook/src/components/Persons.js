import React from "react";

const Persons = ({persons, deleteHandler}) => {

    return <ul>
        {persons.map(person => 
            <li key={person.name}>
                {person.name} {person.number}
                <button onClick={()=>{deleteHandler(person.id)}}>Delete</button>
            </li>
        )}
    </ul>
}

export default Persons