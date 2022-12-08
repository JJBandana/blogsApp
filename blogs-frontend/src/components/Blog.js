import { useState } from 'react'
const Blog = ({blog, sumLike, handleDelete}) => {

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : ''}
  const showWhenVisible = { display: visible ? '' : 'none'}

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => setVisible(!visible)

  return(
    <div style={blogStyle}>
      {blog.title} by {blog.author}
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility} >view</button>
      </div>
      <div style={showWhenVisible}>
        url: {blog.url}<br/>
        likes: {blog.likes} <button onClick={sumLike}>like</button>
        <button onClick={handleDelete}>delete</button>
        <button onClick={toggleVisibility}>close</button>
      </div>
    </div>
  )
}

export default Blog