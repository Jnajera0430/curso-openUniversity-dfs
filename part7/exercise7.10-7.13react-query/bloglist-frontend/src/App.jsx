import "./index.css";
import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { LoginForm } from "./components/LoginForm";
import Notification from "./components/Notification";
import { BlogForm } from "./components/BlogForm";
import Togglable from "./components/Toggable";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNotificationDispatch } from "./api/helpers/helpNotifications";
import {
  useUserLoggedDispatch,
  useUserloggedValue,
} from "./api/helpers/helpUserLogged";

const App = () => {
  const queryClient = useQueryClient();
  const dispatchNotification = useNotificationDispatch();
  const dispatchUserLogged = useUserLoggedDispatch();
  // const [blogs, setBlogs] = useState([]);
  // const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const user = useUserloggedValue();
  const refBlog = useRef();
  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(["blogs"], blogs.concat(newBlog));
    },
  });
  const addBlog = (newBlog) => {
    refBlog.current.toggleVisibility();
    newBlogMutation.mutate(newBlog);
    dispatchNotification({
      type: "ADD",
      payload: {
        type: "success",
        message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
      },
    });
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatchUserLogged({ type: "LOGIN", payload: user });
      blogService.setToken(user.token);
    }
  }, [dispatchUserLogged]);
  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
    retry: 1,
    enabled: !!user,
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return <span>Blogs service not available due to problems in server</span>;
  }

  const blogs = result.data ?? [];
  return (
    <div>
      <Notification />
      {user === null ? (
        <>
          <h2>log in to application</h2>
          <Togglable buttonLabel="login">
            <LoginForm
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
                  dispatchUserLogged({ type: "LOGOUT", payload: null });
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
              <Blog key={blog.id} blog={blog} />
            ))}
        </>
      )}
    </div>
  );
};

export default App;
