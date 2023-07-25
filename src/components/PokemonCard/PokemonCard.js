import React from 'react'
import './PokemonCard.scss'
import { Link } from "react-router-dom"

const PokemonCard = ({ name, id }) => (
  <Link to={`/pokemon/${id}`}>
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
  </Link>
)

export default PokemonCard