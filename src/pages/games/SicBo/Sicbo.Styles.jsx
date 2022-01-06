import styled from '@emotion/styled'

export const Item = styled.div(({ height, width, margin }) => ({
  textAlign: 'center',
  border: '3px solid gray',
  backgroundColor: 'wheat',
  justifyContent: 'center',
  width: width || '100%',
  margin: margin || 'auto',
  height: height || 170,
  display: 'flex',
  alignItems: 'center'
}))

export const InnerItem = styled.div({
  display: 'block'
})

export const OptionsContainer = styled.div({
  border: '1px solid black',
  padding: '2%',
  width: 'fit-content',
  margin: '20px auto'
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

export const TimerDiv = styled.div({
  margin: '20px auto 0',
  width: 50
})
