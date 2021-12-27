import styled from '@emotion/styled'
import React from 'react'

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
          window.location.href = `${window.location.origin}/dragon-tiger`
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

const GamesContainer = styled.div({
  display: 'flex'
})

const GameIcon = styled.img({
  width: '200px',
  height: '150px'
})

const GameTitle = styled.span({
  fontWeight: 'bold',
  fontSize: 15
})

const GameIconButton = styled.button({
  margin: 20,
  padding: 0,
  display: 'grid',
  height: '185px'
})
