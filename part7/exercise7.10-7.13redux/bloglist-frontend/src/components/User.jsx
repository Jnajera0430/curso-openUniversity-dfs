import { List, ListItem, ListItemText } from "@mui/material";
import { useSelector } from "react-redux";
import { useMatch } from "react-router-dom";

const User = () => {
  const users = useSelector((state) => state.users);
  const match = useMatch("/users/:id");
  const user = match ? users.find((user) => user.id === match.params.id) : null;
  console.log({ users });
  if (!user) {
    return null;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <List>
        {user.blogs.map((blog, index) => (
          <ListItem key={blog.id}>
            <ListItemText>
              {index + 1} - {blog.title}
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default User;
