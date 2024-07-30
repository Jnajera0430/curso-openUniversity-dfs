import { Avatar, Box, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Menu = () => {
  const userLogged = useSelector((state) => state.userLogged);

  return (
    <Box
      sx={{
        height: "5vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#1976d2",
        padding: "10px",
        borderRadius: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
        }}
      >
        <Box
          sx={{
            color: "white",
          }}
        >
          <h2>blog app</h2>
        </Box>
        <Button>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "white",
            }}
          >
            blogs
          </Link>
        </Button>
        <Button>
          <Link
            to="/users"
            style={{
              textDecoration: "none",
              color: "white",
            }}
          >
            users
          </Link>
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Avatar
            alt={`${userLogged?.name}  logged-in`}
            sx={{
              display: "flex",
            }}
          />
          {userLogged?.name} logged-in
        </Box>
        <Button
          onClick={(e) => {
            e.preventDefault();
            window.localStorage.removeItem("loggedBlogappUser");
            window.location.reload();
          }}
          color="inherit"
          sx={{
            background: "gray",
            color: "white",
          }}
        >
          logout
        </Button>
      </Box>
    </Box>
  );
};

export default Menu;
