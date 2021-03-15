import React from 'react';
import '../App.css';


const Search = ({name, onChange, onSubmit, value }) =>
<form onSubmit={onSubmit}>
  <input
    name={name}
    type="text"
    value={value}
    onChange={onChange}
  />
  <button
    type="submit"
    className="SearchButton">
    Search
  </button>
</form>

export default Search