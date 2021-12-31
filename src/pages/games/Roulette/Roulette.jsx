import { Grid } from '@mui/material'
import { BetCoin, BettingAmountOptions, GameContainer, InfoContainer, OptionsContainer, PentagonBlock, PlacedBetCoin, Root, ZeroInfoContainer, TimerDiv } from './Roulette.styles'
import { useRouletteController } from './hooks/useRouletteController'
import { CountDownTimer } from '../../../components/CountDownTimer'
import { Notifier } from '../../../components/Notifier'
import { displaySumOfBetAmount } from '../../../utils/common-functions'
import { RouletteBlock } from './components/RouletteBlock'

export const Roulette = () => {
  const {
    RState,
    isBetActive,
    RouletteOperations,
    hoverTypesAndStatus,
    ROULETTE_GAME_DATA,
    handleBet,
    handleSelectedBetCoin,
    handleUndo,
    handleDouble,
    formatTwoNumberBetOn,
    formatBottomBet,
    checkThreeOrFourBetPlaced,
    handleHover
  } = useRouletteController()
  const array = RState.currentGameStates

  return (
    <Root>
      <GameContainer>
        <Grid container>
          <Grid item xs={1}>
            <PentagonBlock
              hover={!!RState.hoverIndexArray.includes(-1)}
              onClick={() => handleBet({
                betType: `${RouletteOperations.singleNumberBet}_0`
              })}
            >
              <div style={{ display: 'block', transform: 'rotate(180deg)' }}>
                <ZeroInfoContainer>0</ZeroInfoContainer>
                {
                  displaySumOfBetAmount({ betType: `${RouletteOperations.singleNumberBet}_0`, array }) &&
                    <PlacedBetCoin>{displaySumOfBetAmount({ betType: `${RouletteOperations.singleNumberBet}_0`, array })}</PlacedBetCoin>
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
                          betType: `${RouletteOperations.singleNumberBet}_${item}`
                        })}
                        placeBetCoin={
                          displaySumOfBetAmount({ betType: `${RouletteOperations.singleNumberBet}_${item}`, array }) &&
                            <PlacedBetCoin>{displaySumOfBetAmount({ betType: `${RouletteOperations.singleNumberBet}_${item}`, array })}</PlacedBetCoin>
                        }
                        leftSideHandler={() => {
                          handleBet({
                            betType: `${RouletteOperations.twoNumberBet}_${formatTwoNumberBetOn({ item, index })}`
                          })
                        }}
                        twoNumberBetPlaced={
                          displaySumOfBetAmount({ betType: `${RouletteOperations.twoNumberBet}_${formatTwoNumberBetOn({ item, index })}`, array }) &&
                          displaySumOfBetAmount({ betType: `${RouletteOperations.twoNumberBet}_${formatTwoNumberBetOn({ item, index })}`, array })
                        }
                        handleCorner={() => {
                          handleBet({ betType: checkThreeOrFourBetPlaced({ item, index }) })
                        }}
                        threeOrFourBetPlaced={
                          displaySumOfBetAmount({ betType: checkThreeOrFourBetPlaced({ item, index }), array }) &&
                          displaySumOfBetAmount({ betType: checkThreeOrFourBetPlaced({ item, index }), array })
                        }
                        handleBottom={
                          () => {
                            handleBet({ betType: formatBottomBet({ item, index }) })
                          }
                        }
                        twoOrThreeBetPlaced={
                          displaySumOfBetAmount({ betType: formatBottomBet({ item, index }), array }) &&
                          displaySumOfBetAmount({ betType: formatBottomBet({ item, index }), array })
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
                  <Grid item xs={4} key={item.block}>
                    <InfoContainer onClick={() => handleBet({
                      betType: `${RouletteOperations.twelveNumberBet}_${item.block}`
                    })}
                    >{item.label}
                      {displaySumOfBetAmount({ betType: `${RouletteOperations.twelveNumberBet}_${item.block}`, array }) &&
                        <PlacedBetCoin>
                          {displaySumOfBetAmount({ betType: `${RouletteOperations.twelveNumberBet}_${item.block}`, array })}
                        </PlacedBetCoin>}
                    </InfoContainer>
                  </Grid>
                ))
              }
              {
                ROULETTE_GAME_DATA.LAST_BET_ROW.map(item => (
                  <Grid item xs={2} key={item.label} style={{ marginTop: '1px' }}>
                    <InfoContainer onClick={() => handleBet({
                      betType: `${item.type}_${item.label}`
                    })}
                    >{item.label}
                      {displaySumOfBetAmount({ betType: `${item.type}_${item.label}`, array }) &&
                        <PlacedBetCoin>
                          {displaySumOfBetAmount({ betType: `${item.type}_${item.label}`, array })}
                        </PlacedBetCoin>}
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
                        betType: `${RouletteOperations.rowViseBet}_${item.label}`
                      })}
                    >{item.value}
                      {
                        displaySumOfBetAmount({ betType: `${RouletteOperations.rowViseBet}_${item.label}`, array }) &&
                          <PlacedBetCoin>{displaySumOfBetAmount({ betType: `${RouletteOperations.rowViseBet}_${item.label}`, array })}</PlacedBetCoin>
                      }
                    </InfoContainer>
                  </Grid>
                ))
              }
            </Grid>
          </Grid>
        </Grid>
      </GameContainer>
      <Notifier isBetActive={isBetActive} />
      <OptionsContainer>
        <BettingAmountOptions className='casino-coin'>
          <button onClick={handleUndo} disabled={!isBetActive || !RState.previousGameStates.length}>
            Undo
          </button>

          {ROULETTE_GAME_DATA.casinoTokens.map((token, index) => (
            <BetCoin
              key={index}
              selectedButton={RState.selectedBetCoin === token}
              onClick={() => handleSelectedBetCoin(token)}
              disabled={!isBetActive}
            >
              {token}
            </BetCoin>
          ))}
          <button onClick={handleDouble} disabled={!isBetActive || !RState.currentGameStates.length}>
            Double
          </button>
        </BettingAmountOptions>
      </OptionsContainer>
      {
        isBetActive && (
          <TimerDiv>
            <CountDownTimer countDownTime={10} />
          </TimerDiv>
        )
      }
    </Root>
  )
}
