import styled from '@emotion/styled'
import React from 'react'

export const RootContainer = ({ children }) => {
  return (
    <Root>
      <Container>{children}</Container>
    </Root>
  )
}

const Root = styled.div({
  textAlign: '-webkit-center'
})

const Container = styled.div({
  width: 'fit-content',
  margin: '50px 50px 20px 50px',
  border: '4px solid black',
  padding: '10px'
})
