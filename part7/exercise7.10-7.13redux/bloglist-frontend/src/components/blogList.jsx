import { useDispatch, useSelector } from "react-redux";
import { BlogForm } from "./BlogForm";
import Togglable from "./Toggable";
import { useEffect, useRef } from "react";
import {
  createBlog,
  initialzeBlogs,
  removeBlog,
  updateBlog,
} from "../reducers/blogReducer";
import Blog from "./Blog";
import { Link } from "react-router-dom";

const BlogList = () => {
  const refBlog = useRef();
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();
  const userLogged = useSelector((state) => state.userLogged);

  const addBlog = (newBlog) => {
    refBlog.current.toggleVisibility();
    dispatch(createBlog(newBlog));
  };

  useEffect(() => {
    if (userLogged) {
      dispatch(initialzeBlogs());
    }
  }, [userLogged, dispatch]);

  return (
    <div>
      <Togglable buttonLabel="new blog" ref={refBlog}>
        <BlogForm addBlog={addBlog} />
      </Togglable>
      {[...blogs]
        .sort((blogA, blogB) => blogB.likes - blogA.likes)
        .map((blog) => (
          <div key={blog.id} className="cardBlog">
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </div>
          // <Blog
          //   key={blog.id}
          //   blog={blog}
          //   updateBlog={handleUpdateBlog}
          //   deleteBlog={handleDeleteBlog}
          // />
        ))}
    </div>
  );
};

export default BlogList;
