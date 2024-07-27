import LoginForm from "./LoginForm";
import Togglable from "./Toggable";

const Login = () => {
  return (
    <div>
      <h2>log in to application</h2>
      <Togglable buttonLabel="login">
        <LoginForm />
      </Togglable>
    </div>
  );
};

export default Login;
