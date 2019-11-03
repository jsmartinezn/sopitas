import React, { useState, useEffect } from "react";
import "./App.css";

import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Jumbotron from "./components/Jumbotron";

function App() {
  const [docs, setDocs] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3001");

    ws.onopen = () => {
      console.log("Connected to ws");

      ws.onmessage = msg => {
        console.log("Got ws data", JSON.parse(msg.data));
        setDocs(JSON.parse(msg.data));
      };
    };

    fetch("data")
      .then(res => res.json())
      .then(data => {
        console.log("Got data", data);
        if (data.err) {
          setErr(JSON.stringify(data.msg));
        } else {
          setDocs(data);
        }
      });
  }, []);

  const renderDocs = () => docs.map(d => <div key={d.name}>{d.name}</div>);
  return (
    <div className="App container-fluid">
      <Header />
      <Navbar />
      <Jumbotron />
      <h1>Reactive!!!</h1>
      <div>{err}</div>
      {renderDocs()}
    </div>
  );
}

export default App;
