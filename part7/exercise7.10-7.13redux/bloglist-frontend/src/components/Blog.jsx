import { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const blogPropTypes = {
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
  };

  Blog.propTypes = {
    blog: PropTypes.shape(blogPropTypes).isRequired,
    updateBlog: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired,
  };

  const [isView, setIsView] = useState(false);
  const handleViewBlog = () => setIsView(!isView);
  const handleAddLike = () => {
    const blogToUpdate = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    };
    updateBlog(blogToUpdate, blog.id);
  };

  const handleDeleteBlog = (event) => {
    event.preventDefault();
    const validDelete = confirm(`Remove blog ${blog.title} by ${blog.author}`);
    if (validDelete) {
      deleteBlog(blog.id);
    }
  };
  const showWhenVisible = { display: isView ? "" : "none" };
  return (
    <div className="cardBlog">
      {blog.title} {blog.author}{" "}
      <button onClick={handleViewBlog} id="button-view-blog">
        {isView ? "hide" : "view"}
      </button>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>
          Likes {blog.likes}{" "}
          <button id="button-blog-likes" onClick={handleAddLike}>
            like
          </button>
        </div>
        <div>{blog.user.name}</div>
        <button onClick={handleDeleteBlog}>remove</button>
      </div>
    </div>
  );
};

export default Blog;
