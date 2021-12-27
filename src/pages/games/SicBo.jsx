import React, { useReducer, useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { v4 as uuidv4 } from 'uuid'
import { ShowBetDetail } from '../../components/ShowBetDetail'
import { CountDownTimer } from '../../components/CountDownTimer/CountDownTimer'

const OperationType = {
  oddEven: 'oddEven',
  bigSmall: 'bigSmall',
  exactDouble: 'exactDouble',
  exactTriple: 'exactTriple',
  anyTriple: 'anyTriple',
  allDiceSum: 'allDiceSum',
  twoDiceBet: 'twoDiceBet',
  oneDiceBet: 'oneDiceBet',
  double: 'double'
}

const TRIPLE_SUM_DICE_ARRAY = Array.from({ length: 14 }, (_, i) => i + 4)
const SINGLE_DICE_ARRAY = Array.from({ length: 6 }, (_, i) => i + 1)

const DOUBLE_DICE_COMBINATION = []
for (let i = 1; i <= 6; i++) {
  for (let j = i + 1; j <= 6; j++) {
    DOUBLE_DICE_COMBINATION.push({
      i, j
    })
  }
}

const DOUBLE_DICE_INITIAL_VALUE = {}

DOUBLE_DICE_COMBINATION.forEach(({ i, j }) => {
  DOUBLE_DICE_INITIAL_VALUE[`${i}_${j}`] = 0
})

const casinoTokens = [0.2, 1, 5, 20, 100, 200]

const initialState = {
  selectedBetCoin: null,
  oddEven: { odd: 0, even: 0 },
  bigSmall: { big: 0, small: 0 },
  exactDouble: { one: 0, two: 0, three: 0, four: 0, five: 0, six: 0 },
  exactTriple: { one: 0, two: 0, three: 0, four: 0, five: 0, six: 0 },
  anyTriple: { value: 0 },
  allDiceSum: {
    4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0, 14: 0, 15: 0, 16: 0, 17: 0
  },
  twoDiceBet: DOUBLE_DICE_INITIAL_VALUE,
  oneDiceBet: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
  betSequence: []
}

const SicBo = () => {
  const [isBetActive, setIsBetActive] = useState(true)
  const [SBState, setState] = useReducer(
    (state, newState) => ({
      ...state,
      ...newState
    }),
    initialState
  )

  useEffect(() => {
    setInterval(() => {
      setIsBetActive((prev) => !prev)
    }, 10000)
  }, [])

  useEffect(
    () => {
      if (isBetActive) {
        setState(initialState)
      }
    }, [isBetActive]
  )

  const handlerUndoOperation = () => {
    const lastBet = SBState.betSequence[SBState.betSequence.length - 1]
    setState({ betSequence: SBState.betSequence.slice(0, -1) })

    if (lastBet.type !== OperationType.double) {
      setState({
        [lastBet.type]: { ...SBState[lastBet.type], [lastBet.betOn]: SBState[lastBet.type][lastBet.betOn] - lastBet.betValue }
      })
    } else if (lastBet.type === OperationType.double) {
      for (const property in SBState) {
        if (property !== 'selectedBetCoin' && property !== 'betSequence') {
          const newObj = {}
          for (const innerProp in SBState[property]) {
            newObj[innerProp] = SBState[property][innerProp] / 2
          }
          setState({
            [property]: newObj
          })
        }
      }
    }
  }

  const handleBet = (type, betOn) => {
    if (!isBetActive) {
      return
    }
    if (!SBState.selectedBetCoin) {
      alert('Please select betting amount')
      return
    }
    if (type !== OperationType.double) {
      setState({
        [type]: { ...SBState[type], [betOn]: SBState[type][betOn] + SBState.selectedBetCoin }
      })
    } else if (type === OperationType.double) {
      for (const property in SBState) {
        if (property !== 'selectedBetCoin' && property !== 'betSequence') {
          const newObj = {}
          for (const innerProp in SBState[property]) {
            newObj[innerProp] = SBState[property][innerProp] * 2
          }
          setState({
            [property]: newObj
          })
        }
      }
    }

    setState({
      betSequence: [
        ...SBState.betSequence,
        { id: uuidv4(), type, betOn, betValue: SBState.selectedBetCoin }
      ]
    })
  }
  const handleSelectedBetCoin = (betCoin) => {
    setState({ selectedBetCoin: betCoin })
  }

  return (
    <Root>
      <GameContainer>
        <Notifier isActive={isBetActive}>
          {isBetActive ? 'Betting time is ACTIVE' : 'Betting time is CLOSE'}
        </Notifier>
        <Box sx={{ flexGrow: 1 }}>
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
      <OptionsContainer>
        <BettingAmountOptions className='casino-coin'>
          <button
            disabled={!SBState.betSequence.length || !isBetActive}
            onClick={handlerUndoOperation}
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

export default SicBo

const Root = styled.div({
  // display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
})

const Item = styled.div(({ height, width, margin }) => ({
  textAlign: 'center',
  border: '3px solid gray',
  backgroundColor: 'wheat',
  justifyContent: 'center',
  width: width || '100%',
  margin: margin || 'auto',
  height: height || 170,
  display: 'flex',
  alignItems: 'center'
}))

const InnerItem = styled.div({
  display: 'block'
})

const GameContainer = styled.div({
  width: 1500,
  margin: 50,
  border: '4px solid black'
})

const OptionsContainer = styled.div({
  border: '1px solid black',
  padding: '2%',
  width: 'fit-content',
  margin: 'auto'
})

export const BettingAmountOptions = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  width: 400,
  margin: 'auto'
})

export const BetCoin = styled.button(({ selectedButton }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: selectedButton ? '2px solid black' : 'none'
}))

export const TimerDiv = styled.div({
  margin: '20px auto 0',
  width: 50
})

export const Notifier = styled.strong(({ isActive }) => ({
  textAlign: 'center',
  display: 'block',
  color: isActive ? 'green' : 'red'
}))
