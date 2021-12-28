import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { ShowBetDetail } from '../../../components/ShowBetDetail'
import { CountDownTimer } from '../../../components/CountDownTimer'
import { useSicboController } from './hooks/useSicboController'
import { Notifier } from '../../../components/Notifier'
import { BetCoin, BettingAmountOptions, GameContainer, InnerItem, Item, OptionsContainer, Root, TimerDiv } from './Sicbo.Styles'

export const SicBo = () => {
  const {
    isBetActive,
    SBState,
    OperationType,
    TRIPLE_SUM_DICE_ARRAY,
    SINGLE_DICE_ARRAY,
    casinoTokens,
    handleUndoOperation,
    handleBet,
    handleSelectedBetCoin,
    DOUBLE_DICE_COMBINATION
  } = useSicboController()

  return (
    <Root>
      <GameContainer>
        <Box>
          <Grid container spacing={1}>
            <Grid item xs={2}>
              <Grid container spacing={1}>
                <Grid item xs={8}>
                  <Item onClick={() => handleBet(OperationType.bigSmall, 'small')}>
                    <ShowBetDetail
                      title='Small(4-10)'
                      betValue={SBState.bigSmall.small}
                    />
                  </Item>
                </Grid>
                <Grid item xs={4}>
                  <Item
                    onClick={() => handleBet(OperationType.oddEven, 'odd')}
                  >
                    <InnerItem>
                      <p>Odd</p>
                      <b>{SBState.oddEven.odd !== 0 && SBState.oddEven.odd}</b>
                    </InnerItem>
                  </Item>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={8}>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Grid container spacing={1}>
                    <Grid item xs={4}>
                      <Item onClick={() => handleBet(OperationType.exactDouble, 'one')}>
                        <InnerItem>
                          <p>Double 1</p>
                          <b>{SBState.exactDouble.one !== 0 && SBState.exactDouble.one}</b>
                        </InnerItem>
                      </Item>
                    </Grid>
                    <Grid item xs={4}>
                      <Item onClick={() => handleBet(OperationType.exactDouble, 'two')}>
                        <InnerItem>
                          <p>Double 2</p>
                          <b>{SBState.exactDouble.two !== 0 && SBState.exactDouble.two}</b>
                        </InnerItem>
                      </Item>
                    </Grid>
                    <Grid item xs={4}>
                      <Item onClick={() => handleBet(OperationType.exactDouble, 'three')}>
                        <InnerItem>
                          <p>Double 3</p>
                          <b>{SBState.exactDouble.three !== 0 && SBState.exactDouble.three}</b>
                        </InnerItem>
                      </Item>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <Grid container spacing={1}>
                    <Grid item xs={4}>
                      <Grid container direction='column' spacing={1}>
                        <Grid item xs={12}>
                          <Item onClick={() => handleBet(OperationType.exactTriple, 'one')} height={47}>
                            <InnerItem>
                              <div>Triple 1</div>
                              <b>{SBState.exactTriple.one !== 0 && SBState.exactTriple.one}</b>
                            </InnerItem>
                          </Item>
                        </Grid>
                        <Grid item xs={12}>
                          <Item onClick={() => handleBet(OperationType.exactTriple, 'two')} height={47}>
                            <InnerItem>
                              <div>Triple 2</div>
                              <b>{SBState.exactTriple.two !== 0 && SBState.exactTriple.two}</b>
                            </InnerItem>
                          </Item>
                        </Grid>
                        <Grid item xs={12}>
                          <Item onClick={() => handleBet(OperationType.exactTriple, 'three')} height={47}>
                            <InnerItem>
                              <div>Triple 3</div>
                              <b>{SBState.exactTriple.three !== 0 && SBState.exactTriple.three}</b>
                            </InnerItem>
                          </Item>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={4}>
                      <Grid container direction='column' spacing={1}>
                        <Grid item xs={12}>
                          <Item onClick={() => handleBet(OperationType.anyTriple, 'value')} height={168}>
                            <InnerItem>
                              <p>Any Triple</p>
                              <b>{SBState.anyTriple.value !== 0 && SBState.anyTriple.value}</b>
                            </InnerItem>
                          </Item>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={4}>
                      <Grid container spacing={1}>
                        <Grid item xs={12}>
                          <Item onClick={() => handleBet(OperationType.exactTriple, 'four')} height={47}>
                            <InnerItem>
                              <div>Triple 4</div>
                              <b>{SBState.exactTriple.four !== 0 && SBState.exactTriple.four}</b>
                            </InnerItem>
                          </Item>
                        </Grid>
                        <Grid item xs={12}>
                          <Item onClick={() => handleBet(OperationType.exactTriple, 'five')} height={47}>
                            <InnerItem>
                              <div>Triple 5</div>
                              <b>{SBState.exactTriple.five !== 0 && SBState.exactTriple.five}</b>
                            </InnerItem>
                          </Item>
                        </Grid>
                        <Grid item xs={12}>
                          <Item onClick={() => handleBet(OperationType.exactTriple, 'six')} height={47}>
                            <InnerItem>
                              <div>Triple 6</div>
                              <b>{SBState.exactTriple.six !== 0 && SBState.exactTriple.six}</b>
                            </InnerItem>
                          </Item>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <Grid container spacing={1}>
                    <Grid item xs={4}>
                      <Item onClick={() => handleBet(OperationType.exactDouble, 'four')}>
                        <InnerItem>
                          <p>Double 4</p>
                          <b>{SBState.exactDouble.four !== 0 && SBState.exactDouble.four}</b>
                        </InnerItem>
                      </Item>
                    </Grid>
                    <Grid item xs={4}>
                      <Item onClick={() => handleBet(OperationType.exactDouble, 'five')}>
                        <InnerItem>
                          <p>Double 5</p>
                          <b>{SBState.exactDouble.five !== 0 && SBState.exactDouble.five}</b>
                        </InnerItem>
                      </Item>
                    </Grid>
                    <Grid item xs={4}>
                      <Item onClick={() => handleBet(OperationType.exactDouble, 'six')}>
                        <InnerItem>
                          <p>Double 6</p>
                          <b>{SBState.exactDouble.six !== 0 && SBState.exactDouble.six}</b>
                        </InnerItem>
                      </Item>
                    </Grid>
                  </Grid>

                </Grid>

              </Grid>

            </Grid>
            <Grid item xs={2}>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Item onClick={() => handleBet(OperationType.oddEven, 'even')}>
                    <InnerItem>
                      <p>Even</p>
                      <b>{SBState.oddEven.even !== 0 && SBState.oddEven.even}</b>
                    </InnerItem>
                  </Item>
                </Grid>
                <Grid item xs={8}>
                  <Item
                    onClick={() => handleBet(OperationType.bigSmall, 'big')}
                  >
                    <InnerItem>
                      <p>Big(11-17)</p>
                      <b>{SBState.bigSmall.big !== 0 && SBState.bigSmall.big}</b>
                    </InnerItem>
                  </Item>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <div style={{ display: 'flex', padding: '1px' }}>
            {
              TRIPLE_SUM_DICE_ARRAY.map(
                (item) =>
                  <Item
                    onClick={() => handleBet(OperationType.allDiceSum, item)}
                    key={item} height={80} margin={2}
                  >
                    <InnerItem>
                      <p>{item}</p>
                      <b>{SBState[OperationType.allDiceSum][item] !== 0 && SBState[OperationType.allDiceSum][item]}</b>
                    </InnerItem>
                  </Item>
              )
            }
          </div>
          <div style={{ display: 'flex', padding: '1px' }}>
            {
              DOUBLE_DICE_COMBINATION.map(
                ({ i, j }) =>
                  <Item
                    onClick={() => handleBet(OperationType.twoDiceBet, `${i}_${j}`)}
                    key={`${i}_${j}`} height={140} margin={2}
                  >
                    <InnerItem>
                      <p>{i}+{j}</p>
                      <b>{SBState[OperationType.twoDiceBet][`${i}_${j}`] !== 0 && SBState[OperationType.twoDiceBet][`${i}_${j}`]}</b>
                    </InnerItem>
                  </Item>
              )
            }
          </div>
          <div style={{ display: 'flex', padding: '1px' }}>
            {
              SINGLE_DICE_ARRAY.map(
                (item) =>
                  <Item
                    onClick={() => handleBet(OperationType.oneDiceBet, item)}
                    key={item} height={100} margin={4}
                  >
                    <InnerItem>
                      <p>{item}</p>
                      <b>{SBState[OperationType.oneDiceBet][item] !== 0 && SBState[OperationType.oneDiceBet][item]}</b>
                    </InnerItem>
                  </Item>
              )
            }
          </div>
        </Box>
      </GameContainer>
      <Notifier isActive={isBetActive} />
      <OptionsContainer>
        <BettingAmountOptions className='casino-coin'>
          <button
            disabled={!SBState.betSequence.length || !isBetActive}
            onClick={handleUndoOperation}
          >
            Undo
          </button>

          {casinoTokens.map((token, index) => (
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
            onClick={() => handleBet(OperationType.double, 'double')}
            disabled={!SBState.betSequence.length || !isBetActive}
          >
            Double
          </button>
        </BettingAmountOptions>
      </OptionsContainer>
      {isBetActive && (
        <TimerDiv>
          <CountDownTimer countDownTime={10} />
        </TimerDiv>
      )}
    </Root>
  )
}
