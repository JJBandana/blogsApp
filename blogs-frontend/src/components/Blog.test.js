import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


describe('<Blog /> testing', () => {
  let component
  const likeButton = jest.fn()

  beforeEach(() => {

    const blog = {
      title: 'Developing Apps is the best',
      author: 'TED',
      url: "w3.com",
      likes: 32
    }
    component = render(<Blog blog={blog} sumLike={likeButton} />)
  })

  test('renders content', () => {
    expect(component.container).toHaveTextContent('Developing Apps is the best')
    expect(component.container).toHaveTextContent('TED')
  })

  test('blogs has URL and likes properties after clicking "view" button', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('w3.com')
    expect(component.container).toHaveTextContent('likes: 32')
  })

  test('if like button is clicked twice, the event handler is called twice.', () => {
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(likeButton.mock.calls).toHaveLength(2)
  })
}) 