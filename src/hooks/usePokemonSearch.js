import { useEffect, useState, useMemo } from 'react'
import axios from 'axios'

const usePokemonSearch = (initialOffset = 0, initialSearchQuery = '') => {
  const [pokemonData, setPokemonData] = useState([])
  const [offset, setOffset] = useState(initialOffset)
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery)

  useEffect(() => {
    const limit = 20
    axios
      .get(
        `https://pokeapi.co/api/v2/pokemon`,
        {
          params: {
            limit,
            offset,
          },
        }
      )
      .then((response) => {
        const results = response.data.results
        const pokemonPromises = results.map((pokemon) =>
          axios.get(pokemon.url).then((response) => response.data)
        )

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
  }, [offset])

  const handlePrevPage = () => {
    setOffset((prevOffset) => prevOffset - 20)
  }

  const handleNextPage = () => {
    setOffset((prevOffset) => prevOffset + 20)
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
  }, [pokemonData, searchQuery])

  return {
    offset,
    searchQuery,
    filteredPokemon,
    handlePrevPage,
    handleNextPage,
    handleSearchChange,
  }
}

export default usePokemonSearch
