import { Grid } from '@mui/material'
import React, { useReducer } from 'react'
import { RouletteBlock } from '../../../components/RouletteBlock'
import { BetCoin, BettingAmountOptions, GameContainer, InfoContainer, OptionsContainer, PentagonBlock, PlacedBetCoin, Root, ZeroInfoContainer } from './Roulette.styles'
import { cloneDeep } from 'lodash'

export const Roulette = () => {
  const operationType = {
    singleNumberBet: 'singleNumberBet',
    twoNumberBet: 'twoNumberBet',
    fourNumberBet: 'fourNumberBet',
    sixNumberBet: 'sixNumberBet',
    twelveNumberBet: 'twelveNumberBet',
    rowViseBet: 'rowViseBet',
    evenOddBet: 'evenOddBet',
    rangeBet: 'rangeBet',
    colorBet: 'colorBet'
  }
  const ROULETTE_GAME_DATA = {
    ROULETTE_NUMBER_ARRAY: [26, 4, 11, 15, 31, 35, 36, 14, 17, 3, 18, 1, 9, 23, 12, 16, 28, 33, 2, 20, 21, 25, 22, 32, 13, 30, 7, 24, 8, 19, 29, 10, 27, 34, 5, 6],
    RED_COLOR_BLOCK_ARRAY: [36, 17, 34, 1, 5, 28, 13, 23, 35, 11, 3, 7, 19, 10, 31, 27, 18, 8],
    BLOCK_12_ROW: ['1st 12', '2nd 12', '3rd 12'],
    LAST_BET_ROW: [
      {
        label: '1-18',
        type: operationType.rangeBet
      },
      {
        label: 'EVEN',
        type: operationType.evenOddBet
      },
      {
        label: 'RED',
        type: operationType.colorBet
      },
      {
        label: 'BLACK',
        type: operationType.colorBet
      },
      {
        label: 'ODD',
        type: operationType.evenOddBet
      },
      {
        label: '19-36',
        type: operationType.rangeBet
      }
    ],
    SIDE_ROW_BETS: [
      {
        label: 'row-1',
        value: '2 To 1',
        type: operationType.rowViseBet
      },
      {
        label: 'row-2',
        value: '2 To 1',
        type: operationType.rowViseBet
      },
      {
        label: 'row-3',
        value: '2 To 1',
        type: operationType.rowViseBet
      }
    ],
    casinoTokens: [0.2, 1, 5, 20, 100, 200]
  }

  const initialState = {
    selectedBetCoin: null,
    previousGameStates: [],
    currentGameStates: []
  }

  const [RState, setState] = useReducer((state, newState) => ({
    ...state,
    ...newState
  }), initialState)

  const handleBet = (item) => {
    if (!RState.selectedBetCoin) {
      alert('Please select betting amount')
      return
    }
    const betObject = {
      ...item,
      betAmount: RState.selectedBetCoin
    }
    setState({
      previousGameStates: [...RState.previousGameStates, RState.currentGameStates],
      currentGameStates: [...RState.currentGameStates, betObject]
    })
  }

  const handleSelectedBetCoin = (betCoin) => {
    setState({ selectedBetCoin: betCoin })
  }

  const handleUndo = () => {
    const lastBet = RState.previousGameStates[RState.previousGameStates.length - 1]
    setState({ previousGameStates: RState.previousGameStates.slice(0, -1), currentGameStates: lastBet })
  }

  const handleDouble = () => {
    const clonedCurrentGameState = cloneDeep(RState.currentGameStates)
    const doubleStateOfCurrentGame = clonedCurrentGameState.map(item => {
      return { ...item, betAmount: item.betAmount * 2 }
    })
    setState({
      previousGameStates: [...RState.previousGameStates, clonedCurrentGameState],
      currentGameStates: doubleStateOfCurrentGame
    })
  }

  const displayBetAmount = (betOn) => {
    let sum = 0
    RState.currentGameStates.forEach((item) => {
      if (item.betOn === betOn) {
        sum = sum + item.betAmount
      }
    })
    return sum
  }

  return (
    <Root>
      <GameContainer>
        <Grid container>
          <Grid item xs={1}>
            <PentagonBlock onClick={() => handleBet({
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
                ROULETTE_GAME_DATA.ROULETTE_NUMBER_ARRAY.map((item) => {
                  if (ROULETTE_GAME_DATA.RED_COLOR_BLOCK_ARRAY.includes(item)) {
                    return (
                      <Grid item xs={1} key={item}>
                        <RouletteBlock
                          contentValue={item} blockColor='red'
                          singleBetPlaceFunction={() => handleBet({
                            type: operationType.singleNumberBet,
                            betOn: item
                          })}
                          placeBetCoin={displayBetAmount(item) ? <PlacedBetCoin>{displayBetAmount(item)}</PlacedBetCoin> : <></>}
                        />
                      </Grid>
                    )
                  } else {
                    return (
                      <Grid item xs={1} key={item}>
                        <RouletteBlock
                          contentValue={item} blockColor='black'
                          singleBetPlaceFunction={() => handleBet({
                            type: operationType.singleNumberBet,
                            betOn: item
                          })}
                          placeBetCoin={displayBetAmount(item) ? <PlacedBetCoin>{displayBetAmount(item)}</PlacedBetCoin> : <></>}
                        />
                      </Grid>
                    )
                  }
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
                  <Grid item key={item.label} xs={12} style={{ marginTop: '5px' }}>
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
