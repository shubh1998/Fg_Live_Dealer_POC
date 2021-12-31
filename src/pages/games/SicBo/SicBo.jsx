import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { ShowBetDetail } from '../../../components/ShowBetDetail'
import { CountDownTimer } from '../../../components/CountDownTimer'
import { Notifier } from '../../../components/Notifier'
import { BetCoin, BettingAmountOptions, GameContainer, Item, OptionsContainer, Root, TimerDiv } from './Sicbo.Styles'

import { v4 as uuidv4 } from 'uuid'
import { useSicBoController } from './hooks/useSicBoController'

export const SicBo = () => {
  const {
    SBState,
    isBetActive,
    OperationType,
    SICBO_GAME_DATA,
    handleBet,
    handleSelectedBetCoin,
    handleUndo,
    handleDouble,
    displayBetAmount
  } = useSicBoController()

  return (
    <Root>
      <GameContainer>
        <Box>
          <Grid container spacing={1}>
            <Grid item xs={2}>
              <Grid container spacing={1}>
                <Grid item xs={8}>
                  <Item onClick={() => handleBet({
                    betId: uuidv4(),
                    betType: OperationType.SMALL
                  })}
                  >
                    <ShowBetDetail
                      title='Small(4-10)'
                      betValue={displayBetAmount(OperationType.SMALL)}
                    />
                  </Item>
                </Grid>
                <Grid item xs={4}>
                  <Item
                    onClick={() => handleBet({
                      betId: uuidv4(),
                      betType: OperationType.ODD
                    })}
                  >
                    <ShowBetDetail
                      title='ODD'
                      betValue={displayBetAmount(OperationType.ODD)}
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
                      <Item onClick={() => handleBet({
                        betId: uuidv4(),
                        betType: OperationType.DOUBLE_ONE
                      })}
                      >
                        <ShowBetDetail
                          title='Double 1'
                          betValue={displayBetAmount(OperationType.DOUBLE_ONE)}
                        />
                      </Item>
                    </Grid>
                    <Grid item xs={4}>
                      <Item onClick={() => handleBet({
                        betId: uuidv4(),
                        betType: OperationType.DOUBLE_TWO
                      })}
                      >
                        <ShowBetDetail
                          title='Double 2'
                          betValue={displayBetAmount(OperationType.DOUBLE_TWO)}
                        />
                      </Item>
                    </Grid>
                    <Grid item xs={4}>
                      <Item onClick={() => handleBet({
                        betId: uuidv4(),
                        betType: OperationType.DOUBLE_THREE
                      })}
                      >
                        <ShowBetDetail
                          title='Double 3'
                          betValue={displayBetAmount(OperationType.DOUBLE_THREE)}
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
                            onClick={() => handleBet({
                              betId: uuidv4(),
                              betType: OperationType.TRIPLE_ONE
                            })}
                          >
                            <ShowBetDetail
                              title='Triple 1'
                              betValue={displayBetAmount(OperationType.TRIPLE_ONE)}
                            />
                          </Item>
                        </Grid>
                        <Grid item xs={12}>
                          <Item
                            height='47px'
                            onClick={() => handleBet({
                              betId: uuidv4(),
                              betType: OperationType.TRIPLE_TWO
                            })}
                          >
                            <ShowBetDetail
                              title='Triple 2'
                              betValue={displayBetAmount(OperationType.TRIPLE_TWO)}
                            />
                          </Item>
                        </Grid>
                        <Grid item xs={12}>
                          <Item
                            height='47px'
                            onClick={() => handleBet({
                              betId: uuidv4(),
                              betType: OperationType.TRIPLE_THREE
                            })}
                          >
                            <ShowBetDetail
                              title='Triple 3'
                              betValue={displayBetAmount(OperationType.TRIPLE_THREE)}
                            />
                          </Item>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={4}>
                      <Grid container direction='column' spacing={1}>
                        <Grid item xs={12}>
                          <Item
                            onClick={() => handleBet({
                              betId: uuidv4(),
                              betType: OperationType.TRIPLE_ANY
                            })}
                          >
                            <ShowBetDetail
                              title='Any Triple'
                              betValue={displayBetAmount(OperationType.TRIPLE_ANY)}
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
                            onClick={() => handleBet({
                              betId: uuidv4(),
                              betType: OperationType.TRIPLE_FOUR
                            })}
                          >
                            <ShowBetDetail
                              title='Triple 4'
                              betValue={displayBetAmount(OperationType.TRIPLE_FOUR)}
                            />
                          </Item>
                        </Grid>
                        <Grid item xs={12}>
                          <Item
                            height='47px'
                            onClick={() => handleBet({
                              betId: uuidv4(),
                              betType: OperationType.TRIPLE_FIVE
                            })}
                          >
                            <ShowBetDetail
                              title='Triple 5'
                              betValue={displayBetAmount(OperationType.TRIPLE_FIVE)}
                            />
                          </Item>
                        </Grid>
                        <Grid item xs={12}>
                          <Item
                            height='47px'
                            onClick={() => handleBet({
                              betId: uuidv4(),
                              betType: OperationType.TRIPLE_SIX
                            })}
                          >
                            <ShowBetDetail
                              title='Triple 6'
                              betValue={displayBetAmount(OperationType.TRIPLE_SIX)}
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
                      <Item onClick={() => handleBet({
                        betId: uuidv4(),
                        betType: OperationType.DOUBLE_FOUR
                      })}
                      >
                        <ShowBetDetail
                          title='Double 4'
                          betValue={displayBetAmount(OperationType.DOUBLE_FOUR)}
                        />
                      </Item>
                    </Grid>
                    <Grid item xs={4}>
                      <Item onClick={() => handleBet({
                        betId: uuidv4(),
                        betType: OperationType.DOUBLE_FIVE
                      })}
                      >
                        <ShowBetDetail
                          title='Double 5'
                          betValue={displayBetAmount(OperationType.DOUBLE_FIVE)}
                        />
                      </Item>
                    </Grid>
                    <Grid item xs={4}>
                      <Item onClick={() => handleBet({
                        betId: uuidv4(),
                        betType: OperationType.DOUBLE_SIX
                      })}
                      >
                        <ShowBetDetail
                          title='Double 6'
                          betValue={displayBetAmount(OperationType.DOUBLE_SIX)}
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
                  <Item onClick={() => handleBet({
                    betId: uuidv4(),
                    betType: OperationType.EVEN
                  })}
                  >
                    <ShowBetDetail
                      title='EVEN'
                      betValue={displayBetAmount(OperationType.EVEN)}
                    />
                  </Item>
                </Grid>
                <Grid item xs={8}>
                  <Item onClick={() => handleBet({
                    betId: uuidv4(),
                    betType: OperationType.BIG
                  })}
                  >
                    <ShowBetDetail
                      title='BIG(11-17)'
                      betValue={displayBetAmount(OperationType.BIG)}
                    />
                  </Item>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <div style={{ display: 'flex', padding: '1px' }}>
            {
              SICBO_GAME_DATA.TRIPLE_SUM_DICE_ARRAY.map(
                (item) =>
                  <Item
                    onClick={() => handleBet({
                      betId: uuidv4(),
                      betType: `${OperationType.THREE_DICE_SUM}_${item}`
                    })}
                    key={item} height={80} margin={2}
                  >
                    <ShowBetDetail
                      title={item}
                      betValue={displayBetAmount(`${OperationType.THREE_DICE_SUM}_${item}`)}
                    />
                  </Item>
              )
            }
          </div>
          <div style={{ display: 'flex', padding: '1px' }}>
            {
              SICBO_GAME_DATA.DOUBLE_DICE_COMBINATION.map(
                ({ i, j }) =>
                  <Item
                    onClick={() => handleBet({
                      betId: uuidv4(),
                      betType: `${OperationType.DOUBLE_DICE_COMBINATION}_${i}_${j}`
                    })}
                    key={`${i}_${j}`} height={140} margin={2}
                  >
                    <ShowBetDetail
                      title={`${i}+ ${j}`}
                      betValue={displayBetAmount(`${OperationType.DOUBLE_DICE_COMBINATION}_${i}_${j}`)}
                    />
                  </Item>
              )
            }
          </div>
          <div style={{ display: 'flex', padding: '1px' }}>
            {
              SICBO_GAME_DATA.SINGLE_DICE_ARRAY.map(
                (item) =>
                  <Item
                    onClick={() => handleBet({
                      betId: uuidv4(),
                      betType: `${OperationType.SINGLE_DICE}_${item}`
                    })}
                    key={item} height={100} margin={4}
                  >
                    <ShowBetDetail
                      title={item}
                      betValue={displayBetAmount(`${OperationType.SINGLE_DICE}_${item}`)}
                    />
                  </Item>
              )
            }
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
