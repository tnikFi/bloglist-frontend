import { useState } from 'react'
import blogsService from '../services/blogs'


const BlogForm = ({user, blogs, setBlogs, setNotification}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleSubmit = event => {
        event.preventDefault()
        const blogData = {title, author, url}
        blogsService.create(blogData)
        .then(response => {
            setBlogs(blogs.concat(response))
            setNotification({
                text: `New blog ${response.title} added`,
                color: 'green'
            })
        })
        .catch(reason => console.log(reason))
    }

    const handleInput = setter => {
        return event => {
            setter(event.target.value)
        }
    }

    if (!user) {
        return null
    }

    return <>
        <h2>create new</h2>
        <label>
            title:
            <input type='text' name='title' value={title} onChange={handleInput(setTitle)} />
        </label>
        <br />
        <label>
            author:
            <input type='text' name='author' value={author} onChange={handleInput(setAuthor)} />
        </label>
        <br />
        <label>
            url:
            <input type='text' name='url' value={url} onChange={handleInput(setUrl)} />
        </label>
        <br />
        <button onClick={handleSubmit}>create</button>
    </>
}

export default BlogForm