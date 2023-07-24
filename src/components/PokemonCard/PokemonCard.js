import React from 'react'
import './PokemonCard.scss'

const PokemonCard = ({ name, id }) => (
  <div className="PokemonCard">
    {name}
    <img
      alt='pokemon'
      width="100"
      height="auto"
      className="PokemonImg"
      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
    />
  </div>
)

export default PokemonCard