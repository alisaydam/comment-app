import logo from "./logo.svg";
import "./App.css";

function App() {
  const sock = new WebSocket("ws://localhost:3001/like");

  sock.onopen = function () {
    console.log("open");
  };

  sock.onmessage = function (e) {
    const message = JSON.parse(e.data);
    const dataToSend = JSON.stringify(message);
    //* set comments on data incoming
    console.log("Data that comes from ws", dataToSend);
  };
  const data = {
    name: "Ali",
  };

  function wsSend() {
    sock.send(JSON.stringify(data));
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={wsSend}>Send data to WS</button>
      </header>
    </div>
  );
}

export default App;
