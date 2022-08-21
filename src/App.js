import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Login from './components/Login'
import Notification from './components/Notification'
import blogService from './services/blogs'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({text: null, color: null})
  
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  // Load logged in user's data on page load
  useEffect(() => {
    if (window.localStorage.getItem('token')) {
      setUser({
        token: window.localStorage.getItem('token'),
        name: window.localStorage.getItem('name'),
        username: window.localStorage.getItem('username')
      })
    }
  }, [])
  

  return (
    <div>
      <Notification text={notification.text} color={notification.color} />
      <h2>{user ? 'blogs' : 'log in to application'}</h2>
      <Login user={user} setUser={setUser} setNotification={setNotification} />
      <br />
      <BlogForm user={user} blogs={blogs} setBlogs={setBlogs} setNotification={setNotification} />
      {user && blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
