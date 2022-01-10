import { cloneDeep, isNumber } from 'lodash'
import { useReducer, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import RouletteOperations, { DoubleChipsCallBets, RouletteCallBets } from '../../../../utils/game-operations/Roulette'

export const useRouletteController = () => {
  const hoverTypesAndStatus = {
    sideHover: 'sideHover',
    cornerHover: 'cornerHover',
    bottomHover: 'bottomHover'
  }
  const ROULETTE_GAME_DATA = {
    ROULETTE_NUMBER_ARRAY: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35, 1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34],
    RED_COLOR_BLOCK_ARRAY: [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36],
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
    casinoTokens: [0.2, 1, 5, 20, 100, 200],
    ROULETTE_CALLBETS_FIRST_ROW: [16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12],
    ROULETTE_CALLBETS_SECOND_ROW_FIRST_COL: [24, 5, 10, 23, 8, 30],
    ROULETTE_CALLBETS_SECOND_ROW_LAST_COL: [35, 3, 26, 0, 32],
    ROULETTE_CALLBETS_LAST_ROW: [11, 36, 13, 27, 6, 34, 17, 25, 2, 21, 4, 19, 15],
    ROULETTE_WHEEL_SEQUENCE: [16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26, 0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24]
  }

  const initialState = {
    selectedBetCoin: null,
    previousGameStates: [],
    currentGameStates: [],
    hoverIndexArray: [],
    hoverIndexCallBetArray: [],
    count: 0
  }

  const [RState, setState] = useReducer((state, newState) => ({
    ...state,
    ...newState
  }), initialState)

  const [isBetActive, setIsBetActive] = useState(true)
  const [timer, setTimer] = useState(10)

  const setCount = (value) => {
    setState({
      count: value
    })
  }

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

  const handleCallBet = (callBet, value) => {
    if (!RState.selectedBetCoin) {
      alert('Please select betting amount')
      return
    }
    if (!isBetActive) {
      return
    }
    if (RouletteCallBets[callBet]) {
      const newCurrentGameState = RouletteCallBets[callBet].map((item) => {
        const newValues = {
          betId: uuidv4(),
          betType: item,
          betAmount: DoubleChipsCallBets.includes(item) ? RState.selectedBetCoin * 2 : RState.selectedBetCoin
        }
        return newValues
      })

      setState({
        previousGameStates: [...RState.previousGameStates, RState.currentGameStates],
        currentGameStates: [...RState.currentGameStates, ...newCurrentGameState]
      })
    } else {
      const ind = ROULETTE_GAME_DATA.ROULETTE_WHEEL_SEQUENCE.indexOf(value)
      const length = 37
      const singleBetUpdated = []
      for (let i = ind - RState.count; i <= ind + RState.count; i++) {
        const item = i >= 37 ? ROULETTE_GAME_DATA.ROULETTE_WHEEL_SEQUENCE[i % length] : ROULETTE_GAME_DATA.ROULETTE_WHEEL_SEQUENCE.at(i)
        singleBetUpdated.push({
          betId: uuidv4(),
          betType: `${RouletteOperations.singleNumberBet}_${item}`,
          betAmount: RState.selectedBetCoin
        })
      }
      setState({
        previousGameStates: [...RState.previousGameStates, RState.currentGameStates],
        currentGameStates: [...RState.currentGameStates, ...singleBetUpdated]
      })
    }
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

  const handleCallBetHover = ({ value, mouseIn = false }) => {
    const hoverIndexesCallBet = []
    const hoverIndexes = []
    if (isNumber(value)) {
      if (mouseIn) {
        const ind = ROULETTE_GAME_DATA.ROULETTE_WHEEL_SEQUENCE.indexOf(value)
        const length = 37
        for (let i = ind - RState.count; i <= ind + RState.count; i++) {
          const index = i < 0 ? i + length : i % length
          const item = ROULETTE_GAME_DATA.ROULETTE_WHEEL_SEQUENCE[index]
          // Indexes of ROULETTE_WHEEL_SEQUENCE
          hoverIndexesCallBet.push(index)
          // Indexes of ROULETTE_NUMBER_ARRAY
          hoverIndexes.push(ROULETTE_GAME_DATA.ROULETTE_NUMBER_ARRAY.indexOf(item))
        }
      }
    } else {
      value.forEach((item) => {
        const indCallBet = ROULETTE_GAME_DATA.ROULETTE_WHEEL_SEQUENCE.indexOf(item)
        const ind = ROULETTE_GAME_DATA.ROULETTE_NUMBER_ARRAY.indexOf(item)

        hoverIndexesCallBet.push(indCallBet)
        hoverIndexes.push(ind)
      })
    }
    setState({
      hoverIndexCallBetArray: hoverIndexesCallBet,
      hoverIndexArray: hoverIndexes
    })
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
    setCount,
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
    handleHover,
    handleCallBet,
    handleCallBetHover
  }
}
