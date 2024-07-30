import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  addCommentForBlog,
  initialzeBlogs,
  removeBlog,
  updateBlog,
} from "../reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";
import { useMatch } from "react-router-dom";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";

const Blog = () => {
  // const blogPropTypes = {
  //   title: PropTypes.string.isRequired,
  //   author: PropTypes.string.isRequired,
  //   url: PropTypes.string.isRequired,
  //   likes: PropTypes.number.isRequired,
  //   user: PropTypes.shape({
  //     username: PropTypes.string.isRequired,
  //     name: PropTypes.string.isRequired,
  //     id: PropTypes.string.isRequired,
  //   }).isRequired,
  // };

  // Blog.propTypes = {
  // blog: PropTypes.shape(blogPropTypes).isRequired,
  // updateBlog: PropTypes.func.isRequired,
  // deleteBlog: PropTypes.func.isRequired,
  // };
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const handleAddLike = () => {
    const blogToUpdate = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    };
    dispatch(updateBlog(blogToUpdate, blog.id));
  };

  const handleDeleteBlog = (event) => {
    event.preventDefault();
    const validDelete = confirm(`Remove blog ${blog.title} by ${blog.author}`);
    if (validDelete) {
      dispatch(removeBlog(blog.id));
    }
  };

  const handleSubmitAddComments = (e) => {
    e.preventDefault();
    dispatch(addCommentForBlog(blog.id, comment));
    setComment("");
  };

  const match = useMatch("/blogs/:id");
  const blog = blogs.find((blog) => blog.id === match.params.id);

  if (!blog) {
    return null;
  }
  return (
    <Box>
      <h2>{blog.title}</h2>
      <Box>
        <a
          href={blog.url}
          target="_blank"
          rel="noreferrer"
          style={{
            listStyle: "none",
            textDecoration: "none",
          }}
        >
          {blog.url}
        </a>
      </Box>
      <Box>
        {blog.likes} Likes
        <Button id="button-blog-likes" onClick={handleAddLike}>
          like
        </Button>
      </Box>
      <Box>
        {" "}
        <p style={{ color: "#19a4e6" }}>added by {blog.author}</p>
      </Box>
      {/* <button onClick={handleDeleteBlog}>remove</button> */}
      <h3>comments</h3>
      <form
        onSubmit={handleSubmitAddComments}
        style={{
          display: "flex",
          gap: 2,
          alignItems: "center",
        }}
      >
        <TextField
          label="comment:"
          variant="filled"
          data-testid="authorTest"
          type="text"
          value={comment}
          onChange={(e) => {
            const newComment = e.target.value;
            setComment(newComment);
          }}
        />
        <Button>add comment</Button>
      </form>
      <List>
        {blog.comments.map((comment) => (
          <ListItem key={comment.id}>
            <ListItemText>{comment.description}</ListItemText>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Blog;
