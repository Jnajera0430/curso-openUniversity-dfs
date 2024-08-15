import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import { listGenresFilters } from "../helper";
import { Fragment, useState } from "react";

const Books = () => {
  const [genreSelect, setGenreSelect] = useState({
    label: "all genres",
    code: "allgenres",
  });

  const result = useQuery(ALL_BOOKS, {
    variables: {
      genre: genreSelect.code === "allgenres" ? "" : genreSelect.code,
    },
  });

  if (result.loading) {
    return <div>loading...</div>;
  }

  const books = result.data.allBooks;

  return (
    <div>
      <h2>Books</h2>
      <p>
        in genre <b>{genreSelect.label}</b>
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
      <div>
        {listGenresFilters.map((genre) => {
          const style =
            genreSelect.code === genre.code
              ? {
                  border: "1px solid blue",
                }
              : null;
          return (
            <Fragment key={genre.code}>
              <button style={style} onClick={() => setGenreSelect(genre)}>
                {genre.label}
              </button>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Books;
