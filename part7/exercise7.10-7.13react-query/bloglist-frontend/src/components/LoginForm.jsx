import PropTypes from "prop-types";
import loginServices from "../services/login";
import blogServices from "../services/blogs";
import { useNotificationDispatch } from "../api/helpers/helpNotifications";
import { useUserLoggedDispatch } from "../api/helpers/helpUserLogged";
import { useMutation } from "@tanstack/react-query";
export const LoginForm = ({ username, setUsername, password, setPassword }) => {
  LoginForm.propTypes = {
    // handleLogin: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    setUsername: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    setPassword: PropTypes.func.isRequired,
  };

  const dispatchNotification = useNotificationDispatch();
  const dispatchUserLogged = useUserLoggedDispatch();

  const userLoginMutattion = useMutation({
    mutationFn: loginServices.login,
    onSuccess: (user) => {
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogServices.setToken(user.token);
      dispatchUserLogged({ type: "LOGIN", payload: user });
      dispatchNotification({
        type: "ADD",
        payload: {
          type: "success",
          message: "User login",
        },
      });
    },
    onError: () => {
      dispatchNotification({
        type: "ADD",
        payload: {
          type: "error",
          message: "Wrong username or password",
        },
      });
    },
  });
  const handleLogin = async (event) => {
    event.preventDefault();

    userLoginMutattion.mutate({
      username,
      password,
    });

    setUsername("");
    setPassword("");
  };
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
