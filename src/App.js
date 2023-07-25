import React from 'react'
import { Route, Routes } from "react-router-dom"
import './App.scss'
import PokemonList from "./components/PokemonList/PokemonList"
import PokemonDetail from "./components/PokemonDetail/PokemonDetail"
import PokemonTypeList from "./components/PokemonTypeList/PokemonTypeList"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<PokemonList />} />
        <Route path="/pokemon/:pokemonId" element={<PokemonDetail />} />
        <Route path="/pokemon/type/:type" element={<PokemonTypeList />} />
      </Routes>
    </div>
  )
}

export default App
