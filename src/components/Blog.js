import { useState } from 'react'
import styles from './blog.module.css'
import blogsService from '../services/blogs'

const Blog = ({ blog, setNotification, blogs, setBlogs }) => {
    const [expand, setExpand] = useState(false)

    const toggleExpand = () => {
        setExpand(!expand)
    }

    const handleLike = () => {
        blogsService.like(blog)
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

    const handleRemove = () => {
        const confirm = window.confirm(`Are you sure you want to remove ${blog.name}? This cannot be undone!`)
        if (!confirm) return
        blogsService.remove(blog.id)
            .then(() => {
                setBlogs(blogs.filter(item => item.id !== blog.id))
                setNotification({
                    text: 'Blog removed',
                    color: 'green'
                })
            })
            .catch(response => {
                if (response.response.status === 404) {
                    setBlogs(blogs.filter(item => item.id !== blog.id))
                }
                const data = response.response.data
                setNotification({
                    text: data.error,
                    color: 'red'
                })
            })
    }

    return <div className={styles.blog} >

        <label>
            <strong>{`${blog.title} - ${blog.author}`}</strong>&nbsp;
            <button onClick={toggleExpand} >{expand ? 'hide' : 'view'}</button>
        </label>

        {expand &&
            <div>
                {blog.url}<br/>
                {`${blog.likes} likes`}
                <button onClick={handleLike}>like</button>
                <br/>
                {blog.user.name}
                {window.localStorage.getItem('username') === blog.user.username &&
            <><br /><button onClick={handleRemove}>remove</button></>
                }
            </div>
        }
    </div>
}

export default Blog