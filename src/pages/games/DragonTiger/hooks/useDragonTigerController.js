import { cloneDeep } from 'lodash'
import { useEffect, useReducer, useState } from 'react'
import DragonTigerOperation from '../../../../utils/game-operations/DragonTiger'
import { v4 as uuidv4 } from 'uuid'

export const useDragonTigerController = () => {
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
    if (!DTState.selectedBetCoin) {
      alert('Please select betting amount')
      return
    }
    if (!isBetActive) {
      return
    }
    const betObject = {
      betId: uuidv4(),
      betType,
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

  return {
    DTState,
    isBetActive,
    timer,
    DragonTigerOperation,
    DRAGON_TIGER_GAME_DATA,
    handleBet,
    handleSelectedBetCoin,
    handleUndo,
    handleDouble
  }
}
