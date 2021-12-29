import styled from '@emotion/styled'
import React from 'react'

export const RouletteBlock = ({
  contentValue,
  blockColor,
  singleBetPlaceFunction,
  twelveNumberBetFunction,
  placeBetCoin
}) => {
  const onClickHandler = (type) => {
    console.log(type)
  }

  return (
    <>
      {/* top border */}
      <DivBlockContainer>
        <CornerBorderDiv onClick={() => onClickHandler('Top left corner')} />
        <TopAndBottomBorderDiv onClick={() => onClickHandler('Top border')} />
        <CornerBorderDiv onClick={() => onClickHandler('Top right corner')} />
      </DivBlockContainer>
      {/** Center content with border */}
      <DivBlockContainer>
        <SideBorderDiv onClick={() => onClickHandler('Left border')} />
        <InfoContainer onClick={singleBetPlaceFunction} blockColor={blockColor}>
          <div>
            {contentValue}
            {placeBetCoin}
          </div>
        </InfoContainer>
        <SideBorderDiv onClick={() => onClickHandler('Right border')} />
      </DivBlockContainer>
      {/* bottom border */}
      <DivBlockContainer>
        <CornerBorderDiv onClick={() => onClickHandler('Bottom left corner')} />
        <TopAndBottomBorderDiv onClick={() => onClickHandler('Bottom border')} />
        <CornerBorderDiv onClick={() => onClickHandler('Bottom right corner')} />
      </DivBlockContainer>
    </>
  )
}

const CornerBorderDiv = styled.div({
  backgroundColor: '#ffffff',
  height: '3px',
  width: '5px',
  cursor: 'pointer'
})

const TopAndBottomBorderDiv = styled.div({
  backgroundColor: '#ffffff',
  height: '3px',
  width: '96%',
  cursor: 'pointer'
})

const SideBorderDiv = styled.div({
  backgroundColor: '#ffffff',
  height: '60px',
  width: '3px',
  cursor: 'pointer'
})

const DivBlockContainer = styled.div({
  display: 'flex'
})

const InfoContainer = styled.div(({ blockColor }) => ({
  width: '96%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  backgroundColor: blockColor,
  color: 'white'
}))
