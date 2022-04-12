import { Grid } from '@mui/material'
import { InfoContainer, PentagonBlock, PlacedBetCoin, ZeroInfoContainer, TimerDiv, ResultBox } from './Roulette.styles'
import { useRouletteController } from './hooks/useRouletteController'
import { CountDownTimer } from '../../../components/CountDownTimer'
import { Notifier } from '../../../components/Notifier'
import { displaySumOfBetAmount } from '../../../utils/common-functions'
import { RouletteBlock } from './components/RouletteBlock'
import { RootContainer } from '../../../components/GameContainer'
import { CallBetBlock } from './components/CallBetBlock'
import { BetCoinSection } from '../../../components/BetCoinSection'
import { RouletteWheel } from './components/RouletteWheel'
import { LiveStream } from '../../liveStream'

export const Roulette = () => {
  const {
    RState,
    setCount,
    timer,
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
    handleHover,
    handleCallBet,
    handleCallBetHover,
    handleRepeat,
    setShowResult
  } = useRouletteController()
  const array = RState.currentGameStates
  const { gameData, result, previousGameStates, selectedBetCoin, lastBet, rouletteBallResult, startWheel, showResult } = RState

  const data = ROULETTE_GAME_DATA.ROULETTE_WHEEL_SEQUENCE.map((item) => {
    return {
      option: item,
      style: { backgroundColor: item ? (ROULETTE_GAME_DATA.RED_COLOR_BLOCK_ARRAY.includes(item) ? 'red' : 'black') : 'green' }
    }
  })

  return (
    <div id='root-main'>
      <LiveStream STREAM_URL='http://localhost:8000/live/RL.flv' id='game-live-video'>
        <div style={{ position: 'absolute', top: '-8%', transform: 'scale(0.6)' }}>
          <RootContainer id='roulette-game'>
            {timer > 0 && (
              <TimerDiv>
                <CountDownTimer countDownTime={timer} totalDuration={gameData.timer} />
              </TimerDiv>
            )}
            <Grid container>
              <Grid item xs={4}>
                <RouletteWheel
                  startWheel={startWheel}
                  index={ROULETTE_GAME_DATA.ROULETTE_WHEEL_SEQUENCE.indexOf(rouletteBallResult.roundOutcome)}
                  data={data}
                  onStopSpinning={() => { setShowResult(true) }}
                />
              </Grid>
              <Grid item xs={8}>
                <CallBetBlock
                  callBetData={ROULETTE_GAME_DATA}
                  handleCallBet={handleCallBet}
                  count={RState.count}
                  setCount={setCount}
                  handleCallBetHover={handleCallBetHover}
                  hoverIndexCallBetArray={RState.hoverIndexCallBetArray}
                />
              </Grid>
            </Grid>
            {
            result && showResult &&
            (
              <ResultBox>
                <b>  {`Winning amount ${result.totalWinningAmount}`}  </b>
              </ResultBox>
            )
          }
            <Grid container>
              <Grid item xs={1}>
                <PentagonBlock
                  hover={!!RState.hoverIndexArray.includes(-1)}
                  onClick={() => handleBet({
                    betType: RouletteOperations.zeroNumber
                  })}
                >
                  <div style={{ display: 'block', transform: 'rotate(180deg)' }}>
                    <ZeroInfoContainer>0</ZeroInfoContainer>
                    {
                    displaySumOfBetAmount({ betType: RouletteOperations.zeroNumber, array }) &&
                    (
                      <PlacedBetCoin>{displaySumOfBetAmount({ betType: RouletteOperations.zeroNumber, array })}</PlacedBetCoin>
                    )
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
                            (
                              <PlacedBetCoin>{displaySumOfBetAmount({ betType: `${RouletteOperations.singleNumberBet}_${item}`, array })}</PlacedBetCoin>
                            )
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
                      >{item.title}
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
                      >{item.title}
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
                          (
                            <PlacedBetCoin>{displaySumOfBetAmount({ betType: `${RouletteOperations.rowViseBet}_${item.label}`, array })}</PlacedBetCoin>
                          )
                        }
                      </InfoContainer>
                    </Grid>
                  ))
                }
                </Grid>
              </Grid>
            </Grid>
            <Notifier isBetActive={timer} />
            <BetCoinSection
              casinoTokens={ROULETTE_GAME_DATA.casinoTokens}
              handleUndo={handleUndo}
              disableUndo={!timer || !previousGameStates.length}
              isBetActive={timer}
              handleSelectedBetCoin={handleSelectedBetCoin}
              handleDouble={handleDouble}
              disableDouble={!timer || !array.length}
              selectedBetCoin={selectedBetCoin}
              handleRepeat={handleRepeat}
              isShowRepeat={timer && !array.length && lastBet.length}
            />
          </RootContainer>
        </div>
      </LiveStream>
    </div>
  )
}
