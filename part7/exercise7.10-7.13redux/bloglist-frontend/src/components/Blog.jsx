import { useState } from "react";
import PropTypes from "prop-types";
import { removeBlog, updateBlog } from "../reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";
import { useMatch } from "react-router-dom";

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
  const match = useMatch("/blogs/:id");
  const blog = blogs.find((blog) => blog.id === match.params.id);

  if (!blog) {
    return null;
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <div>
        <a href={blog.url} target="_blank" rel="noreferrer">
          {blog.url}
        </a>
      </div>
      <div>
        {blog.likes} Likes
        <button id="button-blog-likes" onClick={handleAddLike}>
          like
        </button>
      </div>
      <div>added by {blog.author}</div>
      {/* <button onClick={handleDeleteBlog}>remove</button> */}
      <h3>comments</h3>
      <form>
        <input type="text" /> <button>add comment</button>
      </form>
      <ul>
        <li>comment 1</li>
        <li>comment 2</li>
      </ul>
    </div>
  );
};

export default Blog;
