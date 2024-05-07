import { useState } from "react";

const Blog = ({ blog, updateBlog, deleteBlog }) => {
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

  return (
    <div className="cardBlog">
      {blog.title} {blog.author}{" "}
      <button onClick={handleViewBlog}>{isView ? "hide" : "view"}</button>
      {isView && (
        <>
          <div>{blog.url}</div>
          <div>
            Likes {blog.likes} <button onClick={handleAddLike}>like</button>
          </div>
          <div>{blog.user.name}</div>
          <button onClick={handleDeleteBlog}>remove</button>
        </>
      )}
    </div>
  );
};

export default Blog;
