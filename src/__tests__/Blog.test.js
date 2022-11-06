import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'

// Example blog used in tests
const blog = {
    author: 'Testing author',
    id: '0123456789abcdef',
    title: 'Component testing with react-testing-library',
    url: 'http://www.testing.example',
    likes: 0,
    user: { name: 'Test User' }
}

test('Renders title', () => {
    render(<Blog blog={blog} />)

    // Author is shown in the header, so we won't be separately looking for it in the second test since
    // we already know it's shown if this test passes.
    const element = screen.getByText('Component testing with react-testing-library - Testing author')

    expect(element).toBeDefined()
})

test('Shows info', async () => {
    render(<Blog blog={blog} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const url = screen.getByText(blog.url)
    const likes = screen.getByText('0 likes')

    expect(url).toBeDefined()
    expect(likes).toBeDefined()
})

test('Like button works', async () => {
    const mockHandler = jest.fn()

    render(<Blog blog={blog} handleLike={mockHandler} />)

    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.dblClick(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
})