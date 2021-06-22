import React, {useState, useEffect} from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import noteService from './services/notes'

const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `Note ${note.content} was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)

        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const handleNoteChange = (event) => {
    console.group(event.target.value)
    setNewNote(event.target.value)
  }

  const addNote = (event) => {
    // estä sivun uudelleenlatautumisen
    event.preventDefault()

    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      id: notes.length + 1
    }

    // noten postaminen palvelimelta
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  // const tulos = ehto ? true : false
  // if true val1, else if false val2
  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  return(
    <>
      <h2>All Notes</h2>
      <Notification message = {errorMessage} />
      <div>
        <button onClick = {() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
            <Note key = {note.id} 
            note = {note}
            toggleImportance = {() => toggleImportanceOf(note.id)}/>
        )}
      </ul>
      <h2>Add new note</h2>
      <form onSubmit = {addNote}>
        <input value = {newNote} onChange = {handleNoteChange}/>
        <button type = "submit">save</button>
      </form>
      <Footer />
    </>
  )
}

export default App