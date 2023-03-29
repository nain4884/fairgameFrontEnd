import React from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";

function demo({ socket }) {
  return (
    <div className="App">
      <header className="app-header">React Socket Demo</header>
      {socket.connected ? (
        <div className="chat-container">
          <Messages socket={socket} />
          <MessageInput socket={socket} />
        </div>
      ) : (
        <div>Not Connected</div>
      )}
    </div>
  );
}

export default demo;
