import styled from '@emotion/styled'
import React from 'react'

export const RouletteBlock = ({
  contentValue,
  blockColor,
  singleBetPlaceFunction,
  twelveNumberBetFunction,
  placeBetCoin,
  clickWall,
  leftSideHandler,
  twoNumberBetPlaced,
  handleCorner,
  threeOrFourBetPlaced,
  handleBottom,
  twoOrThreeBetPlaced,
  handleSideHover,
  hover,
  handleHoverOut,
  handleCornerHover,
  handleCornerHoverOut,
  handleBottomHover
}) => {
  return (
    <>
      <DivBlockContainer>
        <div style={{ position: 'relative' }}>
          <SideBorderDiv
            onMouseOver={handleSideHover}
            onMouseOut={handleHoverOut}
            onClick={leftSideHandler}
          />
          {
            twoNumberBetPlaced && (
              <PlaceBetCoinContainer>
                <PlacedBetCoin
                  onMouseOver={handleSideHover}
                  onMouseOut={handleHoverOut}
                  onClick={leftSideHandler}
                >
                  {twoNumberBetPlaced}
                </PlacedBetCoin>
              </PlaceBetCoinContainer>
            )
          }
        </div>
        <InfoContainer onClick={singleBetPlaceFunction} blockColor={blockColor} hover={hover}>
          <div>
            {contentValue}
            {placeBetCoin}
          </div>
        </InfoContainer>
      </DivBlockContainer>
      <DivBlockContainer>
        <div style={{ position: 'relative' }}>
          <CornerBorderDiv
            onMouseOver={handleCornerHover}
            onMouseOut={handleHoverOut}
            onClick={handleCorner}
          />
          {
            threeOrFourBetPlaced && (
              <PlaceBetCoinContainer bottom='-12px' top='-12px'>
                <PlacedBetCoin
                  onClick={handleCorner}
                  onMouseOver={handleCornerHover}
                  onMouseOut={handleHoverOut}
                >
                  {threeOrFourBetPlaced}
                </PlacedBetCoin>
              </PlaceBetCoinContainer>
            )
          }
        </div>
        <TopAndBottomBorderDiv
          onClick={handleBottom}
          onMouseOver={handleBottomHover}
          onMouseOut={handleHoverOut}
        >
          {
            twoOrThreeBetPlaced && (
              <PlaceBetCoinContainer left='34%' top='-12px'>
                <PlacedBetCoin
                  onMouseOver={handleBottomHover}
                  onMouseOut={handleHoverOut}
                >
                  {twoOrThreeBetPlaced}
                </PlacedBetCoin>
              </PlaceBetCoinContainer>
            )
          }
        </TopAndBottomBorderDiv>
      </DivBlockContainer>
    </>
  )
}

const CornerBorderDiv = styled.div({
  // backgroundColor: 'white',
  height: '3px',
  width: '5px',
  cursor: 'pointer'
})

const TopAndBottomBorderDiv = styled.div({
  // backgroundColor: '#ffffff',
  height: '5px',
  width: '96%',
  position: 'relative',
  cursor: 'pointer'
})

const SideBorderDiv = styled.div({
  // backgroundColor: '#ffffff',
  height: '60px',
  width: '3px',
  cursor: 'pointer'
})

const DivBlockContainer = styled.div({
  display: 'flex'
})

const InfoContainer = styled.div(({ blockColor, hover }) => ({
  width: '96%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  backgroundColor: blockColor,
  color: 'white',
  boxShadow: hover ? 'inset 0 0 100px 100px rgba(255, 255, 255, 0.4)' : 'none',
  '&:hover': {
    boxShadow: 'inset 0 0 100px 100px rgba(255, 255, 255, 0.4)'
  }
}))

const PlaceBetCoinContainer = styled.div(({ top, bottom, left }) => ({
  position: 'absolute',
  top: top || '25%',
  left: left || '-12px',
  bottom: bottom || '0',
  zIndex: 1
}))

const PlacedBetCoin = styled.div({
  color: 'blue',
  display: 'flex',
  backgroundColor: '#ebeb34',
  width: '30px',
  height: '30px',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer'
})
