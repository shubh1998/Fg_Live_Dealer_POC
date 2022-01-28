import styled from '@emotion/styled'
import React from 'react'

export const RootContainer = ({ children, color, borderColor, timerActive = false }) => {
  return (
    <Root timerActive={timerActive}>
      <Container color={color} borderColor={borderColor} timerActive={timerActive}>{children}</Container>
    </Root>
  )
}

const Root = styled.div(({ color, borderColor, timerActive }) => ({
  textAlign: '-webkit-center',
  ...(timerActive
    ? {
        perspective: '950px',
        transform: 'translateY(100px)'
      }
    : {})
}))

const Container = styled.div(({ color, borderColor, timerActive }) => ({
  width: 'fit-content',
  margin: '50px 50px 20px 50px',
  border: `5px solid ${borderColor}`,
  padding: '10px',
  backgroundColor: color,
  transition: 'transform 1s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
  ...(timerActive
    ? {
        transform: 'rotateX(60deg)',
        opacity: 0.5
      }
    : {})
}))
