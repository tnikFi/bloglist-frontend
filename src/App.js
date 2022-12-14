import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Login from './components/Login'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import blogService from './services/blogs'


const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [notification, setNotification] = useState({ text: null, color: null })
    const newBlogToggleRef = useRef()

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

    // Event handler for liking blog entries
    const handleLike = blog => {
        blogService.like(blog)
            .then(response => {
                setBlogs(blogs.map(item => {
                    if (item.id === blog.id) return Object.assign({}, { ...blog, likes: response.likes }, { valid: true })
                    return item
                }))
            })
            .catch(response => {
                const data = response.response.data
                setNotification({
                    text: data.error,
                    color: 'red'
                })
            })
    }

    // Event handler for submitting new blogs
    const handleSubmit = (event, { title, author, url }) => {
        event.preventDefault()
        const blogData = { title, author, url }
        blogService.create(blogData)
            .then(response => {
                setBlogs(blogs.concat(response))
                setNotification({
                    text: `New blog ${response.title} added`,
                    color: 'green'
                })
                newBlogToggleRef.current.toggleVisibility()
            })
            .catch(reason => console.log(reason))
    }


    return <>
        <Notification text={notification.text} color={notification.color} />
        <h2>{user ? 'blogs' : 'log in to application'}</h2>
        <Login user={user} setUser={setUser} setNotification={setNotification} />

        {user &&
      <Toggleable buttonLabel={'new blog'} ref={newBlogToggleRef} >
          <BlogForm user={user} handleSubmit={handleSubmit} />
      </Toggleable>
        }

        {user && blogs.sort((a, b) => {
            if (a.likes === b.likes) {
                return 0
            } else {
                return a.likes < b.likes ? 1 : -1
            }
        }).map(blog =>
            <Blog key={blog.id} blog={blog} setNotification={setNotification} blogs={blogs} setBlogs={setBlogs} handleLike={handleLike} />
        )
        }
    </>
}

export default App
