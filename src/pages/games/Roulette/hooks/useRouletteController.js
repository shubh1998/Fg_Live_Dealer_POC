import { cloneDeep } from 'lodash'
import { useReducer, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import RouletteOperations from '../../../../utils/game-operations/Roulette'

export const useRouletteController = () => {
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
        type: RouletteOperations.rangeBet
      },
      {
        label: 'EVEN',
        type: RouletteOperations.evenOddBet
      },
      {
        label: 'RED',
        type: RouletteOperations.colorBet
      },
      {
        label: 'BLACK',
        type: RouletteOperations.colorBet
      },
      {
        label: 'ODD',
        type: RouletteOperations.evenOddBet
      },
      {
        label: '19-36',
        type: RouletteOperations.rangeBet
      }
    ],
    SIDE_ROW_BETS: [
      {
        label: 'row_1',
        value: '2 To 1',
        type: RouletteOperations.rowViseBet
      },
      {
        label: 'row_2',
        value: '2 To 1',
        type: RouletteOperations.rowViseBet
      },
      {
        label: 'row_3',
        value: '2 To 1',
        type: RouletteOperations.rowViseBet
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
  const [timer, setTimer] = useState(10)

  useEffect(() => {
    setInterval(() => {
      setTimer((prev) => prev - 1)
    }, 1000)
  }, [])

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
        setTimer(10)
      }
    }, [isBetActive]
  )

  const handleBet = ({ betType }) => {
    if (!RState.selectedBetCoin) {
      alert('Please select betting amount')
      return
    }
    if (!isBetActive) {
      return
    }
    const betObject = {
      betId: uuidv4(),
      betType,
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

  const formatTwoNumberBetOn = ({ item, index }) => {
    let betOn = `${item}_${ROULETTE_GAME_DATA.ROULETTE_NUMBER_ARRAY[index - 1]}`
    if (index === 0 || index === 12 || index === 24) {
      betOn = `${item}_0`
    }
    return betOn
  }

  const formatBottomBet = ({ item, index }) => {
    let betType = `${RouletteOperations.twoNumberBet}_${item}_${ROULETTE_GAME_DATA.ROULETTE_NUMBER_ARRAY[index + 12]}`
    if (index > 23) {
      betType = `${RouletteOperations.threeNumberBet}_${item}_${ROULETTE_GAME_DATA.ROULETTE_NUMBER_ARRAY[index - 12]}_${ROULETTE_GAME_DATA.ROULETTE_NUMBER_ARRAY[index - 24]}`
    }
    return betType
  }

  const checkThreeOrFourBetPlaced = ({ item, index }) => {
    let betType = `${RouletteOperations.fourNumberBet}_${ROULETTE_GAME_DATA.ROULETTE_NUMBER_ARRAY[index - 1]}_${item}_${ROULETTE_GAME_DATA.ROULETTE_NUMBER_ARRAY[index + 11]}_${ROULETTE_GAME_DATA.ROULETTE_NUMBER_ARRAY[index + 12]}`
    if (index === 0 || index === 12) {
      betType = `${RouletteOperations.threeNumberBet}_0_${item}_${ROULETTE_GAME_DATA.ROULETTE_NUMBER_ARRAY[index + 12]}`
    } else if (index === 24) {
      betType = `${RouletteOperations.fourNumberBet}_0_${ROULETTE_GAME_DATA.ROULETTE_NUMBER_ARRAY[index - 12]}_${ROULETTE_GAME_DATA.ROULETTE_NUMBER_ARRAY[index - 24]}_${item}`
    } else if (index > 24) {
      betType = `${RouletteOperations.sixNumberBet}_${item}_${ROULETTE_GAME_DATA.ROULETTE_NUMBER_ARRAY[index - 1]}_${ROULETTE_GAME_DATA.ROULETTE_NUMBER_ARRAY[index - 12]}_${ROULETTE_GAME_DATA.ROULETTE_NUMBER_ARRAY[index - 13]}_${ROULETTE_GAME_DATA.ROULETTE_NUMBER_ARRAY[index - 24]}_${ROULETTE_GAME_DATA.ROULETTE_NUMBER_ARRAY[index - 25]}`
    }
    return betType
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
    handleHover
  }
}
