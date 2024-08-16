import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import BookForm from "./components/BookForm";
import { useApolloClient, useSubscription } from "@apollo/client";
import Notify from "./components/Notify";
import LoginForm from "./components/LoginForm";
import Recommend from "./components/Recommend";
import { ALL_BOOKS, BOOK_ADDED } from "./queries";

const tokenSesion = localStorage.getItem("phonenumbers-user-token");
// eslint-disable-next-line react-refresh/only-export-components
export const updateCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same person twice
  const uniqByName = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.name;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  cache.updateQuery(query, (data) => {
    if (data) {
      return {
        ...data,
        allBooks: uniqByName(data.allBooks.concat(addedBook)),
      };
    } else {
      return {
        allBooks: [addedBook],
      };
    }
  });
};
function App() {
  const [view, setView] = useState("authors");
  const [token, setToken] = useState(tokenSesion ? tokenSesion : null);
  const [errorMessage, setErrorMessage] = useState(null);
  const client = useApolloClient();

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded;
      console.log({ addedBook });

      notify(`${addedBook.title} added`);
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook);
      // updateCacheWith(addedPerson);
    },
  });

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <div>
        <button onClick={() => setView("authors")}>authors</button>
        <button onClick={() => setView("books")}>books</button>
        {token ? (
          <>
            <button onClick={() => setView("addBook")}>add book</button>
            <button onClick={() => setView("recommended")}>recommended</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <>
            <button onClick={() => setView("login")}>Login</button>
          </>
        )}

        {view === "authors" ? (
          <Authors />
        ) : view === "books" ? (
          <Books />
        ) : view === "login" ? (
          <LoginForm
            setToken={setToken}
            setError={notify}
            changeView={setView}
          />
        ) : view === "addBook" ? (
          <BookForm />
        ) : view === "recommended" ? (
          <Recommend />
        ) : null}
      </div>
    </div>
  );
}

export default App;
