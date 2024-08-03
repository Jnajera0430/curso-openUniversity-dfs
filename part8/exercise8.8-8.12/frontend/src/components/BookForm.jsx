import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK } from "../queries";

const BookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [changeEvent] = useMutation(CREATE_BOOK, {
    refetchQueries: [ALL_BOOKS, ALL_AUTHORS],
  });

  const handleAddBook = (e) => {
    e.preventDefault();
    changeEvent({
      variables: { title, author, published: parseInt(published), genres },
    });
    setAuthor("");
    setGenre("");
    setGenres([]);
    setPublished("");
    setTitle("");
  };
  return (
    <form onSubmit={handleAddBook}>
      <div>
        <label htmlFor="">title</label>
        <input
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
        />
      </div>
      <div>
        <label htmlFor="">author</label>
        <input
          type="text"
          onChange={(e) => {
            setAuthor(e.target.value);
          }}
          value={author}
        />
      </div>
      <div>
        <label htmlFor="">published</label>
        <input
          type="number"
          onChange={(e) => {
            const dataPublished = e.target.value;
            setPublished(dataPublished);
          }}
          value={published}
        />
      </div>
      <div>
        <input
          type="text"
          onChange={(e) => {
            setGenre(e.target.value);
          }}
          value={genre}
        />
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setGenres(genres.concat(genre));
            setGenre("");
          }}
        >
          add genre
        </button>
      </div>
      <div>genres: {genres.join(" - ")}</div>
      <button>create book</button>
    </form>
  );
};

export default BookForm;
