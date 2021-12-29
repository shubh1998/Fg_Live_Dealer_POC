import styled from '@emotion/styled'

export const Root = styled.div({
  textAlign: '-webkit-center'
})

export const GameContainer = styled.div({
  width: 1500,
  margin: '50px 50px 20px 50px',
  border: '4px solid black',
  padding: '10px'
})

export const PentagonBlock = styled.div(({ hover }) => ({
  width: '120px',
  height: '190px',
  background: 'green',
  '-webkit-clip-path': 'polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%)',
  'clip-path': 'polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%)',
  transform: 'rotate(180deg)',
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
  cursor: 'pointer',
  boxShadow: hover ? 'inset 0 0 100px 100px rgba(255, 255, 255, 0.4)' : 'none',
  '&:hover': {
    boxShadow: 'inset 0 0 100px 100px rgba(255, 255, 255, 0.4)'
  }
}))

export const ZeroInfoContainer = styled.div(({ blockColor }) => ({
  color: 'white'
}))

export const InfoContainer = styled.div(({ height }) => ({
  width: '99%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  backgroundColor: '#000000',
  color: 'white',
  height: height || '40px',
  '&:hover': {
    boxShadow: 'inset 0 0 100px 100px rgba(255, 255, 255, 0.4)'
  }
}))

export const BettingAmountOptions = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  width: 400,
  margin: 'auto'
})

export const BetCoin = styled.button(({ selectedButton }) => ({
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

export const OptionsContainer = styled.div({
  border: '1px solid black',
  padding: '2%',
  width: 'fit-content',
  margin: '20px auto'
})

export const PlacedBetCoin = styled.div({
  color: 'blue',
  display: 'flex',
  backgroundColor: '#ebeb34',
  width: '30px',
  height: '30px',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center'
})
