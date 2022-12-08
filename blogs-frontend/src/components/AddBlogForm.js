import React, { useState } from 'react'

const AddBlogForm = ({addBlog}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitle = event => {
    setTitle(event.target.value)
  }

  const handleAuthor = event => {
    setAuthor(event.target.value)
  }
  
  const handleUrl = event => {
    setUrl(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()

    const newBlog = {
      title,
      author,
      url
    }

    addBlog(newBlog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <div className="formDiv">
      <h2>Add a new blog</h2>
      <form onSubmit={handleSubmit}>
        Title: <input id='title' value={title} onChange={handleTitle} /><br/>
        Author: <input id='author' value={author} onChange={handleAuthor} /><br/>
        Url: <input id='url' value={url} onChange={handleUrl} /><br/>
        <button type='submit'>save</button>
      </form>
    </div>
  )
}

export default AddBlogForm