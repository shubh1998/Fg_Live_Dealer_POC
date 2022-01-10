import styled from '@emotion/styled'

export const GamesContainer = styled.div({
  display: 'flex',
  padding: '1%',
  justifyContent: 'space-between',
  maxWidth: 700
})

export const GameIcon = styled.img({
  width: '200px',
  height: '150px',
  display: 'block'
})

export const GameTitle = styled.span({
  fontWeight: 'bold',
  fontSize: 15,
  display: 'block',
  border: '1px solid black',
  textAlign: 'center'
})

export const GameIconButton = styled.button({
  margin: 20,
  padding: 0,
  display: 'grid',
  height: '185px'
})

export const UserInputDiv = styled.div({
  padding: '1%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '25%'
})
