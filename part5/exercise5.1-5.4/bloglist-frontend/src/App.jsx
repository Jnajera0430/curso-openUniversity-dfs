import "./index.css";
import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { LoginForm } from "./components/LoginForm";
import Notification from "./components/Notification";
import { BlogForm } from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [typeMessage, setTypeMessage] = useState("success");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

  const addBlog = (event) => {
    event.preventDefault();

    blogService.create(newBlog).then((blogCreated) => {
      setBlogs(blogs.concat(blogCreated));
      setNewBlog({ title: "", author: "", url: "" });
      setTypeMessage("success");
      setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    });
  };

  const handleBlogChange = (e) => {
    const target = e.target;
    setNewBlog((preState) => ({ ...preState, [target.name]: target.value }));
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
  }, []);

  return (
    <div>
      <Notification message={message} type={typeMessage} />
      {user === null ? (
        <>
          <h2>log in to application</h2>
          <LoginForm
            handleLogin={handleLogin}
            password={password}
            setPassword={setPassword}
            username={username}
            setUsername={setUsername}
          />
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
          <BlogForm
            addBlog={addBlog}
            newBlog={newBlog}
            handleBlogChange={handleBlogChange}
          />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
