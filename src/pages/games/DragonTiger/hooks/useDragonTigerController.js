import { cloneDeep } from 'lodash'
import { useContext, useEffect, useReducer, useState } from 'react'
import DragonTigerOperation from '../../../../utils/game-operations/DragonTiger'
import { v4 as uuidv4 } from 'uuid'
import { SocketContext } from '../../../../context/socket'
import { placeBetApi } from '../../../../utils/services/user.service'

export const useDragonTigerController = () => {
  const socket = useContext(SocketContext)
  const DRAGON_TIGER_GAME_DATA = {
    casinoTokens: [0.2, 1, 5, 20, 100, 200]
  }
  const GAME_ID = 1
  const [roundId, setRoundID] = useState(null)
  const [counter, setCounter] = useState(0)

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

  useEffect(() => {
    socket.emit('join_game', GAME_ID) // 1 game id for dragon tiger
  }, [])

  useEffect(() => {
    socket.on('game_round_data', (res) => {
      // Round id
      console.log('res', res)
      setRoundID(res.data.roundId)
    })
    socket.on('timer', (res) => {
      // {timer: 25}
      setCounter(res.timer)
      if (!res.timer && DTState.currentGameStates.length) {
        handlePlaceBetApi()
      }
    })
  }, [socket])

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

  const handlePlaceBetApi = async (data) => {
    const response = await placeBetApi(data)
    console.log(response)
  }

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

    const placeBetRequestPayload = [...DTState.currentGameStates, betObject]
    const request = {
      userId: 1,
      gameId: GAME_ID,
      roundId: roundId,
      placedBet: placeBetRequestPayload
    }
    handlePlaceBetApi(request)
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
    handleDouble,
    counter
  }
}
