const Filter = ({ valueFilter, handleFilterOnChange }) => (
  <div>
    filter shown with
    <input value={valueFilter} onChange={handleFilterOnChange} />
  </div>
);

export default Filter;
