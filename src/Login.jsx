import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toggleLogin } from "./productsSlice";

const Login = () => {
  const validLogin = useSelector((state) => state.products.validLogin);
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginError = useSelector((state) => state.products.loginError);

  const handleLog = () => {
    dispatch(toggleLogin({ username, password }));
  };

  useEffect(() => {
    if (validLogin) {
      navigate("/manage-products");
    }
  }, [validLogin]);

  return (
    <div className="login-page">
      {!validLogin && (
        <div className="signin-form">
          <h1>Login</h1>
          <div className="input-group">
            <input
              type="text"
              id="email"
              value={username}
              placeholder="p"
              onChange={(e) => setUsername(e.target.value)}
            />
            <label for="username">Username</label>
          </div>
          <div className="input-group">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="p"
            />
            <label for="password">Password</label>
          </div>
          {loginError && <div className="error">{loginError}</div>}
          <div className="form-footer">
            <button type="submit" onClick={handleLog}>
              Login
            </button>
          </div>
        </div>
      )}
      <div className="action">
        <p>Are you a client?</p>
        <Link to="/shop">
          <button>Buy</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
