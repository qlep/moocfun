const mongoose = require('mongoose')
const password = process.argv[2]
let nameInput = ''
let numberInput = ''
const URL = `mongodb+srv://fullstack:${password}@cluster0.92az4.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true,
    useFindAndModify: false, useCreateIndex: true})

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

// read input here
if (process.argv[3] && process.argv[4]) {
    nameInput = process.argv[3]
    numberInput = process.argv[4]

    // creating person to put to db here
    const person = new Person({
    name: nameInput,
    number: numberInput
    })

    // putting person to db here
    person.save().then(response => {
        console.log(`added ${person.name} ${person.number} to phonebook`)
        mongoose.connection.close()
    })
}

if (process.argv.length === 3) {
    console.log('Phonebook: ')
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}

// this is how data is retrived from db
// Person.find({name: "Pidr Morskoy"}).then(result => {
//     result.forEach(person => {
//         console.log(person)
//     })
//     mongoose.connection.close()
// })