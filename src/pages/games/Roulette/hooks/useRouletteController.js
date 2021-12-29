import { cloneDeep } from 'lodash'
import { useReducer } from 'react'

export const useRouletteController = () => {
  const operationType = {
    singleNumberBet: 'singleNumberBet',
    twoNumberBet: 'twoNumberBet',
    threeNumberBet: 'threeNumberBet',
    fourNumberBet: 'fourNumberBet',
    sixNumberBet: 'sixNumberBet',
    twelveNumberBet: 'twelveNumberBet',
    rowViseBet: 'rowViseBet',
    evenOddBet: 'evenOddBet',
    rangeBet: 'rangeBet',
    colorBet: 'colorBet'
  }

  const hoverTypesAndStatus = {
    sideHover: 'sideHover',
    cornerHover: 'cornerHover',
    bottomHover: 'bottomHover'
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
    currentGameStates: [],
    hoverIndexArray: []
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

  const formatTwoNumberBetOn = ({ item, index }) => {
    let betOn = `${item}_${ROULETTE_GAME_DATA.ROULETTE_NUMBER_ARRAY[index - 1]}`
    if (index === 0 || index === 12 || index === 24) {
      betOn = `${item}_0`
    }
    return betOn
  }

  const formatBottomBet = ({ item, index }) => {
    let type = operationType.twoNumberBet
    let betOn = `${item}_${ROULETTE_GAME_DATA.ROULETTE_NUMBER_ARRAY[index + 12]}`
    if (index > 23) {
      betOn = `${item}_${ROULETTE_GAME_DATA.ROULETTE_NUMBER_ARRAY[index - 12]}_${ROULETTE_GAME_DATA.ROULETTE_NUMBER_ARRAY[index - 24]}`
      type = operationType.threeNumberBet
    }
    const returnObj = { type, betOn }
    return returnObj
  }

  const checkThreeOrFourBetPlaced = ({ item, index }) => {
    let type = operationType.fourNumberBet
    let betOn = `${ROULETTE_GAME_DATA.ROULETTE_NUMBER_ARRAY[index - 1]}_${item}_${ROULETTE_GAME_DATA.ROULETTE_NUMBER_ARRAY[index + 11]}_${ROULETTE_GAME_DATA.ROULETTE_NUMBER_ARRAY[index + 12]}`
    if (index === 0 || index === 12) {
      betOn = `0_${item}_${ROULETTE_GAME_DATA.ROULETTE_NUMBER_ARRAY[index + 12]}`
      type = operationType.threeNumberBet
    } else if (index === 24) {
      betOn = `0_${ROULETTE_GAME_DATA.ROULETTE_NUMBER_ARRAY[index - 12]}_${ROULETTE_GAME_DATA.ROULETTE_NUMBER_ARRAY[index - 24]}_${item}`
      type = operationType.fourNumberBet
    } else if (index > 24) {
      betOn = `${item}_${ROULETTE_GAME_DATA.ROULETTE_NUMBER_ARRAY[index - 1]}_${ROULETTE_GAME_DATA.ROULETTE_NUMBER_ARRAY[index - 12]}_${ROULETTE_GAME_DATA.ROULETTE_NUMBER_ARRAY[index - 13]}_${ROULETTE_GAME_DATA.ROULETTE_NUMBER_ARRAY[index - 24]}_${ROULETTE_GAME_DATA.ROULETTE_NUMBER_ARRAY[index - 25]}`
      type = operationType.sixNumberBet
    }
    const returnObj = { type, betOn }
    return returnObj
  }

  const handleHover = ({ index, hoverType }) => {
    let hoverIndexes = []
    if (hoverType === hoverTypesAndStatus.sideHover) {
      if (index === 0 || index === 12 || index === 24) {
        hoverIndexes = [...RState.hoverIndexArray, -1, index]
      } else {
        hoverIndexes = [...RState.hoverIndexArray, index - 1, index]
      }
    } else if (hoverType === hoverTypesAndStatus.cornerHover) {
      if (index === 0 || index === 12) {
        hoverIndexes = [...RState.hoverIndexArray, -1, index, index + 12]
      } else if (index === 24) {
        hoverIndexes = [...RState.hoverIndexArray, -1, index - 12, index - 24, index]
      } else if (index > 24) {
        hoverIndexes = [...RState.hoverIndexArray, index, index - 1, index - 12, index - 13, index - 24, index - 25]
      } else {
        hoverIndexes = [...RState.hoverIndexArray, index, index - 1, index + 12, index + 11]
      }
    } else if (hoverType === hoverTypesAndStatus.bottomHover) {
      if (index > 23) {
        hoverIndexes = [...RState.hoverIndexArray, index, index - 12, index - 24]
      } else {
        hoverIndexes = [...RState.hoverIndexArray, index, index + 12]
      }
    }
    setState({ hoverIndexArray: hoverIndexes })
  }

  return {
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
  }
}
