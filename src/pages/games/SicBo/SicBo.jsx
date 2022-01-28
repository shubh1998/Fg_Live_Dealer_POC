import { memo } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { ShowBetDetail } from '../../../components/ShowBetDetail'
import { CountDownTimer } from '../../../components/CountDownTimer'
import { Notifier } from '../../../components/Notifier'
import { Dice, Item, TimerDiv } from './Sicbo.Styles'
import { useSicBoController } from './hooks/useSicBoController'
import SicboOperations from '../../../utils/game-operations/Sicbo'
import { displaySumOfBetAmount, getBetPayout, isWinningBlock } from '../../../utils/common-functions'
import { RootContainer } from '../../../components/GameContainer'
import { BetCoinSection } from '../../../components/BetCoinSection'
import { LiveStream } from '../../liveStream'

const SicBo = () => {
  const {
    SBState,
    timer,
    SICBO_GAME_DATA,
    handleBet,
    handleSelectedBetCoin,
    handleUndo,
    handleDouble,
    handleRepeat
  } = useSicBoController()

  const { result, dices, round, previousGameStates, gameData, currentGameStates: array, selectedBetCoin, lastBet } = SBState

  return (
    round && gameData && gameData.gameRules.length > 0 && (
      <div id='root-main'>
        <LiveStream STREAM_URL='http://44.202.140.218/live/SB.flv' id='game-live-video'>
          <div style={{ position: 'absolute', top: '5%', transform: 'scale(0.7)' }}>
            <RootContainer timerActive={timer === 0 && !dices}>
              {(timer > 0) && (
                <TimerDiv>
                  <CountDownTimer countDownTime={timer} totalDuration={gameData.timer} />
                </TimerDiv>
              )}
              <Box>
                <Grid container spacing={1}>
                  <Grid item xs={2}>
                    <Grid container spacing={1}>
                      <Grid item xs={8}>
                        <Item
                          showWin={isWinningBlock({
                            allWinningBets: round.winningCombinations,
                            betType: SicboOperations.SMALL
                          })}
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
                            payout={getBetPayout({
                              gameRules: gameData.gameRules,
                              betType: SicboOperations.SMALL
                            })}
                          />
                        </Item>
                      </Grid>
                      <Grid item xs={4}>
                        <Item
                          showWin={isWinningBlock({
                            allWinningBets: round.winningCombinations,
                            betType: SicboOperations.ODD
                          })}
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
                            payout={getBetPayout({
                              gameRules: gameData.gameRules,
                              betType: SicboOperations.ODD
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
                              showWin={isWinningBlock({
                                allWinningBets: round.winningCombinations,
                                betType: SicboOperations.DOUBLE_ONE
                              })}
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
                                payout={getBetPayout({
                                  gameRules: gameData.gameRules,
                                  betType: SicboOperations.SICBO_DOUBLE
                                })}
                              />
                            </Item>
                          </Grid>
                          <Grid item xs={4}>
                            <Item
                              showWin={isWinningBlock({
                                allWinningBets: round.winningCombinations,
                                betType: SicboOperations.DOUBLE_TWO
                              })}
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
                                payout={getBetPayout({
                                  gameRules: gameData.gameRules,
                                  betType: SicboOperations.SICBO_DOUBLE
                                })}
                              />
                            </Item>
                          </Grid>
                          <Grid item xs={4}>
                            <Item
                              showWin={isWinningBlock({
                                allWinningBets: round.winningCombinations,
                                betType: SicboOperations.DOUBLE_THREE
                              })}
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
                                payout={getBetPayout({
                                  gameRules: gameData.gameRules,
                                  betType: SicboOperations.SICBO_DOUBLE
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
                                  showWin={isWinningBlock({
                                    allWinningBets: round.winningCombinations,
                                    betType: SicboOperations.TRIPLE_ONE
                                  })}
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
                                    payout={getBetPayout({
                                      gameRules: gameData.gameRules,
                                      betType: SicboOperations.SICBO_SPECIFIC_TRIPLE
                                    })}
                                  />
                                </Item>
                              </Grid>
                              <Grid item xs={12}>
                                <Item
                                  height='47px'
                                  showWin={isWinningBlock({
                                    allWinningBets: round.winningCombinations,
                                    betType: SicboOperations.TRIPLE_TWO
                                  })}
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
                                    payout={getBetPayout({
                                      gameRules: gameData.gameRules,
                                      betType: SicboOperations.SICBO_SPECIFIC_TRIPLE
                                    })}
                                  />
                                </Item>
                              </Grid>
                              <Grid item xs={12}>
                                <Item
                                  height='47px'
                                  showWin={isWinningBlock({
                                    allWinningBets: round.winningCombinations,
                                    betType: SicboOperations.TRIPLE_THREE
                                  })}
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
                                    payout={getBetPayout({
                                      gameRules: gameData.gameRules,
                                      betType: SicboOperations.SICBO_SPECIFIC_TRIPLE
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
                                  showWin={isWinningBlock({
                                    allWinningBets: round.winningCombinations,
                                    betType: SicboOperations.TRIPLE_ANY
                                  })}
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
                                    payout={getBetPayout({
                                      gameRules: gameData.gameRules,
                                      betType: SicboOperations.SICBO_SPECIFIC_TRIPLE
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
                                  showWin={isWinningBlock({
                                    allWinningBets: round.winningCombinations,
                                    betType: SicboOperations.TRIPLE_FOUR
                                  })}
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
                                    payout={getBetPayout({
                                      gameRules: gameData.gameRules,
                                      betType: SicboOperations.SICBO_SPECIFIC_TRIPLE
                                    })}
                                  />
                                </Item>
                              </Grid>
                              <Grid item xs={12}>
                                <Item
                                  height='47px'
                                  showWin={isWinningBlock({
                                    allWinningBets: round.winningCombinations,
                                    betType: SicboOperations.TRIPLE_FIVE
                                  })}
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
                                    payout={getBetPayout({
                                      gameRules: gameData.gameRules,
                                      betType: SicboOperations.SICBO_SPECIFIC_TRIPLE
                                    })}
                                  />
                                </Item>
                              </Grid>
                              <Grid item xs={12}>
                                <Item
                                  height='47px'
                                  showWin={isWinningBlock({
                                    allWinningBets: round.winningCombinations,
                                    betType: SicboOperations.TRIPLE_SIX
                                  })}
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
                                    payout={getBetPayout({
                                      gameRules: gameData.gameRules,
                                      betType: SicboOperations.SICBO_SPECIFIC_TRIPLE
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
                              showWin={isWinningBlock({
                                allWinningBets: round.winningCombinations,
                                betType: SicboOperations.DOUBLE_FOUR
                              })}
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
                                payout={getBetPayout({
                                  gameRules: gameData.gameRules,
                                  betType: SicboOperations.SICBO_DOUBLE
                                })}
                              />
                            </Item>
                          </Grid>
                          <Grid item xs={4}>
                            <Item
                              showWin={isWinningBlock({
                                allWinningBets: round.winningCombinations,
                                betType: SicboOperations.DOUBLE_FIVE
                              })}
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
                                payout={getBetPayout({
                                  gameRules: gameData.gameRules,
                                  betType: SicboOperations.SICBO_DOUBLE
                                })}
                              />
                            </Item>
                          </Grid>
                          <Grid item xs={4}>
                            <Item
                              showWin={isWinningBlock({
                                allWinningBets: round.winningCombinations,
                                betType: SicboOperations.DOUBLE_SIX
                              })}
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
                                payout={getBetPayout({
                                  gameRules: gameData.gameRules,
                                  betType: SicboOperations.SICBO_DOUBLE
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
                          showWin={isWinningBlock({
                            allWinningBets: round.winningCombinations,
                            betType: SicboOperations.EVEN
                          })}
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
                            payout={getBetPayout({
                              gameRules: gameData.gameRules,
                              betType: SicboOperations.EVEN
                            })}
                          />
                        </Item>
                      </Grid>
                      <Grid item xs={8}>
                        <Item
                          showWin={isWinningBlock({
                            allWinningBets: round.winningCombinations,
                            betType: SicboOperations.BIG
                          })}
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
                            payout={getBetPayout({
                              gameRules: gameData.gameRules,
                              betType: SicboOperations.BIG
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
                      showWin={isWinningBlock({
                        allWinningBets: round.winningCombinations,
                        betType: `${SicboOperations.THREE_DICE_SUM}_${item}`
                      })}
                      height={80}
                      margin={2}
                    >
                      <ShowBetDetail
                        className='ShowBetDetail'
                        title={item}
                        betValue={displaySumOfBetAmount({
                          betType: `${SicboOperations.THREE_DICE_SUM}_${item}`,
                          array
                        })}
                        payout={getBetPayout({
                          gameRules: gameData.gameRules,
                          betType: `${SicboOperations.THREE_DICE_SUM}_${item}`
                        })}
                      />
                    </Item>
                  ))}
                </div>
                <div style={{ display: 'flex', padding: '1px' }}>
                  {SICBO_GAME_DATA.DOUBLE_DICE_COMBINATION.map(({ i, j }) => (
                    <Item
                      showWin={isWinningBlock({
                        allWinningBets: round.winningCombinations,
                        betType: `${SicboOperations.DOUBLE_DICE_COMBINATION}_${i}_${j}`
                      })}
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
                        payout={getBetPayout({
                          gameRules: gameData.gameRules,
                          betType: SicboOperations.DOUBLE_DICE_COMBINATION
                        })}
                      />
                    </Item>
                  ))}
                </div>
                <div style={{ display: 'flex', padding: '1px' }}>
                  {SICBO_GAME_DATA.SINGLE_DICE_ARRAY.map((item) => (
                    <Item
                      showWin={isWinningBlock({
                        allWinningBets: round.winningCombinations,
                        betType: `${SicboOperations.SINGLE_DICE}_${item}`
                      })}
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
                        payout={getBetPayout({
                          gameRules: gameData.gameRules,
                          betType: SicboOperations.SINGLE_DICE
                        })}
                      />
                    </Item>
                  ))}
                </div>
              </Box>
              <Notifier isBetActive={timer} />
              <BetCoinSection
                casinoTokens={SICBO_GAME_DATA.casinoTokens}
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

              {dices && (
                <div style={{
                  display: 'flex',
                  justifyContent: 'center'
                }}
                >
                  <Dice className='Dice'>{dices.diceOne}</Dice>
                  <Dice className='Dice'>{dices.diceTwo}</Dice>
                  <Dice className='Dice'>{dices.diceThree}</Dice>
                </div>
              )}
              {
              result && round &&
              (
                <div style={{ textAlign: 'center', color: 'green', margin: 5, border: '1px solid black' }}>
                  {
                    result.totalWinningAmount
                      ? (<div>  {`Winning amount ${result.totalWinningAmount}`}  </div>)
                      : <></>
                  }

                </div>
              )
            }
            </RootContainer>
          </div>
        </LiveStream>
      </div>
    )
  )
}

export default memo(SicBo)
