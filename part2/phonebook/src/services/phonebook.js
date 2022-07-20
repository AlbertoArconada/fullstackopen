import axios from "axios"

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const promise = axios.get(baseUrl)
    return promise.then(response => response.data)
}

const create = (newPerson) => {
    const promise = axios.post(baseUrl, newPerson)
    return promise.then(response => response.data)
}

const deletePerson = (id) => {
    const promise = axios.delete(`${baseUrl}/${id}`)
    return promise.then(response => response.data)
}

const updatePerson = (id, updatedPerson) => {
    const promise = axios.put(`${baseUrl}/${id}`, updatedPerson)
    return promise.then(response => response.data)
}

const phonebookService = {
    getAll,
    create,
    deletePerson,
    updatePerson
}

export default phonebookService