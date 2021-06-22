import React from 'react'

const Person = ({person, deletePerson}) => {
    return (
        <p className = 'person'>
            {person.name}: {person.number}
            <button onClick = {deletePerson}>delete</button>
        </p>
    )
}

export default Person