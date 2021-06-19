import axios from 'axios'
import React, { useState, useEffect } from 'react'
import PokemonList from './PokemonList'
import Pagination from './Pagination'

function App() {
  const [pokemon, setPokemon] = useState(['bulbasaur', 'charmander'])
  const [currentPageURL, setCurrentPageURL] = useState('https://pokeapi.co/api/v2/pokemon/')
  const [nextPageURL, setNextPageURL] = useState()
  const [previousPageURL, setPreviousPageURL] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    let cancel
    axios.get(currentPageURL, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(result => {
      setLoading(false)
      setNextPageURL(result.data.next)
      setPreviousPageURL(result.data.previous)
      setPokemon(result.data.results.map(p => p.name))
    })
    return () => cancel()
  }, [currentPageURL])

  if(loading) return 'Loading...'

  const goToNextPage = () => {
    setCurrentPageURL(nextPageURL)
  }

  const goToPreviousPage = () => {
    setCurrentPageURL(previousPageURL)
  }

  return (
    <>
      <PokemonList pokemon = {pokemon}/>
      <Pagination goToNextPage={nextPageURL ? goToNextPage : null} goToPreviousPage={previousPageURL ? goToPreviousPage : null}/>
    </>
  )
}

export default App
