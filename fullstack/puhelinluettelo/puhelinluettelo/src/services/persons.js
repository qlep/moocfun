import axios from 'axios'

const baseURL = 'http://localhost:3001/api/persons'

const getAll = () => {
    return axios.get(baseURL)
}

const createPerson = newPerson => {
    return axios.post(baseURL, newPerson)
}

const updatePerson = (id, newPerson) => {
    return axios.put(`${baseURL}/${id}`, newPerson)
}

const deletePerson = (id) => {
    console.log(`deleting ${baseURL}/${id}`)
    return axios.delete(`${baseURL}/${id}`)
}

export default {
    getAll, createPerson, updatePerson, deletePerson
}