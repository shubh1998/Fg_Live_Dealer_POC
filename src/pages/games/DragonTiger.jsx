import styled from '@emotion/styled'
import React from 'react'
import { CountDownTimer } from '../../components/CountDownTimer/CountDownTimer'

export const DragonTiger = () => {
  return (
    <Root>
      <iframe src='https://www.youtube.com/embed/cWDJoK8zw58' height={500} width={1000} />
      <TimerDiv>
        <CountDownTimer />
      </TimerDiv>
    </Root>
  )
}

const Root = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
})

const TimerDiv = styled.div({
  position: 'absolute',
  top: 400
})
