import "./index.css";
import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { LoginForm } from "./components/LoginForm";
import Notification from "./components/Notification";
import { BlogForm } from "./components/BlogForm";
import Togglable from "./components/Toggable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [typeMessage, setTypeMessage] = useState("success");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const refBlog = useRef();

  const addBlog = (newBlog) => {
    refBlog.current.toggleVisibility();
    blogService.create(newBlog).then((blogCreated) => {
      setBlogs(blogs.concat(blogCreated));
      setTypeMessage("success");
      setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    });
  };

  const updateBlog = (blogToUpdate, id) => {
    blogService
      .update(blogToUpdate, id)
      .then((updatedBlog) => {
        setBlogs(
          blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
        );
      })
      .catch((exception) => {
        setTypeMessage("error");
        setMessage("An error occurred while trying to update the data.");
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
  };

  const deleteBlog = (id) => {
    blogService
      .deleteOne(id)
      .then(() => setBlogs(blogs.filter((blog) => blog.id !== id)))
      .catch((exception) => {
        setTypeMessage("error");
        setMessage("An error occurred while trying to delete data");
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setTypeMessage("error");
      setMessage("Wrong username or password");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    if (user) {
      blogService.getAll().then((blogs) => setBlogs(blogs));
    }
  }, [user]);

  return (
    <div>
      <Notification message={message} type={typeMessage} />
      {user === null ? (
        <>
          <h2>log in to application</h2>
          <Togglable buttonLabel="login">
            <LoginForm
              handleLogin={handleLogin}
              password={password}
              setPassword={setPassword}
              username={username}
              setUsername={setUsername}
            />
          </Togglable>
        </>
      ) : (
        <>
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
          {blogs
            .sort((blogA, blogB) => blogB.likes - blogA.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                updateBlog={updateBlog}
                deleteBlog={deleteBlog}
              />
            ))}
        </>
      )}
    </div>
  );
};

export default App;
