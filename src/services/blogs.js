import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = blogData => {
  const request = axios.post(baseUrl, blogData, {headers: {'Authorization': `Bearer ${window.localStorage.getItem('token')}`}})
  return request.then(response => response.data)
}

const like = blogData => {
  const newData = {...blogData, likes: ++blogData.likes}
  const request = axios.put(`${baseUrl}/${blogData.id}`, newData, {headers: {'Authorization': `Bearer ${window.localStorage.getItem('token')}`}})
  return request.then(response => response.data)
}

const remove = id => {
  const request = axios.delete(`${baseUrl}/${id}`, {headers: {'Authorization': `Bearer ${window.localStorage.getItem('token')}`}})
  return request.then(response => response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, like, remove }