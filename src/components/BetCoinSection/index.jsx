import styled from '@emotion/styled'
import React from 'react'

export const BetCoinSection = ({ casinoTokens, handleUndo, isBetActive, handleSelectedBetCoin, handleDouble, disableUndo, disableDouble, selectedBetCoin, isShowRepeat, handleRepeat }) => {
  return (
    <OptionsContainer>
      <BettingAmountOptions className='casino-coin'>
        <button onClick={handleUndo} disabled={disableUndo}>
          Undo
        </button>

        {casinoTokens.map((token, index) => (
          <BetCoin
            key={index}
            selectedButton={selectedBetCoin === token}
            onClick={() => handleSelectedBetCoin(token)}
            disabled={!isBetActive}
          >
            {token}
          </BetCoin>
        ))}
        <button onClick={isShowRepeat ? handleRepeat : handleDouble} disabled={isShowRepeat ? false : disableDouble}>
          {isShowRepeat ? 'Repeat' : 'Double'}
        </button>
      </BettingAmountOptions>
    </OptionsContainer>
  )
}

const BettingAmountOptions = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  width: 400,
  margin: 'auto'
})

const BetCoin = styled.button(({ selectedButton }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: selectedButton ? '2px solid black' : 'none',
  fontWeight: 800,
  cursor: 'pointer',
  color: 'black',
  backgroundColor: '#ebeb34',
  width: '30px',
  height: '30px',
  borderRadius: '50%'
}))

const OptionsContainer = styled.div({
  border: '1px solid black',
  padding: '2%',
  width: 'fit-content',
  margin: '20px auto'
})
