import styled from '@emotion/styled'
import { keyframes } from '@mui/material'
import React, { memo } from 'react'

export const BetCoinSection = memo(({ casinoTokens, handleUndo, isBetActive, handleSelectedBetCoin, handleDouble, disableUndo, disableDouble, selectedBetCoin, isShowRepeat, handleRepeat }) => {
  return (
    <OptionsContainer>
      <BettingAmountOptions className='casino-coin'>
        <button onClick={handleUndo} disabled={disableUndo}>
          Undo
        </button>

        {casinoTokens.map((token, index) => (
          <BetSpinner
            key={index}
            isBetActive={isBetActive}
            selectedButton={selectedBetCoin === token}
            onClick={() => handleSelectedBetCoin(token)}
          >
            <Chip src='game-icon/chips.svg' alt='' />
            <ChipCousin leftValueGreater={token < 100}> {token} </ChipCousin>
          </BetSpinner>
        ))}
        <button onClick={isShowRepeat ? handleRepeat : handleDouble} disabled={isShowRepeat ? false : disableDouble}>
          {isShowRepeat ? 'Repeat' : 'Double'}
        </button>
      </BettingAmountOptions>
    </OptionsContainer>
  )
})

const BettingAmountOptions = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  width: 400,
  margin: 'auto'
})

const rotate = keyframes`
  from {
  transform: rotate(0deg) scale(1.3);
}
  to {
  transform: rotate(360deg) scale(1.3);
}
  `
const BetSpinner = styled.div(({ selectedButton, isBetActive }) => ({
  animation: (selectedButton && isBetActive) ? `${rotate} 2s linear infinite` : 'none',
  ':hover': {
    animation: (isBetActive) ? `${rotate} 2s linear infinite` : 'none',
    cursor: 'pointer'
  }
}))

const ChipCousin = styled.div({
  transform: 'translateY(-25px)',
  fontSize: '9px',
  fontWeight: 'bold',
  color: 'white'
})

const Chip = styled.img({
  width: '30px',
  border: '1px solid white',
  marginTop: 10,
  borderRadius: '50%',
  height: '30px'
})

const OptionsContainer = styled.div({
  border: '3px solid black',
  padding: '2%',
  borderRadius: '19px',
  width: 'fit-content',
  margin: '20px auto'
})
