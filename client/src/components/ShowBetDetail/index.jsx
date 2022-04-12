import React from 'react'
import styled from '@emotion/styled'

export const ShowBetDetail = ({ title, betValue, payout }) => {
  return (
    <InnerItem>
      {betValue && (
        <PlacedBetCoin>
          {betValue}
        </PlacedBetCoin>)}
      {title}
      <div>{payout && payout}</div>
    </InnerItem>

  )
}

const InnerItem = styled.div({
  display: 'block'
})

const PlacedBetCoin = styled.div({
  color: 'blue',
  display: 'flex',
  backgroundColor: '#ebeb34',
  width: '30px',
  height: '30px',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  margin: 'auto'
})
