import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import BookForm from "./components/BookForm";
import { useApolloClient } from "@apollo/client";
import Notify from "./components/Notify";
import LoginForm from "./components/LoginForm";

function App() {
  const [view, setView] = useState("authors");
  const [token, setToken] = useState(null);
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

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <div>
        <button onClick={() => setView("authors")}>authors</button>
        <button onClick={() => setView("books")}>books</button>
        {token ? (
          <>
            <button onClick={() => setView("addBook")}>add book</button>
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
        ) : (
          <BookForm />
        )}
      </div>
    </div>
  );
}

export default App;
