import logo from "./logo.svg";
import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import AddProducts from "./AddProducts";
import "./style.css";
import Shop from "./Shop";
import { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [valid, setValid] = useState(false);

  const handleLog = () => {
    if (username === "admin" && password === "admin") {
      <Link to="/"></Link>;
      setValid(true);
    } else {
      setValid(false);
    }
  };

  const handleBuy = () => {
    setValid(true);
  };
  return (
    <div className="app">
      {!valid && (
        <div className="login">
          <h1>Login</h1>
          <div className="login-form">
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLog}>Log in</button>
          </div>
          <div className="action">
            <Link to="/shop">
              <button onClick={handleBuy}>Buy</button>
            </Link>
          </div>
        </div>
      )}
      <Routes>
        {valid && <Route path="/" element={<AddProducts />} />}
        {valid && <Route path="/shop" element={<Shop />} />}
      </Routes>
    </div>
  );
}

export default App;
