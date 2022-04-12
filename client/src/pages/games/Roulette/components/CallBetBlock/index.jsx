import React from 'react'
import RouletteOperations, { ORPHELINS_VALUES, TIER_VALUES, VOISINS_VALUES, ZERO_VALUES } from '../../../../../utils/game-operations/Roulette'
import { CallbetContainer, CallBetCount, CallBetsRow, CallCenterDiv, CustomButton, InfoContainerCallBetsBlock } from './CallBetBlock.style'

export const CallBetBlock = ({
  callBetData,
  handleCallBet,
  count,
  setCount,
  handleCallBetHover,
  hoverIndexCallBetArray
}) => {
  return (
    <>
      <CallbetContainer>
        <CallBetCount>
          <CustomButton style={{ border: '1px solid white', color: 'white' }} variant='contained' disabled={!count} onClick={() => setCount(count - 1)}>-</CustomButton>
          <span style={{ fontSize: 25, color: 'white', fontWeight: 'bolder' }}>{count}</span>
          <CustomButton style={{ border: '1px solid white', color: 'white' }} variant='contained' disabled={count >= 9} onClick={() => setCount(count + 1)}>+</CustomButton>
        </CallBetCount>
        <CallBetsRow>
          {
            callBetData.ROULETTE_CALLBETS_FIRST_ROW.map((item) => {
              return (
                <InfoContainerCallBetsBlock
                  hover={!!hoverIndexCallBetArray.includes(callBetData.ROULETTE_WHEEL_SEQUENCE.indexOf(item))}
                  onClick={() => handleCallBet('none', item)}
                  key={item}
                  blockColor={callBetData.RED_COLOR_BLOCK_ARRAY.includes(item) ? 'red' : 'black'}
                  onMouseOver={() => handleCallBetHover({ value: item, mouseIn: true })}
                  onMouseOut={() => handleCallBetHover({ value: item })}
                >
                  <div>
                    {item}
                  </div>
                </InfoContainerCallBetsBlock>

              )
            })
          }
        </CallBetsRow>
        <CallBetsRow>
          <div>
            {
              callBetData.ROULETTE_CALLBETS_SECOND_ROW_FIRST_COL.map((item) => {
                return (
                  <InfoContainerCallBetsBlock
                    onClick={() => handleCallBet('none', item)}
                    width={30}
                    height={25}
                    key={item}
                    hover={!!hoverIndexCallBetArray.includes(callBetData.ROULETTE_WHEEL_SEQUENCE.indexOf(item))}
                    blockColor={callBetData.RED_COLOR_BLOCK_ARRAY.includes(item) ? 'red' : 'black'}
                    onMouseOver={() => handleCallBetHover({ value: item, mouseIn: true })}
                    onMouseOut={() => handleCallBetHover({ value: item })}
                  >
                    <div>
                      {item}
                    </div>
                  </InfoContainerCallBetsBlock>

                )
              })
            }
          </div>
          <CallCenterDiv
            onClick={() => handleCallBet(RouletteOperations.tier)}
            onMouseOver={() => handleCallBetHover({ value: TIER_VALUES, mouseIn: true })}
            onMouseOut={() => handleCallBetHover({ value: TIER_VALUES })}
          >
            TIER
          </CallCenterDiv>
          <CallCenterDiv
            onClick={() => handleCallBet(RouletteOperations.orphelins)}
            onMouseOver={() => handleCallBetHover({ value: ORPHELINS_VALUES, mouseIn: true })}
            onMouseOut={() => handleCallBetHover({ value: ORPHELINS_VALUES })}
          >
            ORPHELENS
          </CallCenterDiv>
          <CallCenterDiv
            onClick={() => handleCallBet(RouletteOperations.voisins)}
            onMouseOver={() => handleCallBetHover({ value: VOISINS_VALUES, mouseIn: true })}
            onMouseOut={() => handleCallBetHover({ value: VOISINS_VALUES })}
          >
            VOISINS
          </CallCenterDiv>
          <CallCenterDiv
            onClick={() => handleCallBet(RouletteOperations.zero)}
            onMouseOver={() => handleCallBetHover({ value: ZERO_VALUES, mouseIn: true })}
            onMouseOut={() => handleCallBetHover({ value: ZERO_VALUES })}
          >
            ZERO
          </CallCenterDiv>
          <div>
            {
              callBetData.ROULETTE_CALLBETS_SECOND_ROW_LAST_COL.map((item) => {
                return (
                  <InfoContainerCallBetsBlock
                    onClick={() => handleCallBet('none', item)}
                    width={30}
                    height={30}
                    key={item}
                    hover={!!hoverIndexCallBetArray.includes(callBetData.ROULETTE_WHEEL_SEQUENCE.indexOf(item))}
                    onMouseOver={() => handleCallBetHover({ value: item, mouseIn: true })}
                    onMouseOut={() => handleCallBetHover({ value: item })}
                    blockColor={item !== 0 ? (callBetData.RED_COLOR_BLOCK_ARRAY.includes(item) ? 'red' : 'black') : 'green'}
                  >
                    <div>
                      {item}
                    </div>
                  </InfoContainerCallBetsBlock>

                )
              })
            }
          </div>
        </CallBetsRow>
        <CallBetsRow>
          {
            callBetData.ROULETTE_CALLBETS_LAST_ROW.map((item) => {
              return (
                <InfoContainerCallBetsBlock
                  onClick={() => handleCallBet('none', item)}
                  key={item}
                  hover={!!hoverIndexCallBetArray.includes(callBetData.ROULETTE_WHEEL_SEQUENCE.indexOf(item))}
                  blockColor={callBetData.RED_COLOR_BLOCK_ARRAY.includes(item) ? 'red' : 'black'}
                  onMouseOver={() => handleCallBetHover({ value: item, mouseIn: true })}
                  onMouseOut={() => handleCallBetHover({ value: item })}
                // width='5%'
                >
                  <div>
                    {item}
                  </div>
                </InfoContainerCallBetsBlock>

              )
            })
          }
        </CallBetsRow>

      </CallbetContainer>
    </>
  )
}
