import { useLazyQuery, useQuery } from "@apollo/client";
import { ALL_BOOKS, GET_USER } from "../queries";
import { useEffect, useState } from "react";

const Recommend = () => {
  const resultUser = useQuery(GET_USER);
  const [getBooks, resultBooks] = useLazyQuery(ALL_BOOKS);
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (resultBooks.data) {
      setBooks(resultBooks.data.allBooks);
    }
  }, [resultBooks]);

  useEffect(() => {
    if (resultUser.data) {
      getBooks({
        variables: {
          genre: resultUser.data.me.favoriteGenre,
        },
      });
      setUser(resultUser.data.me);
    }
  }, [getBooks, resultUser]);

  if (resultUser.loading) {
    return <div>loading user...</div>;
  }

  if (resultUser.error || !resultUser.data.me) {
    return <div>Error fetching user data</div>;
  }

  return (
    <div>
      <h1>Recommendatios</h1>

      <p>
        books in your favorite genre <b>{user?.favoriteGenre}</b>
      </p>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommend;
