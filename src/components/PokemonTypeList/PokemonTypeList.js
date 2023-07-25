import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
import PokemonCard from "../PokemonCard/PokemonCard"

const PokemonTypeList = () => {
  const { type } = useParams()
  const [ typesList, setTypesList ] = useState([])

  useEffect(() => {
    const fetchPokemonByType = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`)
        const data = response.data
        setTypesList(data.pokemon.map((pokemon) => pokemon.pokemon))
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
      {typesList.map((pokemon) => (
        <PokemonCard key={pokemon.name} name={pokemon.name} id={pokemon.url.split('/')[ 6 ]} />
      ))}
    </div>
  )
}

export default PokemonTypeList
