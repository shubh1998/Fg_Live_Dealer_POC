import { chain, cloneDeep, sumBy } from 'lodash'
import { useEffect, useMemo, useReducer, useState } from 'react'
import DragonTigerOperation from '../../../../utils/game-operations/DragonTiger'
import { gameResult, getPreGameDataApi, placeBetApi, stopRound } from '../../../../API/services/dragon-tiger.service'
import { GAMEID } from '../../../../utils/game-ids'
import { useSocketIO } from '../../../../utils/custom-hooks/useSocketIO'
let IntervalTimer
let count = 0
const initialState = {
  selectedBetCoin: null,
  previousGameStates: [],
  currentGameStates: [],
  result: null,
  gameData: {
    gameId: null,
    gameName: 'Dragon Tiger',
    minimumBet: null,
    availableCoins: [],
    gameRules: []
  },
  round: {
    newRoundId: null,
    roundStatus: null,
    roundWinner: null
  },
  dragonCard: null,
  tigerCard: null,
  lastBet: []
}

export const useDragonTigerController = () => {
  const socket = useMemo(() => useSocketIO(), [])
  const [timer, setTimer] = useState(0)
  const [DTState, setState] = useReducer((state, newState) => ({
    ...state,
    ...newState
  }), initialState)

  useEffect(() => {
    fetchGameData()
    socket.emit('join_game', GAMEID.DRAGON_TIGER_ID) // 1 game id for dragon tiger
    return () => {
      socket.disconnect()
    }
  }, [])

  useEffect(() => {
    socket.on('game_round_data', (res) => {
      if (res) {
        setState({ round: res })
      }
    })
    socket.on('timer', (res) => {
      if (count === 0) {
        setTimer(res.timer)
        count++
        IntervalTimer = setInterval(() => {
          setTimer((prev) => {
            return (prev - 1)
          })
        }, 1000)
      }
    })
    socket.on('dragon_card', (dragonCard) => {
      setState({ dragonCard })
    })
    socket.on('tiger_card', (tigerCard) => {
      setState({ tigerCard })
    })
  }, [socket])

  useEffect(async () => {
    if (DTState.dragonCard && DTState.tigerCard && DTState.round.newRoundId) {
      await stopRound({ gameId: GAMEID.DRAGON_TIGER_ID, roundId: DTState.round.newRoundId })
      setTimeout(async () => {
        const result = await gameResult({ userId: 1, gameId: GAMEID.DRAGON_TIGER_ID, roundId: DTState.round.newRoundId })
        setState({ result })
      }, 5000)
      setTimeout(() => {
        setState({ ...initialState, gameData: DTState.gameData, lastBet: DTState.currentGameStates })
      }, 10 * 1000)
    }
  }, [DTState.dragonCard, DTState.tigerCard])

  useEffect(() => {
    if (timer === 0) {
      clearInterval(IntervalTimer)
      count = 0
    }
    if (timer === 1) {
      handlePlaceBetApi()
    }
  }, [timer])

  const fetchGameData = async () => {
    const response = await getPreGameDataApi({ userId: 1, gameId: GAMEID.DRAGON_TIGER_ID })
    setState({ gameData: response })
  }

  const handlePlaceBetApi = async () => {
    const result = chain(DTState.currentGameStates)
      .groupBy('betId')
      .map((group) => ({
        betId: group[0].betId,
        betType: group[0].betType,
        betAmount: sumBy(group, 'betAmount')
      }))
      .value()
    if (DTState.round && DTState.round.newRoundId && result.length) {
      setTimeout(async () => {
        await placeBetApi({
          userId: 1,
          gameId: GAMEID.DRAGON_TIGER_ID,
          roundId: DTState.round.newRoundId,
          placedBet: result
        })
      }, 2000)
    }
  }

  const handleBet = ({ betId, betType }) => {
    if (!DTState.selectedBetCoin) {
      alert('Please select betting amount')
      return
    }
    if (!timer) {
      return
    }
    const betObject = {
      betId: betId,
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

  const handleRepeat = () => {
    if (DTState.lastBet.length) {
      setState({ currentGameStates: DTState.lastBet, previousGameStates: [[]] })
    }
  }

  return {
    DTState,
    timer,
    DragonTigerOperation,
    handleBet,
    handleSelectedBetCoin,
    handleUndo,
    handleDouble,
    handleRepeat
  }
}
