import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAllPersons = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const addNewPerson = personObject => {
    const request = axios.post(baseUrl, personObject)
    return request.then(response => response.data)
}

export default { getAllPersons, addNewPerson }