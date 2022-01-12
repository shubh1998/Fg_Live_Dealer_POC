import styled from '@emotion/styled'

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
  '&:hover': {
    boxShadow: `
          0px 11px 15px -7px rgb(0 0 0 / 30%),
          0px 24px 38px 3px rgb(0 0 0 / 24%),
          0px 9px 46px 8px rgb(0 0 0 / 22%)
      `
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
