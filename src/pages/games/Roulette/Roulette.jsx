import { Grid } from '@mui/material'
import { RouletteBlock } from '../../../components/RouletteBlock'
import { BetCoin, BettingAmountOptions, GameContainer, InfoContainer, OptionsContainer, PentagonBlock, PlacedBetCoin, Root, ZeroInfoContainer } from './Roulette.styles'
import { useRouletteController } from './hooks/useRouletteController'

export const Roulette = () => {
  const {
    RState,
    operationType,
    hoverTypesAndStatus,
    ROULETTE_GAME_DATA,
    handleBet,
    handleSelectedBetCoin,
    handleUndo,
    handleDouble,
    displayBetAmount,
    formatTwoNumberBetOn,
    formatBottomBet,
    checkThreeOrFourBetPlaced,
    handleHover
  } = useRouletteController()

  return (
    <Root>
      <GameContainer>
        <Grid container>
          <Grid item xs={1}>
            <PentagonBlock
              hover={!!RState.hoverIndexArray.includes(-1)}
              onClick={() => handleBet({
                type: operationType.singleNumberBet,
                betOn: 0

              })}
            >
              <div style={{ display: 'block', transform: 'rotate(180deg)' }}>
                <ZeroInfoContainer>0</ZeroInfoContainer>
                {
                  displayBetAmount(0) ? <PlacedBetCoin>{displayBetAmount(0)}</PlacedBetCoin> : <></>
                }
              </div>
            </PentagonBlock>
          </Grid>
          <Grid item xs={10}>
            <Grid container>
              {
                ROULETTE_GAME_DATA.ROULETTE_NUMBER_ARRAY.map((item, index) => {
                  return (
                    <Grid item xs={1} key={item}>
                      <RouletteBlock
                        contentValue={item}
                        blockColor={ROULETTE_GAME_DATA.RED_COLOR_BLOCK_ARRAY.includes(item) ? 'red' : 'black'}
                        singleBetPlaceFunction={() => handleBet({
                          type: operationType.singleNumberBet,
                          betOn: item
                        })}
                        placeBetCoin={displayBetAmount(item) ? <PlacedBetCoin>{displayBetAmount(item)}</PlacedBetCoin> : <></>}
                        leftSideHandler={() => {
                          handleBet({
                            type: operationType.twoNumberBet,
                            betOn: formatTwoNumberBetOn({ item, index })
                          })
                        }}
                        twoNumberBetPlaced={displayBetAmount(formatTwoNumberBetOn({ item, index })) && displayBetAmount(formatTwoNumberBetOn({ item, index }))}
                        handleCorner={() => {
                          handleBet(checkThreeOrFourBetPlaced({ item, index }))
                        }}
                        threeOrFourBetPlaced={displayBetAmount(checkThreeOrFourBetPlaced({ item, index }).betOn) && displayBetAmount(checkThreeOrFourBetPlaced({ item, index }).betOn)}
                        handleBottom={
                          () => {
                            handleBet(formatBottomBet({ item, index }))
                          }
                        }
                        twoOrThreeBetPlaced={
                          displayBetAmount(formatBottomBet({ item, index }).betOn) && displayBetAmount(formatBottomBet({ item, index }).betOn)
                        }
                        handleSideHover={() => handleHover({ index, hoverType: hoverTypesAndStatus.sideHover })}
                        handleHoverOut={() => handleHover({ index, hoverType: '' })}
                        hover={!!RState.hoverIndexArray.includes(index)}
                        handleCornerHover={() => handleHover({ index, hoverType: hoverTypesAndStatus.cornerHover })}
                        handleBottomHover={() => handleHover({ index, hoverType: hoverTypesAndStatus.bottomHover })}

                      />
                    </Grid>
                  )
                })
              }
              {
                ROULETTE_GAME_DATA.BLOCK_12_ROW.map(item => (
                  <Grid item xs={4} key={item}>
                    <InfoContainer onClick={() => handleBet({
                      type: operationType.twelveNumberBet,
                      betOn: item
                    })}
                    >{item}
                      {displayBetAmount(item) ? <PlacedBetCoin>{displayBetAmount(item)}</PlacedBetCoin> : <></>}
                    </InfoContainer>
                  </Grid>
                ))
              }
              {
                ROULETTE_GAME_DATA.LAST_BET_ROW.map(item => (
                  <Grid item xs={2} key={item.label} style={{ marginTop: '1px' }}>
                    <InfoContainer onClick={() => handleBet({
                      type: operationType.type,
                      betOn: item.label
                    })}
                    >{item.label}
                      {displayBetAmount(item.label) ? <PlacedBetCoin>{displayBetAmount(item.label)}</PlacedBetCoin> : <></>}
                    </InfoContainer>
                  </Grid>
                ))
              }
            </Grid>
          </Grid>
          <Grid item xs={1}>
            <Grid container>
              {
                ROULETTE_GAME_DATA.SIDE_ROW_BETS.map(item => (
                  <Grid item key={item.label} xs={12} style={{ marginBottom: '5px' }}>
                    <InfoContainer
                      height='60px' onClick={() => handleBet({
                        type: item.type,
                        betOn: item.label
                      })}
                    >{item.value}
                      {displayBetAmount(item.label) ? <PlacedBetCoin>{displayBetAmount(item.label)}</PlacedBetCoin> : <></>}
                    </InfoContainer>
                  </Grid>
                ))
              }
            </Grid>
          </Grid>
        </Grid>
      </GameContainer>
      <OptionsContainer>
        <BettingAmountOptions className='casino-coin'>
          <button onClick={handleUndo} disabled={!RState.previousGameStates.length}>
            Undo
          </button>

          {ROULETTE_GAME_DATA.casinoTokens.map((token, index) => (
            <BetCoin
              key={index}
              selectedButton={RState.selectedBetCoin === token}
              onClick={() => handleSelectedBetCoin(token)}
            >
              {token}
            </BetCoin>
          ))}
          <button onClick={handleDouble} disabled={!RState.currentGameStates.length}>
            Double
          </button>
        </BettingAmountOptions>
      </OptionsContainer>
    </Root>
  )
}
