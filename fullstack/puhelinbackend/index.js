const { response, request } = require('express')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

// middleware in execution order
app.use(cors())
app.use(express.static('build'))
app.use(express.json())

morgan.token("json", function(req, res) {
    return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :json')
)

const generateID = () => {
    // claculate next id val
    const maxID = persons.length > 0 ? 
    Math.max(...persons.map(p => p.id)) : 0

    return maxID + 1
}


let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-32-234345"
    },
    {
        id: 4,
        name: "Huy S. Gory",
        number: "35840-123458"
    }
]

app.get('/info', (request, response) => {
    response.send(
        `<p>There are ${persons.length} contacts in phonebook </p>
        <p>as of ${Date()}</p>`
    )
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const person = request.body
    
    if (!person.name || !person.number) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    if (persons.map(p => p.name.toLocaleLowerCase())
        .includes(person.name.toLowerCase())) {
        return response.status(409).json({
            error: 'duplicate contact name'
        })       
    } else if (persons.map(p => p.number)
        .includes(person.number)) {
        return response.status(409).json({
            error: 'duplicate contact number'
        })
    } else {
        const newPerson = {
            id: generateID(),
            name: person.name,
            number: person.number        
        }

        console.log(`posting ${newPerson.id}`)
    
        persons.concat(newPerson)
        response.json(newPerson)
    }
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({error: 'uknown endpoint'})
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})