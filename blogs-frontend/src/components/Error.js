export default function Error({message}){
  if(message === null) return null

  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  return(<div style={errorStyle} className="error"> {message} </div>)
}