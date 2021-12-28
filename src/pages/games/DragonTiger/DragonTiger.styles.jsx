import styled from '@emotion/styled'

export const Root = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
})

export const GameContainer = styled.div({
  height: 500,
  width: 650,
  margin: 50,
  border: '4px solid black'
})

export const TimerDiv = styled.div({
  margin: '20px auto 0',
  width: 50
})

export const GameIcon = styled.img({
  width: '200px',
  height: '150px'
})

export const BetSideTitle = styled.span({
  fontSize: 20,
  fontWeight: 'bold'
})

export const FlexContainer = styled.div({
  display: 'flex',
  textAlign: 'center'
})

export const HalfContainer = styled.div({
  display: 'grid',
  margin: '50px auto',
  border: '2px solid black'
})

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
  border: selectedButton ? '2px solid black' : 'none'
}))
