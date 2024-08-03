import { useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "../queries";
import SetBornAuthorForm from "./SetBornAuthorForm";

const Authors = () => {
  const result = useQuery(ALL_AUTHORS);

  if (result.loading) {
    return <div>loading...</div>;
  }
  const authors = result.data.allAuthors ?? [];
  return (
    <div>
      <h2>Authors</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author) => (
            <tr key={author.id}>
              <td>{author.name}</td>
              <td>{author.born}</td>
              <td>{author.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <SetBornAuthorForm authors={authors} />
    </div>
  );
};

export default Authors;
