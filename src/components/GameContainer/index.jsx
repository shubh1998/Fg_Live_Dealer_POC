import styled from '@emotion/styled'
import React from 'react'

export const RootContainer = ({ children, color, borderColor }) => {
  return (
    <Root>
      <Container color={color} borderColor={borderColor}>{children}</Container>
    </Root>
  )
}

const Root = styled.div({
  textAlign: '-webkit-center'
})

const Container = styled.div(({ color, borderColor }) => ({
  width: 'fit-content',
  margin: '50px 50px 20px 50px',
  border: `5px solid ${borderColor}`,
  padding: '10px',
  backgroundColor: color
}))
