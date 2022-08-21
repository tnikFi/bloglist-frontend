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


    return <>
        <Notification text={notification.text} color={notification.color} />
        <h2>{user ? 'blogs' : 'log in to application'}</h2>
        <Login user={user} setUser={setUser} setNotification={setNotification} />

        {user &&
      <Toggleable buttonLabel={'new blog'} ref={newBlogToggleRef} >
          <BlogForm user={user} blogs={blogs} setBlogs={setBlogs} setNotification={setNotification} newBlogRef={newBlogToggleRef} />
      </Toggleable>
        }

        {user && blogs.sort((a, b) => {
            if (a.likes === b.likes) {
                return 0
            } else {
                return a.likes < b.likes ? 1 : -1
            }
        }).map(blog =>
            <Blog key={blog.id} blog={blog} setNotification={setNotification} blogs={blogs} setBlogs={setBlogs} />
        )
        }
    </>
}

export default App
