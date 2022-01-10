import styled from '@emotion/styled'

export const Item = styled.div(({ height, width, margin, showWin }) => ({
  textAlign: 'center',
  border: '3px solid gray',
  backgroundColor: showWin ? 'green' : 'wheat',
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

export const TimerDiv = styled.div({
  margin: '20px auto 0',
  width: 50
})

export const Dice = styled.div({
  border: '3px solid black',
  margin: 10,
  padding: '10px 15px',
  borderRadius: 10,
  color: 'white',
  background: 'brown'
})
