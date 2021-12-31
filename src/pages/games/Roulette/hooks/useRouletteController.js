import { cloneDeep } from 'lodash'
import { useReducer, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

export const useRouletteController = () => {
  const OperationType = {
    singleNumberBet: 'bet_singleNumberBet',
    twoNumberBet: 'bet_twoNumberBet',
    threeNumberBet: 'bet_threeNumberBet',
    fourNumberBet: 'bet_fourNumberBet',
    sixNumberBet: 'bet_sixNumberBet',
    twelveNumberBet: 'bet_twelveNumberBet',
    rowViseBet: 'bet_rowViseBet',
    evenOddBet: 'bet_evenOddBet',
    rangeBet: 'bet_rangeBet',
    colorBet: 'bet_colorBet'
  }

  const hoverTypesAndStatus = {
    sideHover: 'sideHover',
    cornerHover: 'cornerHover',
    bottomHover: 'bottomHover'
  }
  const ROULETTE_GAME_DATA = {
    ROULETTE_NUMBER_ARRAY: [26, 4, 11, 15, 31, 35, 36, 14, 17, 3, 18, 1, 9, 23, 12, 16, 28, 33, 2, 20, 21, 25, 22, 32, 13, 30, 7, 24, 8, 19, 29, 10, 27, 34, 5, 6],
    RED_COLOR_BLOCK_ARRAY: [36, 17, 34, 1, 5, 28, 13, 23, 35, 11, 3, 7, 19, 10, 31, 27, 18, 8],
    BLOCK_12_ROW: [
      {
        label: '1st 12',
        block: 1
      },
      {
        label: '2nd 12',
        block: 2
      },
      {
        label: '3rd 12',
        block: 3
      }],
    LAST_BET_ROW: [
      {
        label: '1-18',
        type: OperationType.rangeBet
      },
      {
        label: 'EVEN',
        type: OperationType.evenOddBet
      },
      {
        label: 'RED',
        type: OperationType.colorBet
      },
      {
        label: 'BLACK',
        type: OperationType.colorBet
      },
      {
        label: 'ODD',
        type: OperationType.evenOddBet
      },
      {
        label: '19-36',
        type: OperationType.rangeBet
      }
    ],
    SIDE_ROW_BETS: [
      {
        label: 'row_1',
        value: '2 To 1',
        type: OperationType.rowViseBet
      },
      {
        label: 'row_2',
        value: '2 To 1',
        type: OperationType.rowViseBet
      },
      {
        label: 'row_3',
        value: '2 To 1',
        type: OperationType.rowViseBet
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

  const [isBetActive, setIsBetActive] = useState(true)

  // FIXME: remove with backend socket logic
  useEffect(() => {
    setInterval(() => {
      setIsBetActive((prev) => !prev)
    }, 10000)
  }, [])

  useEffect(
    () => {
      if (isBetActive) {
        setState({
          selectedBetCoin: null,
          previousGameStates: [],
          currentGameStates: []
        })
      }
    }, [isBetActive]
  )

  const handleBet = (item) => {
    if (!RState.selectedBetCoin) {
      alert('Please select betting amount')
      return
    }
    if (!isBetActive) {
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

  const displayBetAmount = (betType) => {
    let sum = 0
    RState.currentGameStates.forEach((item) => {
      if (item.betType === betType) {
        sum = sum + item.betAmount
      }
    })
    if (sum !== 0) return sum.toFixed(1).replace(/[.,]0$/, '')
    return ''
  }

  const formatTwoNumberBetOn = ({ item, index }) => {
    let betOn = `${item}_${ROULETTE_GAME_DATA.ROULETTE_NUMBER_ARRAY[index - 1]}`
    if (index === 0 || index === 12 || index === 24) {
      betOn = `${item}_0`
    }
    return betOn
  }

  const formatBottomBet = ({ item, index }) => {
    const betId = uuidv4()
    let betType = `${OperationType.twoNumberBet}_${item}_${ROULETTE_GAME_DATA.ROULETTE_NUMBER_ARRAY[index + 12]}`
    if (index > 23) {
      betType = `${OperationType.threeNumberBet}_${item}_${ROULETTE_GAME_DATA.ROULETTE_NUMBER_ARRAY[index - 12]}_${ROULETTE_GAME_DATA.ROULETTE_NUMBER_ARRAY[index - 24]}`
    }
    const returnObj = { betId, betType }
    return returnObj
  }

  const checkThreeOrFourBetPlaced = ({ item, index }) => {
    const betId = uuidv4()
    let betType = `${OperationType.fourNumberBet}_${ROULETTE_GAME_DATA.ROULETTE_NUMBER_ARRAY[index - 1]}_${item}_${ROULETTE_GAME_DATA.ROULETTE_NUMBER_ARRAY[index + 11]}_${ROULETTE_GAME_DATA.ROULETTE_NUMBER_ARRAY[index + 12]}`
    if (index === 0 || index === 12) {
      betType = `${OperationType.threeNumberBet}_0_${item}_${ROULETTE_GAME_DATA.ROULETTE_NUMBER_ARRAY[index + 12]}`
    } else if (index === 24) {
      betType = `${OperationType.fourNumberBet}_0_${ROULETTE_GAME_DATA.ROULETTE_NUMBER_ARRAY[index - 12]}_${ROULETTE_GAME_DATA.ROULETTE_NUMBER_ARRAY[index - 24]}_${item}`
    } else if (index > 24) {
      betType = `${OperationType.sixNumberBet}_${item}_${ROULETTE_GAME_DATA.ROULETTE_NUMBER_ARRAY[index - 1]}_${ROULETTE_GAME_DATA.ROULETTE_NUMBER_ARRAY[index - 12]}_${ROULETTE_GAME_DATA.ROULETTE_NUMBER_ARRAY[index - 13]}_${ROULETTE_GAME_DATA.ROULETTE_NUMBER_ARRAY[index - 24]}_${ROULETTE_GAME_DATA.ROULETTE_NUMBER_ARRAY[index - 25]}`
    }
    const returnObj = { betId, betType }
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
  }
}
