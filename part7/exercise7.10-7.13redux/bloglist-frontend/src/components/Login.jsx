import { Box } from "@mui/material";
import LoginForm from "./LoginForm";
import Togglable from "./Toggable";

const Login = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 5,
      }}
    >
      <Box>
        <h2
          style={{
            margin: 0,
          }}
        >
          log in to application
        </h2>
      </Box>
      <Box>
        <Togglable
          buttonLabel="login"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LoginForm />
        </Togglable>
      </Box>
    </Box>
  );
};

export default Login;
