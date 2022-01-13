import styled from '@emotion/styled'
import { keyframes } from '@mui/material'

const disco = keyframes`
  0% { background-color: green}
  50% { background-color: yellow}
`

export const Item = styled.div(({ height, width, margin, showWin }) => ({
  textAlign: 'center',
  border: '3px solid white',
  backgroundColor: showWin ? 'green' : '#ed4141',
  justifyContent: 'center',
  width: width || '100%',
  margin: margin || 'auto',
  height: height || 170,
  display: 'flex',
  alignItems: 'center',
  borderRadius: '16px',
  color: 'white',
  cursor: 'pointer',
  fontWeight: 800,
  boxShadow: `
        0px 7px 8px -4px rgb(0 0 0 / 20%),
        0px 12px 17px 2px rgb(0 0 0 / 14%),
        0px 5px 22px 4px rgb(0 0 0 / 12%)
      `,
  ...(showWin
    ? {
        animation: `${disco} 1s linear 4`
      }
    : {}),
  '&:hover': {
    boxShadow: 'white 0px 0px 35px',
    transform: 'scale(1.03)'
  }

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
