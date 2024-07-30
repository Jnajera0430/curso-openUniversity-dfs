import "./index.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogList from "./components/blogList";
import Notification from "./components/Notification";
import { setUserLogged } from "./reducers/userLoggedReducer";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import { PublicRouter } from "./Routers/PublicRouter";
import MainLayout from "./layout/MainLayout";
import Users from "./components/Users";
import User from "./components/User";
import Blog from "./components/Blog";
import { initialUsers } from "./reducers/userReducer";
import { initialzeBlogs } from "./reducers/blogReducer";

const App = () => {
  const dispatch = useDispatch();
  const userLogged = useSelector((state) => state.userLogged);

  useEffect(() => {
    dispatch(setUserLogged());
  }, [dispatch]);

  useEffect(() => {
    if (userLogged) {
      dispatch(initialUsers());
      dispatch(initialzeBlogs());
    }
  }, [userLogged, dispatch]);

  return (
    <div>
      <Notification />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<BlogList />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
        </Route>
        <Route element={<PublicRouter />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
