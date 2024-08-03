/* eslint-disable react/prop-types */
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";
import Select from "react-select";

const SetBornAuthorForm = ({ authors = [] }) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [changeEvent] = useMutation(EDIT_AUTHOR);

  const handleEditNumber = (e) => {
    e.preventDefault();
    changeEvent({
      variables: { name, born: parseInt(born) },
      refetchQueries: [ALL_AUTHORS],
    });
    setName("");
    setBorn("");
  };
  return (
    <form onSubmit={handleEditNumber}>
      <div>
        <Select
          defaultValue={name}
          onChange={(e) => {
            setName(e["value"]);
          }}
          options={authors.map((author) => ({
            value: author.name,
            label: author.name,
          }))}
        />
      </div>
      <div>
        <label htmlFor="">born</label>
        <input
          type="number"
          value={born}
          onChange={(e) => setBorn(e.target.value)}
        />
      </div>
      <button>update author</button>
    </form>
  );
};

export default SetBornAuthorForm;
