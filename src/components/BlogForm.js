import { useState } from 'react'


const BlogForm = ({ user, handleSubmit }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

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
        <button onClick={() => handleSubmit(event, { title, author, url })}>create</button>
    </>
}

export default BlogForm