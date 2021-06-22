import React from 'react'
import Person from './Person'

const ContactsDisplay = (props) => {
    return (
        props.personsToDisplay.map(person => <Person key = {person.name} person = {person} deletePerson = {() => props.deletePerson(person.id)}/>)
    )
}

export default ContactsDisplay