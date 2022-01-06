import styled from '@emotion/styled'

export const GamesContainer = styled.div({
  display: 'flex',
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
