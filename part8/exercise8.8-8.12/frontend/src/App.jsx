import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import BookForm from "./components/BookForm";

function App() {
  const [view, setView] = useState("authors");
  return (
    <div>
      <div>
        <button onClick={() => setView("authors")}>authors</button>
        <button onClick={() => setView("books")}>books</button>
        <button onClick={() => setView("addBook")}>add book</button>

        {view === "authors" ? (
          <Authors />
        ) : view === "books" ? (
          <Books />
        ) : (
          <BookForm />
        )}
      </div>
    </div>
  );
}

export default App;
