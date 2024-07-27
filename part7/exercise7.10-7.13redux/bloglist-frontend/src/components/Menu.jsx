import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Menu = () => {
  const userLogged = useSelector((state) => state.userLogged);

  return (
    <div
      style={{
        display: "flex",
        gap: 5,
        width: "100%",
        background: "#d3d3d3",
      }}
    >
      <div>
        <Link to="/">blogs</Link>
      </div>
      <div>
        <Link to="/users">users</Link>
      </div>
      <div>
        {userLogged?.name} logged-in{" "}
        <button
          onClick={(e) => {
            e.preventDefault();
            window.localStorage.removeItem("loggedBlogappUser");
            window.location.reload();
          }}
        >
          logout
        </button>
      </div>
    </div>
  );
};

export default Menu;
