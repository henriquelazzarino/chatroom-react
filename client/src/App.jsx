import './App.css'

import io from 'socket.io-client';

const socket = io.connect('http://localhost:3001');

function App() {

  return (
    <div className='chat'>
      <h3>Join a chat!</h3>
      <input type="text" placeholder='...' />
    </div>
  )
}

export default App
