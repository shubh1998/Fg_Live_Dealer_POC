import { cloneDeep } from 'lodash'
import { useEffect, useReducer, useState } from 'react'

export const useDragonTigerController = () => {
  const OperationType = {
    TIGER: 'TIGER',
    DRAGON: 'DRAGON',
    TIE: 'TIE',
    SUITED_TIE: 'SUITED_TIE'
  }

  const DRAGON_TIGER_GAME_DATA = {
    casinoTokens: [0.2, 1, 5, 20, 100, 200]
  }

  const initialState = {
    selectedBetCoin: null,
    previousGameStates: [],
    currentGameStates: []
  }

  const [DTState, setState] = useReducer((state, newState) => ({
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
    if (!DTState.selectedBetCoin) {
      alert('Please select betting amount')
      return
    }
    if (!isBetActive) {
      return
    }
    const betObject = {
      ...item,
      betAmount: DTState.selectedBetCoin
    }
    setState({
      previousGameStates: [...DTState.previousGameStates, DTState.currentGameStates],
      currentGameStates: [...DTState.currentGameStates, betObject]
    })
  }

  const handleSelectedBetCoin = (betCoin) => {
    setState({ selectedBetCoin: betCoin })
  }

  const handleUndo = () => {
    const lastBet = DTState.previousGameStates[DTState.previousGameStates.length - 1]
    setState({ previousGameStates: DTState.previousGameStates.slice(0, -1), currentGameStates: lastBet })
  }

  const handleDouble = () => {
    const clonedCurrentGameState = cloneDeep(DTState.currentGameStates)
    const doubleStateOfCurrentGame = clonedCurrentGameState.map(item => {
      return { ...item, betAmount: item.betAmount * 2 }
    })
    setState({
      previousGameStates: [...DTState.previousGameStates, clonedCurrentGameState],
      currentGameStates: doubleStateOfCurrentGame
    })
  }

  const displayBetAmount = (betType) => {
    let sum = 0
    DTState.currentGameStates.forEach((item) => {
      if (item.betType === betType) {
        sum = sum + item.betAmount
      }
    })
    if (sum !== 0) return sum.toFixed(1).replace(/[.,]0$/, '')
    return ''
  }

  return {
    DTState,
    isBetActive,
    OperationType,
    DRAGON_TIGER_GAME_DATA,
    handleBet,
    handleSelectedBetCoin,
    handleUndo,
    handleDouble,
    displayBetAmount
  }
}
