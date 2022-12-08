import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, handleUsername, handlePassword, username, password }) => {

  return(
    <form onSubmit={handleLogin}>
    <div>
      username
      <input
      id='username'
      type='text'
      value={username}
      name='Username'
      onChange={handleUsername}
      />
    </div>
    <div>
      password
      <input
      id='password'
      type='password'
      value={password}
      name='Password'
      onChange={handlePassword}
      />
    </div>
    <button id='login-button' type='submit'>login</button>
  </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsername: PropTypes.func.isRequired,
  handlePassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm