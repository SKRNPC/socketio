import { useEffect, useState } from "react";
import "./App.css";
import SocketIO from "socket.io-client";

const socket = SocketIO("http://localhost:3001", {
  transports: ["websocket", "polling", "flashsocket"],
});

function App() {
  const [text, setText] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    socket.on("push_data", (response) => {
      data.push(response.url);
      setData([...data]);
    });
  }, [data]);

  const sendData = () => {
    if (text != "") {
      socket.emit("send_data", {
        url: text,
      });
      data.push(text);
      setData([...data]);
    } else {
      alert("Link gir");
    }
  };
  return (
    <div className="App">
      <div>
        <input
          value={text}
          type="text"
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={sendData}>Veriyi gönder</button>
      </div>

      <div>
        {data.map((item) => (
          <div>
            <a href={item} target="_blank" rel="noopener noreferrer">
              {item}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
