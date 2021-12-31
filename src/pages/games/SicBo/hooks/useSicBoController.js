import { cloneDeep } from 'lodash'
import { useEffect, useReducer, useState } from 'react'

export const useSicBoController = () => {
  const OperationType = {
    ODD: 'ODD',
    EVEN: 'EVEN',
    BIG: 'BIG',
    SMALL: 'SMALL',
    DOUBLE_ONE: 'bet_1_1',
    DOUBLE_TWO: 'bet_2_2',
    DOUBLE_THREE: 'bet_3_3',
    DOUBLE_FOUR: 'bet_4_4',
    DOUBLE_FIVE: 'bet_5_5',
    DOUBLE_SIX: 'bet_6_6',
    TRIPLE_ONE: 'bet_1_1_1',
    TRIPLE_TWO: 'bet_2_2_2',
    TRIPLE_THREE: 'bet_3_3_3',
    TRIPLE_FOUR: 'bet_4_4_4',
    TRIPLE_FIVE: 'bet_5_5_5',
    TRIPLE_SIX: 'bet_6_6_6',
    TRIPLE_ANY: 'bet_any_triple',
    THREE_DICE_SUM: 'bet_three_dice_sum',
    DOUBLE_DICE_COMBINATION: 'bet_double_dice_combination',
    SINGLE_DICE: 'bet_single_dice'
  }

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

  const SICBO_GAME_DATA = {
    casinoTokens: [0.2, 1, 5, 20, 100, 200],
    TRIPLE_SUM_DICE_ARRAY: Array.from({ length: 14 }, (_, i) => i + 4),
    SINGLE_DICE_ARRAY: Array.from({ length: 6 }, (_, i) => i + 1),
    DOUBLE_DICE_INITIAL_VALUE,
    DOUBLE_DICE_COMBINATION
  }

  const initialState = {
    selectedBetCoin: null,
    previousGameStates: [],
    currentGameStates: []
  }

  const [SBState, setState] = useReducer((state, newState) => ({
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
    if (!SBState.selectedBetCoin) {
      alert('Please select betting amount')
      return
    }
    const betObject = {
      ...item,
      betAmount: SBState.selectedBetCoin
    }
    setState({
      previousGameStates: [...SBState.previousGameStates, SBState.currentGameStates],
      currentGameStates: [...SBState.currentGameStates, betObject]
    })
  }

  const handleSelectedBetCoin = (betCoin) => {
    setState({ selectedBetCoin: betCoin })
  }

  const handleUndo = () => {
    const lastBet = SBState.previousGameStates[SBState.previousGameStates.length - 1]
    setState({ previousGameStates: SBState.previousGameStates.slice(0, -1), currentGameStates: lastBet })
  }

  const handleDouble = () => {
    const clonedCurrentGameState = cloneDeep(SBState.currentGameStates)
    const doubleStateOfCurrentGame = clonedCurrentGameState.map(item => {
      return { ...item, betAmount: item.betAmount * 2 }
    })
    setState({
      previousGameStates: [...SBState.previousGameStates, clonedCurrentGameState],
      currentGameStates: doubleStateOfCurrentGame
    })
  }

  const displayBetAmount = (betType) => {
    let sum = 0
    SBState.currentGameStates.forEach((item) => {
      if (item.betType === betType) {
        sum = sum + item.betAmount
      }
    })
    if (sum !== 0) return sum.toFixed(1).replace(/[.,]0$/, '')
    return ''
  }

  return {
    SBState,
    isBetActive,
    OperationType,
    SICBO_GAME_DATA,
    handleBet,
    handleSelectedBetCoin,
    handleUndo,
    handleDouble,
    displayBetAmount
  }
}
