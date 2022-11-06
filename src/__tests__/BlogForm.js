import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from '../components/BlogForm'

test('Blog submission form works', async () => {
    const mockHandler = jest.fn()

    // Give the user prop a truthy value just to ensure it renders.
    // (BlogForm will be hidden by default if user is not logged in)
    render(<BlogForm user={true} handleSubmit={mockHandler} />)

    const user = userEvent.setup()
    const submit = screen.getByText('create')
    const title = screen.getByLabelText('title:')
    const author = screen.getByLabelText('author:')
    const url = screen.getByLabelText('url:')

    await user.type(title, 'a')
    await user.type(author, 'b')
    await user.type(url, 'c')
    await user.click(submit)

    const args = mockHandler.mock.calls[0][1]
    expect(args.title).toBe('a')
    expect(args.author).toBe('b')
    expect(args.url).toBe('c')
})