import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Error from './components/Error'
import AddBlogForm from './components/AddBlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [noti, setNoti] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    
    try{
      const user = await loginService.login({username, password})
      blogService.setToken(user.token)

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMsg('Wrong username or password')
      console.log(exception)
      setTimeout(() => {
        setErrorMsg(null)
      }, 5000)
    }
  }

  const addBlog = async blog => {
    try {
      const response = await blogService.create(blog)
      setBlogs(blogs.concat(response))
      blogFormRef.current.toggleVisibility()
      setNoti(`Added "${response.title}" by "${response.author}"`)
      setTimeout(() => setNoti(null), 5000)
    } catch (exception) {
      setErrorMsg(exception)
      setTimeout(() => setErrorMsg(null), 8000)
    }
  }

  const sumLike = async id => {
    try {
      const likedBlog = blogs.find(blog => blog.id === id)
      const newBlog = {...likedBlog, likes: likedBlog.likes + 1}
      await blogService.update(id, newBlog)
      setBlogs(blogs.map(blog => blog.id === id ? newBlog : blog))
    } catch (exception) {
      setErrorMsg(exception)
    }
  }

  const handleDelete = async id => {

    const blogToDelete = blogs.find(blog => blog.id === id)

    if (window.confirm(`Remove blog "${blogToDelete.title}" by ${blogToDelete.author}?`)){
      try {
        await blogService.remove(id)
        setBlogs(blogs.filter(blog => blog.id !== id))
      } catch (error) {
        setErrorMsg(error)
      }
    }    
  }

  const sortedBlogs = () => {
    blogs.sort((a,b) => b.likes - a.likes)

    return(
      blogs.map(blog => <Blog key={blog.id} blog={blog} handleDelete={() => handleDelete(blog.id)} sumLike={() => sumLike(blog.id)}/> )
    )
  }

  return (
    <div>
      <h1>Blogs App</h1>
      <Notification message={noti} />
      <Error message={errorMsg} />

      {user === null?
        <LoginForm handleLogin={handleLogin} handlePassword={({target}) => setPassword(target.value)} handleUsername={({target}) => setUsername(target.value)} username={username} password={password} /> :
        <div>
          <p>{user.name} logged-in </p>
          <button id='logout' onClick={() => {
            window.localStorage.removeItem('loggedBlogUser')
            document.location.reload(true)
            }}>Logout</button>
          <Togglable buttonLabel="create new Blog" ref={blogFormRef} >
            <AddBlogForm addBlog={addBlog} />
          </Togglable>
      <h2>Blogs</h2>

      {sortedBlogs()}
        </div>
}
    </div>
  )
}

export default App;