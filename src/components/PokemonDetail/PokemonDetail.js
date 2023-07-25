import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from "axios"
import './PokemonDetail.scss'

const PokemonDetail = () => {
  const { pokemonId } = useParams()
  const [ pokemonDetails, setPokemonDetails ] = useState(null)

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        const data = response.data;
        setPokemonDetails({
          name: data.name,
          number: data.id,
          normalFrontSprite: data.sprites.front_default,
          shinyFrontSprite: data.sprites.front_shiny,
          types: data.types.map((type) => type.type.name),
          stats: {
            Speed: data.stats[ 5 ].base_stat,
            Attack: data.stats[ 1 ].base_stat,
            Defense: data.stats[ 2 ].base_stat,
          },
        })
      } catch (error) {
        console.error(error)
      }
    }

    fetchPokemonDetails()
  }, [ pokemonId ])

  if (!pokemonDetails) {
    return <div>Loading...</div>
  }

  const { name, number, normalFrontSprite, shinyFrontSprite, types, stats } = pokemonDetails

  return (
    <div>
      <h2>{name}</h2>
      <p>Number: {number}</p>
      <img src={normalFrontSprite} alt={name} />
      <img src={shinyFrontSprite} alt={`${name} (Shiny)`} />
      <p>Types:</p>
      <ul>
        {types.map((type) => (
          <li key={type} className={`type-${type}`}>
            <Link to={`/pokemon/type/${type}`} className={`type-badge type-${type}`}>{type}</Link>
          </li>
        ))}
      </ul>
      <p>Stats:</p>
      <ul>
        {Object.entries(stats).map(([ statName, statValue ]) => (
          <li key={statName}>
            {statName}: {statValue}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PokemonDetail
