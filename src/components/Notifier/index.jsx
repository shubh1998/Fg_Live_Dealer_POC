import styled from '@emotion/styled'
import React from 'react'

export const Notifier = ({ isBetActive }) => {
  return (
    <NotifyText isActive={isBetActive}>
      {isBetActive ? 'Betting time is ACTIVE' : 'Betting time is CLOSE'}
    </NotifyText>
  )
}

const NotifyText = styled.strong(({ isActive }) => ({
  textAlign: 'center',
  display: 'block',
  color: isActive ? 'green' : 'red',
  marginTop: 10
}))
