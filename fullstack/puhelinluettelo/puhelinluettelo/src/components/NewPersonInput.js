import React from 'react'

const NewPersonInput = (props) => {
    return (
        <form onSubmit = {props.addPerson}>
        <div>
          name: <input value = {props.newPersonName} onChange = {props.handleNameChange}/>
        </div>
        <div>
          phone:<input value = {props.newPersonPhone} onChange = {props.handlePhoneChange}/>
        </div>
        <div>
          <button type = "submit">add</button>
        </div>
      </form>
    )
}

export default NewPersonInput