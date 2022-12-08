export default function Notification({message}){
  if(message === null) return null

  const notiStyle = {
    color: 'green',
    background: 'lightgreen',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  return (<div style={notiStyle} className="notification"> {message} </div>)
}