import React from "react";
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import AddBlogForm from "./AddBlogForm";

test('<AddBlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(
    <AddBlogForm addBlog={createBlog} />
  )

  const form = component.container.querySelector('form')
  const author = component.container.querySelector('#author')
  const title = component.container.querySelector('#title')
  const url = component.container.querySelector('#url')
  
  fireEvent.change(title, {
    target: { value: 'React API' }
  })
  fireEvent.change(author, {
    target: { value: 'Facebook' }
  })
  fireEvent.change(url, {
    target: { value: 'www.hello.world' }
  })
  
  fireEvent.submit(form)
  
  console.log(createBlog.mock.calls)
  console.log(createBlog.mock)
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('React API')
  expect(createBlog.mock.calls[0][0].author).toBe('Facebook')
  expect(createBlog.mock.calls[0][0].url).toBe('www.hello.world')
})