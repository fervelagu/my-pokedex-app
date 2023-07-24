import React, { useEffect, useState, useMemo } from 'react'
import axios from 'axios'
import '../PokemonList/PokemonList.scss'
import PokemonCard from '../PokemonCard/PokemonCard'

const PokemonList = () => {
  const [ pokemonData, setPokemonData ] = useState([])
  const [ offset, setOffset ] = useState(0)
  const [ searchQuery, setSearchQuery ] = useState('')

  useEffect(() => {
    const limit = 20
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}&${getSearchParams()}`)
      .then((response) => {
        const results = response.data.results
        const pokemonPromises = results.map((pokemon) => {
          return axios.get(pokemon.url).then((response) => response.data)
        })

        Promise.all(pokemonPromises)
          .then((pokemonDetails) => {
            setPokemonData(pokemonDetails)
          })
          .catch((error) => {
            console.error('Oops, something went wrong :(', error)
          })
      })
      .catch((error) => {
        console.error('Oops, something went wrong :(', error)
      })
  }, [ offset, searchQuery ])

  const handlePrevPage = () => {
    setOffset((prevOffset) => prevOffset - 20)
  }

  const handleNextPage = () => {
    setOffset((prevOffset) => prevOffset + 20)
  }

  const getSearchParams = () => {
    if (!searchQuery) return ''
    const lowercaseQuery = searchQuery.toLowerCase()
    if (!isNaN(searchQuery)) {
      // If search query is a number, search by Pokemon number
      return `&id=${searchQuery}`
    } else {
      // Otherwise, search by name or type
      return `&q=${lowercaseQuery}`
    }
  }

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
  }

  const filteredPokemon = useMemo(() => {
    return pokemonData.filter((pokemon) => {
      const lowercaseName = pokemon.name.toLowerCase()
      const lowercaseType = pokemon.types.map((type) => type.type.name.toLowerCase())
      const lowercaseQuery = searchQuery.toLowerCase()
      return (
        lowercaseName.includes(lowercaseQuery) ||
        lowercaseType.includes(lowercaseQuery) ||
        pokemon.id === parseInt(searchQuery, 10)
      )
    })
  }, [ pokemonData, searchQuery ])

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search Pokemons by name, number or tpye"
      />
      {filteredPokemon.map((pokemon) => (
        <PokemonCard key={pokemon.name} name={pokemon.name} id={pokemon.id} />
      ))}
      <button onClick={handlePrevPage} disabled={offset === 0}>
        Previous Page
      </button>
      <button onClick={handleNextPage}>Next Page</button>
    </div>
  );
};

export default PokemonList
