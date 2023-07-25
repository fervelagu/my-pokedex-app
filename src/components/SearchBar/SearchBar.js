import React from 'react'
import './SearchBar.scss'

const SearchBar = ({ value, onChange }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Search Pokemons by name, number, or type"
    />
  )}

  export default SearchBar