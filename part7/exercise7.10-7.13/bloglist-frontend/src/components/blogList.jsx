import { useDispatch, useSelector } from "react-redux";
import { BlogForm } from "./BlogForm";
import Togglable from "./Toggable";
import { useRef } from "react";
import { createBlog, removeBlog, updateBlog } from "../reducers/blogReducer";
import Blog from "./Blog";

const BlogList = ({ user }) => {
  const refBlog = useRef();
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  const addBlog = (newBlog) => {
    refBlog.current.toggleVisibility();
    dispatch(createBlog(newBlog));
  };

  const handleUpdateBlog = (blogToUpdate, id) => {
    dispatch(updateBlog(blogToUpdate, id));
  };

  const handleDeleteBlog = (id) => {
    dispatch(removeBlog(id));
  };

  return (
    <div>
      <h2>blogs</h2>
      <div>
        <p>
          {user.name} logged-in
          <button
            onClick={(e) => {
              e.preventDefault();
              window.localStorage.removeItem("loggedBlogappUser");
              window.location.reload();
            }}
          >
            logout
          </button>
        </p>
      </div>
      <Togglable buttonLabel="new blog" ref={refBlog}>
        <BlogForm addBlog={addBlog} />
      </Togglable>
      {[...blogs]
        .sort((blogA, blogB) => blogB.likes - blogA.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={handleUpdateBlog}
            deleteBlog={handleDeleteBlog}
          />
        ))}
    </div>
  );
};

export default BlogList;
