import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { ShowBetDetail } from '../../../components/ShowBetDetail'
import { CountDownTimer } from '../../../components/CountDownTimer'
import { Notifier } from '../../../components/Notifier'
import { BetCoin, BettingAmountOptions, GameContainer, Item, OptionsContainer, Root, TimerDiv } from './Sicbo.Styles'
import { useSicBoController } from './hooks/useSicBoController'
import SicboOperations from '../../../utils/game-operations/Sicbo.JS'
import { displaySumOfBetAmount } from '../../../utils/common-functions'

export const SicBo = () => {
  const {
    SBState,
    isBetActive,
    timer,
    SICBO_GAME_DATA,
    handleBet,
    handleSelectedBetCoin,
    handleUndo,
    handleDouble
  } = useSicBoController()
  const array = SBState.currentGameStates

  return (
    <Root>
      <GameContainer>
        <Box>
          <Grid container spacing={1}>
            <Grid item xs={2}>
              <Grid container spacing={1}>
                <Grid item xs={8}>
                  <Item
                    onClick={() =>
                      handleBet({
                        betType: SicboOperations.SMALL
                      })}
                  >
                    <ShowBetDetail
                      title='Small(4-10)'
                      betValue={displaySumOfBetAmount({
                        betType: SicboOperations.SMALL,
                        array
                      })}
                    />
                  </Item>
                </Grid>
                <Grid item xs={4}>
                  <Item
                    onClick={() =>
                      handleBet({
                        betType: SicboOperations.ODD
                      })}
                  >
                    <ShowBetDetail
                      title='ODD'
                      betValue={displaySumOfBetAmount({
                        betType: SicboOperations.ODD,
                        array
                      })}
                    />
                  </Item>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={8}>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Grid container spacing={1}>
                    <Grid item xs={4}>
                      <Item
                        onClick={() =>
                          handleBet({
                            betType: SicboOperations.DOUBLE_ONE
                          })}
                      >
                        <ShowBetDetail
                          title='Double 1'
                          betValue={displaySumOfBetAmount({
                            betType: SicboOperations.DOUBLE_ONE,
                            array
                          })}
                        />
                      </Item>
                    </Grid>
                    <Grid item xs={4}>
                      <Item
                        onClick={() =>
                          handleBet({
                            betType: SicboOperations.DOUBLE_TWO
                          })}
                      >
                        <ShowBetDetail
                          title='Double 2'
                          betValue={displaySumOfBetAmount({
                            betType: SicboOperations.DOUBLE_TWO,
                            array
                          })}
                        />
                      </Item>
                    </Grid>
                    <Grid item xs={4}>
                      <Item
                        onClick={() =>
                          handleBet({
                            betType: SicboOperations.DOUBLE_THREE
                          })}
                      >
                        <ShowBetDetail
                          title='Double 3'
                          betValue={displaySumOfBetAmount({
                            betType: SicboOperations.DOUBLE_THREE,
                            array
                          })}
                        />
                      </Item>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <Grid container spacing={1}>
                    <Grid item xs={4}>
                      <Grid container direction='column' spacing={1}>
                        <Grid item xs={12}>
                          <Item
                            height='47px'
                            onClick={() =>
                              handleBet({
                                betType: SicboOperations.TRIPLE_ONE
                              })}
                          >
                            <ShowBetDetail
                              title='Triple 1'
                              betValue={displaySumOfBetAmount({
                                betType: SicboOperations.TRIPLE_ONE,
                                array
                              })}
                            />
                          </Item>
                        </Grid>
                        <Grid item xs={12}>
                          <Item
                            height='47px'
                            onClick={() =>
                              handleBet({
                                betType: SicboOperations.TRIPLE_TWO
                              })}
                          >
                            <ShowBetDetail
                              title='Triple 2'
                              betValue={displaySumOfBetAmount({
                                betType: SicboOperations.TRIPLE_TWO,
                                array
                              })}
                            />
                          </Item>
                        </Grid>
                        <Grid item xs={12}>
                          <Item
                            height='47px'
                            onClick={() =>
                              handleBet({
                                betType: SicboOperations.TRIPLE_THREE
                              })}
                          >
                            <ShowBetDetail
                              title='Triple 3'
                              betValue={displaySumOfBetAmount({
                                betType: SicboOperations.TRIPLE_THREE,
                                array
                              })}
                            />
                          </Item>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={4}>
                      <Grid container direction='column' spacing={1}>
                        <Grid item xs={12}>
                          <Item
                            onClick={() =>
                              handleBet({
                                betType: SicboOperations.TRIPLE_ANY
                              })}
                          >
                            <ShowBetDetail
                              title='Any Triple'
                              betValue={displaySumOfBetAmount({
                                betType: SicboOperations.TRIPLE_ANY,
                                array
                              })}
                            />
                          </Item>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={4}>
                      <Grid container spacing={1}>
                        <Grid item xs={12}>
                          <Item
                            height='47px'
                            onClick={() =>
                              handleBet({
                                betType: SicboOperations.TRIPLE_FOUR
                              })}
                          >
                            <ShowBetDetail
                              title='Triple 4'
                              betValue={displaySumOfBetAmount({
                                betType: SicboOperations.TRIPLE_FOUR,
                                array
                              })}
                            />
                          </Item>
                        </Grid>
                        <Grid item xs={12}>
                          <Item
                            height='47px'
                            onClick={() =>
                              handleBet({
                                betType: SicboOperations.TRIPLE_FIVE
                              })}
                          >
                            <ShowBetDetail
                              title='Triple 5'
                              betValue={displaySumOfBetAmount({
                                betType: SicboOperations.TRIPLE_FIVE,
                                array
                              })}
                            />
                          </Item>
                        </Grid>
                        <Grid item xs={12}>
                          <Item
                            height='47px'
                            onClick={() =>
                              handleBet({
                                betType: SicboOperations.TRIPLE_SIX
                              })}
                          >
                            <ShowBetDetail
                              title='Triple 6'
                              betValue={displaySumOfBetAmount({
                                betType: SicboOperations.TRIPLE_SIX,
                                array
                              })}
                            />
                          </Item>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <Grid container spacing={1}>
                    <Grid item xs={4}>
                      <Item
                        onClick={() =>
                          handleBet({
                            betType: SicboOperations.DOUBLE_FOUR
                          })}
                      >
                        <ShowBetDetail
                          title='Double 4'
                          betValue={displaySumOfBetAmount({
                            betType: SicboOperations.DOUBLE_FOUR,
                            array
                          })}
                        />
                      </Item>
                    </Grid>
                    <Grid item xs={4}>
                      <Item
                        onClick={() =>
                          handleBet({
                            betType: SicboOperations.DOUBLE_FIVE
                          })}
                      >
                        <ShowBetDetail
                          title='Double 5'
                          betValue={displaySumOfBetAmount({
                            betType: SicboOperations.DOUBLE_FIVE,
                            array
                          })}
                        />
                      </Item>
                    </Grid>
                    <Grid item xs={4}>
                      <Item
                        onClick={() =>
                          handleBet({
                            betType: SicboOperations.DOUBLE_SIX
                          })}
                      >
                        <ShowBetDetail
                          title='Double 6'
                          betValue={displaySumOfBetAmount({
                            betType: SicboOperations.DOUBLE_SIX,
                            array
                          })}
                        />
                      </Item>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Item
                    onClick={() =>
                      handleBet({
                        betType: SicboOperations.EVEN
                      })}
                  >
                    <ShowBetDetail
                      title='EVEN'
                      betValue={displaySumOfBetAmount({
                        betType: SicboOperations.EVEN,
                        array
                      })}
                    />
                  </Item>
                </Grid>
                <Grid item xs={8}>
                  <Item
                    onClick={() =>
                      handleBet({
                        betType: SicboOperations.BIG
                      })}
                  >
                    <ShowBetDetail
                      title='BIG(11-17)'
                      betValue={displaySumOfBetAmount({
                        betType: SicboOperations.BIG,
                        array
                      })}
                    />
                  </Item>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <div style={{ display: 'flex', padding: '1px' }}>
            {SICBO_GAME_DATA.TRIPLE_SUM_DICE_ARRAY.map((item) => (
              <Item
                onClick={() =>
                  handleBet({
                    betType: `${SicboOperations.THREE_DICE_SUM}_${item}`
                  })}
                key={item}
                height={80}
                margin={2}
              >
                <ShowBetDetail
                  title={item}
                  betValue={displaySumOfBetAmount({
                    betType: `${SicboOperations.THREE_DICE_SUM}_${item}`,
                    array
                  })}
                />
              </Item>
            ))}
          </div>
          <div style={{ display: 'flex', padding: '1px' }}>
            {SICBO_GAME_DATA.DOUBLE_DICE_COMBINATION.map(({ i, j }) => (
              <Item
                onClick={() =>
                  handleBet({
                    betType: `${SicboOperations.DOUBLE_DICE_COMBINATION}_${i}_${j}`
                  })}
                key={`${i}_${j}`}
                height={140}
                margin={2}
              >
                <ShowBetDetail
                  title={`${i}+ ${j}`}
                  betValue={displaySumOfBetAmount({
                    betType: `${SicboOperations.DOUBLE_DICE_COMBINATION}_${i}_${j}`,
                    array
                  })}
                />
              </Item>
            ))}
          </div>
          <div style={{ display: 'flex', padding: '1px' }}>
            {SICBO_GAME_DATA.SINGLE_DICE_ARRAY.map((item) => (
              <Item
                onClick={() =>
                  handleBet({
                    betType: `${SicboOperations.SINGLE_DICE}_${item}`
                  })}
                key={item}
                height={100}
                margin={4}
              >
                <ShowBetDetail
                  title={item}
                  betValue={displaySumOfBetAmount({
                    betType: `${SicboOperations.SINGLE_DICE}_${item}`,
                    array
                  })}
                />
              </Item>
            ))}
          </div>
        </Box>
      </GameContainer>
      <Notifier isBetActive={isBetActive} />
      <OptionsContainer>
        <BettingAmountOptions className='casino-coin'>
          <button
            disabled={!SBState.previousGameStates.length || !isBetActive}
            onClick={handleUndo}
          >
            Undo
          </button>

          {SICBO_GAME_DATA.casinoTokens.map((token, index) => (
            <BetCoin
              key={index}
              disabled={!isBetActive}
              selectedButton={SBState.selectedBetCoin === token}
              onClick={() => handleSelectedBetCoin(token)}
            >
              {token}
            </BetCoin>
          ))}
          <button
            onClick={handleDouble}
            disabled={!SBState.currentGameStates.length || !isBetActive}
          >
            Double
          </button>
        </BettingAmountOptions>
      </OptionsContainer>
      {isBetActive && (
        <TimerDiv>
          <CountDownTimer countDownTime={timer} />
        </TimerDiv>
      )}
    </Root>
  )
}
