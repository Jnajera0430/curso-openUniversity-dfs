import { useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, FormLabel, TextField } from "@mui/material";

export const BlogForm = ({ addBlog }) => {
  BlogForm.prototype = {
    addBlog: PropTypes.func.isRequired,
  };
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

  const handleBlogChange = (e) => {
    const target = e.target;
    setNewBlog((preState) => ({ ...preState, [target.name]: target.value }));
  };

  const handleAddBlog = (event) => {
    event.preventDefault();
    addBlog(newBlog);
    setNewBlog({
      author: "",
      title: "",
      url: "",
    });
  };
  return (
    <form
      onSubmit={handleAddBlog}
      style={{
        display: "flex",
        gap: 10,
      }}
    >
      <Box>
        <TextField
          label="title:"
          variant="filled"
          value={newBlog.title}
          name="title"
          data-testid="titleTest"
          id="title"
          onChange={handleBlogChange}
        />
      </Box>
      <Box>
        <TextField
          label="author:"
          variant="filled"
          value={newBlog.author}
          name="author"
          data-testid="authorTest"
          id="author"
          onChange={handleBlogChange}
        />
      </Box>
      <Box>
        <TextField
          label="url:"
          variant="filled"
          value={newBlog.url}
          name="url"
          data-testid="urlTest"
          id="url"
          onChange={handleBlogChange}
        />
      </Box>
      <Button type="submit" color="primary" id="Button-create">
        create
      </Button>
    </form>
  );
};
