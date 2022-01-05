import React from 'react'
import { Link } from 'react-router-dom'
import { GameIcon, GamesContainer, GameTitle } from './Home.styles'

export const Home = () => {
  return (
    <GamesContainer>
      <Link to='/dragon-tiger'>
        <GameIcon
          src='game-icon/dragon-tiger-logo.png'
          alt='dragon_tiger_icon'
        />
        <GameTitle>Dragon Tiger</GameTitle>
      </Link>

      <Link to='/roulette'>
        <GameIcon src='game-icon/roulette-logo.png' alt='roulette_icon' />
        <GameTitle>Roulette</GameTitle>
      </Link>

      <Link to='/sicbo'>
        <GameIcon src='game-icon/sicbo-logo.png' alt='roulette_icon' />
        <GameTitle>SicBo</GameTitle>
      </Link>
    </GamesContainer>
  )
}
