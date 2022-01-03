import { cloneDeep } from 'lodash'
import { useEffect, useReducer, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

export const useSicBoController = () => {
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
    if (!SBState.selectedBetCoin) {
      alert('Please select betting amount')
      return
    }

    if (!isBetActive) {
      return
    }
    const betObject = {
      betId: uuidv4(),
      betType,
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

  return {
    SBState,
    isBetActive,
    timer,
    SICBO_GAME_DATA,
    handleBet,
    handleSelectedBetCoin,
    handleUndo,
    handleDouble
  }
}
