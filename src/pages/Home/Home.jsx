import React from 'react'
import { GameIcon, GameIconButton, GamesContainer, GameTitle } from './Home.styles'

export const Home = () => {
  return (
    <GamesContainer>
      <GameIconButton
        onClick={() => {
          window.location.href = `${window.location.origin}/dragon-tiger`
        }}
      >
        <GameIcon
          src='game-icon/dragon-tiger-logo.png'
          alt='dragon_tiger_icon'
        />
        <GameTitle>Dragon Tiger</GameTitle>
      </GameIconButton>

      <GameIconButton
        onClick={() => {
          window.location.href = `${window.location.origin}/roulette`
        }}
      >
        <GameIcon src='game-icon/roulette-logo.png' alt='roulette_icon' />
        <GameTitle>Roulette</GameTitle>
      </GameIconButton>

      <GameIconButton
        onClick={() => {
          window.location.href = `${window.location.origin}/sicbo`
        }}
      >
        <GameIcon src='game-icon/sicbo-logo.png' alt='roulette_icon' />
        <GameTitle>SicBo</GameTitle>
      </GameIconButton>
    </GamesContainer>
  )
}
