import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import PokemonCard from '../PokemonCard/PokemonCard'
import usePokemonSearch from "../../hooks/usePokemonSearch"
import SearchBar from "../SearchBar/SearchBar"
import '../PokemonList/PokemonList.scss'

const PokemonTypeList = () => {
  const { type } = useParams()
  const [ typesList, setTypesList ] = useState([])
  const { searchQuery, filteredPokemon, handleSearchChange } = usePokemonSearch(0, type)

  useEffect(() => {
    const fetchPokemonByType = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`)
        const data = response.data
        setTypesList(data.pokemon.map((pokemon) => ({
          name: pokemon.pokemon.name,
          id: pokemon.pokemon.url.split('/')[ 6 ]
        })))
      } catch (error) {
        console.error(error)
      }
    }

    fetchPokemonByType()
  }, [ type ])

  if (!typesList) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <SearchBar value={searchQuery} onChange={handleSearchChange} />
      <div className="PokemonList">
        {filteredPokemon.map((pokemon) => (
          <PokemonCard key={pokemon.name} name={pokemon.name} id={pokemon.id} />
        ))}
      </div>
    </div>
  )
}

export default PokemonTypeList
