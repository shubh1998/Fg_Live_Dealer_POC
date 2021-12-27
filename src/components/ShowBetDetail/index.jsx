import React from 'react'
import styled from '@emotion/styled'

export const ShowBetDetail = ({ title, betValue, payout }) => {
  return (
    <InnerItem>
      <p>{title}</p>
      <b>{betValue !== 0 && betValue.toFixed(1).replace(/[.,]0$/, '')}</b>
      <div>{payout && payout}</div>
    </InnerItem>
  )
}

const InnerItem = styled.div({
  display: 'block'
})
