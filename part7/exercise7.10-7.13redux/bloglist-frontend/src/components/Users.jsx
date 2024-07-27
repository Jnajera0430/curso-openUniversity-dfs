import React, { useEffect } from "react";
import { initialUsers } from "../reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Users = () => {
  const dispatch = useDispatch();
  const userLogged = useSelector((state) => state.userLogged);
  const users = useSelector((state) => state.users);

  useEffect(() => {
    if (userLogged) {
      dispatch(initialUsers());
    }
  }, [userLogged, dispatch]);

  return (
    <div>
      <h2>Users</h2>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
