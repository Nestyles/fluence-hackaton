import './App.css';
import React, {useState} from 'react'

function App() {
  const [messages, setMessages] = useState([]);

  function setNewMessage(msg) {
    setMessages([
      ...messages,
      msg
    ]);
  }
  function sendMessage(user) {
    user.preventDefault();
    const msg = {
      username: user.target.username.value,
      text: user.target.text.value
    };
    setNewMessage(msg)
  }

  return (
    <div className="container">
        <div className="row">
          <div className="col-4">
            <div className="card">
              <div className="card-body">
                <div className="card-title">P2P Chatapp with Fluence :)</div>
                <hr/>
                <div className="messages">
                  {messages.map(msg => {
                    return (
                        <div className="key">{msg.username}: {msg.text}</div>
                    )
                  })}
                </div>
              </div>
              <form onSubmit={e => sendMessage(e)}>
                <div className="card-footer">
                  <input id="username"
                         type="text"
                         placeholder="Username"
                         className="form-control"
                  />
                  <br/>
                  <input id="text"
                         type="text"
                         placeholder="Your message"
                         className="form-control"
                  />
                  <br/>
                  <button type="submit"
                          className="btn btn-primary form-control">
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
}

export default App;
