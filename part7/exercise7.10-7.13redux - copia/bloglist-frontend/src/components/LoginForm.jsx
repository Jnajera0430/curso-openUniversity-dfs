import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logginUser } from "../reducers/userReducer";
const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(
      logginUser({
        username,
        password,
      })
    );
    setUsername("");
    setPassword("");
  };

  // LoginForm.propTypes = {
  //   handleLogin: PropTypes.func.isRequired,
  //   username: PropTypes.string.isRequired,
  //   setUsername: PropTypes.func.isRequired,
  //   password: PropTypes.string.isRequired,
  //   setPassword: PropTypes.func.isRequired,
  // };
  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          data-testid="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          data-testid="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;
