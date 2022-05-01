import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Fluence } from '@fluencelabs/fluence';
import { krasnodar } from '@fluencelabs/fluence-network-environment';

type Message = {
  text: String,
  senderPeerId: String | null,
}

const relayNode = krasnodar[2];

function App() {
  const [messages, setMessages] = useState<Message[]>([]);

  const connect = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      await Fluence.start( { connectTo: relayNode } );

    } catch (err) {
      console.log("peer initialization failed", err);
    }
  }
  function setNewMessage(msg: Message) {
    setMessages([
      ...messages,
      msg
    ]);
  }
  const sendMessage = async (msgInfo: React.FormEvent<HTMLFormElement>) => {
    /*
    if (!Fluence.getStatus().isConnected) {
      return;
    }*/
    msgInfo.preventDefault();
    let msg: Message = {
      text: (msgInfo.target as HTMLFormElement).peerId.value,
      senderPeerId: Fluence.getStatus().peerId,
    };
    //const res = await sendMsg(msg, msgInfo.target.peerId.value);
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
                  {messages.map((msg, index) => {
                    return (
                        <div key={index}>{msg.senderPeerId}: {msg.text}</div>
                    )
                  })}
                </div>
              </div>
              <form onSubmit={e => sendMessage(e)}>
                <div className="card-footer">
                  <input id="text"
                         type="text"
                         placeholder="Your message"
                         className="form-control"
                  />
                  <br/>
                  <input id="peerId"
                         type="text"
                         placeholder="Recipient peer id"
                         className="form-control"
                  />
                  <br/>
                  <button type="submit"
                          className="btn btn-primary form-control">
                    Send
                  </button>
                </div>
              </form>
              <button type="submit"
                      onClick={ connect }>
                Connect
              </button>
            </div>
          </div>
        </div>
      </div>
  );
}

export default App;
