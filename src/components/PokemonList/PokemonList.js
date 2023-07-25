import React from 'react'
import '../PokemonList/PokemonList.scss'
import PokemonCard from '../PokemonCard/PokemonCard'
import usePokemonSearch from "../../hooks/usePokemonSearch"
import SearchBar from "../SearchBar/SearchBar"

const PokemonList = () => {
  const {
    offset,
    searchQuery,
    filteredPokemon,
    handlePrevPage,
    handleNextPage,
    handleSearchChange,
  } = usePokemonSearch()

  return (
    <div>
      <SearchBar value={searchQuery} onChange={handleSearchChange} />
      <div className="PokemonList">
        {filteredPokemon.map((pokemon) => (
          <PokemonCard key={pokemon.name} name={pokemon.name} id={pokemon.id} />
        ))}
      </div>
      <button onClick={handlePrevPage} disabled={offset === 0}>
        Previous Page
      </button>
      <button onClick={handleNextPage}>Next Page</button>
    </div>
  );
};

export default PokemonList
