import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token}
  }

  const request = await axios.post(baseUrl, newObject, config)
  return request.data
}

const update = async (id, newObject) => {
  const request = await axios.put(`${baseUrl}/${id}`, newObject)
  return request.data
}

const remove = async id => {
  const config = { headers: { Authorization: token }}
  
  const request = await axios.delete(`${baseUrl}/${id}`, config)
  return request.data
}

const blogService = { getAll, create, update, remove, setToken }

export default blogService