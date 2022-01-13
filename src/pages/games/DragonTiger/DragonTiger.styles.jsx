import styled from '@emotion/styled'

export const TimerDiv = styled.div({
  margin: '20px auto 0',
  width: 50
})

export const GameIcon = styled.img({
  width: '200px',
  height: '180px'
})

export const BetSideTitle = styled.span({
  fontSize: 20,
  fontWeight: 'bold'
})

export const FlexContainer = styled.div({
  display: 'flex',
  textAlign: 'center',
  margin: '45px'
})

export const HalfContainer = styled.div(({ isTieBet, isBetActive }) => ({
  display: 'grid',
  margin: '20px',
  padding: '15px',
  border: '4px solid white',
  borderRadius: '30px',
  minHeight: '250px',
  color: 'white',
  ':hover': isBetActive
    ? {
        transform: isTieBet ? 'none' : 'scale(1.1)',
        boxShadow: 'white 0px 0px 50px',
        color: isTieBet ? 'white' : 'gold',
        cursor: 'pointer'
      }
    : {}
}))

export const TieContainer = styled.div(({ isBetActive }) => ({
  ':hover': isBetActive
    ? {
        transform: 'scale(1.07)',
        color: 'gold'
      }
    : {}
}))

export const CardBox = styled.div({
  height: 70,
  width: 70,
  border: '1px solid black',
  margin: 'auto'
})
