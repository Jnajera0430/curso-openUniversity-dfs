import "./index.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogList from "./components/blogList";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Togglable from "./components/Toggable";
import { initialzeBlogs } from "./reducers/blogReducer";
import { setUserLogged } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();
  const userLogged = useSelector((state) => state.userLogged);

  useEffect(() => {
    dispatch(setUserLogged);
  }, [dispatch]);

  useEffect(() => {
    if (userLogged) {
      dispatch(initialzeBlogs());
    }
  }, [userLogged, dispatch]);

  return (
    <div>
      <Notification />
      {userLogged === null ? (
        <>
          <h2>log in to application</h2>
          <Togglable buttonLabel="login">
            <LoginForm />
          </Togglable>
        </>
      ) : (
        <>
          <BlogList user={userLogged} />
        </>
      )}
    </div>
  );
};

export default App;
