const PersonForm = ({
  newName,
  newNumberPhone,
  handleAddPerson,
  handlePersonOnChange,
  handlePersonNumberOnChange,
}) => (
  <form onSubmit={handleAddPerson}>
    <div>
      name: <input value={newName} onChange={handlePersonOnChange} />
    </div>
    <div>
      number:{" "}
      <input value={newNumberPhone} onChange={handlePersonNumberOnChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

export default PersonForm;
