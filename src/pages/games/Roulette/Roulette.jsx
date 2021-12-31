import { Grid } from '@mui/material'
import { RouletteBlock } from '../../../components/RouletteBlock'
import { BetCoin, BettingAmountOptions, GameContainer, InfoContainer, OptionsContainer, PentagonBlock, PlacedBetCoin, Root, ZeroInfoContainer, TimerDiv } from './Roulette.styles'
import { useRouletteController } from './hooks/useRouletteController'
import { CountDownTimer } from '../../../components/CountDownTimer'
import { v4 as uuidv4 } from 'uuid'
import { Notifier } from '../../../components/Notifier'

export const Roulette = () => {
  const {
    RState,
    isBetActive,
    OperationType,
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
                betId: uuidv4(),
                betType: `${OperationType.singleNumberBet}_0`
              })}
            >
              <div style={{ display: 'block', transform: 'rotate(180deg)' }}>
                <ZeroInfoContainer>0</ZeroInfoContainer>
                {displayBetAmount(`${OperationType.singleNumberBet}_0`) && <PlacedBetCoin>{displayBetAmount(`${OperationType.singleNumberBet}_0`)}</PlacedBetCoin>}
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
                          betId: uuidv4(),
                          betType: `${OperationType.singleNumberBet}_${item}`
                        })}
                        placeBetCoin={displayBetAmount(`${OperationType.singleNumberBet}_${item}`) && <PlacedBetCoin>{displayBetAmount(`${OperationType.singleNumberBet}_${item}`)}</PlacedBetCoin>}
                        leftSideHandler={() => {
                          handleBet({
                            betId: uuidv4(),
                            betType: `${OperationType.twoNumberBet}_${formatTwoNumberBetOn({ item, index })}`
                          })
                        }}
                        twoNumberBetPlaced={displayBetAmount(`${OperationType.twoNumberBet}_${formatTwoNumberBetOn({ item, index })}`) && displayBetAmount(`${OperationType.twoNumberBet}_${formatTwoNumberBetOn({ item, index })}`)}
                        handleCorner={() => {
                          handleBet(checkThreeOrFourBetPlaced({ item, index }))
                        }}
                        threeOrFourBetPlaced={displayBetAmount(checkThreeOrFourBetPlaced({ item, index }).betType) && displayBetAmount(checkThreeOrFourBetPlaced({ item, index }).betType)}
                        handleBottom={
                          () => {
                            handleBet(formatBottomBet({ item, index }))
                          }
                        }
                        twoOrThreeBetPlaced={
                          displayBetAmount(formatBottomBet({ item, index }).betType) && displayBetAmount(formatBottomBet({ item, index }).betType)
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
                      betId: uuidv4(),
                      betType: `${OperationType.twelveNumberBet}_${item.block}`
                    })}
                    >{item.label}
                      {displayBetAmount(`${OperationType.twelveNumberBet}_${item.block}`) && <PlacedBetCoin>{displayBetAmount(`${OperationType.twelveNumberBet}_${item.block}`)}</PlacedBetCoin>}
                    </InfoContainer>
                  </Grid>
                ))
              }
              {
                ROULETTE_GAME_DATA.LAST_BET_ROW.map(item => (
                  <Grid item xs={2} key={item.label} style={{ marginTop: '1px' }}>
                    <InfoContainer onClick={() => handleBet({
                      betId: uuidv4(),
                      betType: `${item.type}_${item.label}`
                    })}
                    >{item.label}
                      {displayBetAmount(`${item.type}_${item.label}`) && <PlacedBetCoin>{displayBetAmount(`${item.type}_${item.label}`)}</PlacedBetCoin>}
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
                        betId: uuidv4(),
                        betType: `${OperationType.rowViseBet}_${item.label}`
                      })}
                    >{item.value}
                      {displayBetAmount(`${OperationType.rowViseBet}_${item.label}`) && <PlacedBetCoin>{displayBetAmount(`${OperationType.rowViseBet}_${item.label}`)}</PlacedBetCoin>}
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
