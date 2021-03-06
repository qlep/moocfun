const { response } = require('express')
const express = require('express')
const app = express()

const cors = require('cors')

// use json parser and other middleware
app.use(express.json())
app.use(cors())
app.use(express.static('build'))

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      date: "2020-01-10T17:30:31.098Z",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only Javascript",
      date: "2020-01-10T18:39:34.091Z",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2020-01-10T19:20:14.298Z",
      important: true
    }
]

const generateID = () => {
    const maxID = notes.length > 0 
    ? Math.max(...notes.map(n => n.id)) : 0

    return maxID + 1
}

app.get('/api/notes', (request, response) => {
      response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    
    if (note) {
      response.json(note)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
    console.log("delete " + id)

    response.status(204).end()
})

app.put('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    note = note.find(note => note.id === id)
    note.content = request.body.content
    console.log(request.body)
})

app.post('/api/notes', (request, response) => {
    const body = request.body

    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const note = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateID() 
    }

    response.json(note)
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})