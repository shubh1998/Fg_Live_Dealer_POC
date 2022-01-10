import { chain, cloneDeep, sumBy } from 'lodash'
import { useEffect, useMemo, useReducer, useState } from 'react'
import { gameResult, getPreGameDataApi, placeBetApi, stopRound } from '../../../../API/services/dragon-tiger.service'
import { useGetCookie } from '../../../../utils/custom-hooks/useGetCookie'
import { useSocketIO } from '../../../../utils/custom-hooks/useSocketIO'
import { GAMEID } from '../../../../utils/game-ids'

let IntervalTimer
let count = 0

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
    currentGameStates: [],
    lastBet: [],
    result: null,
    gameData: {
      gameId: null,
      gameName: 'Sic-Bo',
      minimumBet: null,
      availableCoins: [],
      gameRules: []
    },
    round: {
      newRoundId: null,
      roundStatus: null,
      roundWinner: null,
      winningCombinations: []
    },
    dices: null
  }

  const [SBState, setState] = useReducer((state, newState) => ({
    ...state,
    ...newState
  }), initialState)

  const socket = useMemo(() => useSocketIO(), [])
  const userId = useMemo(() => useGetCookie(), [])
  const [timer, setTimer] = useState(0)

  useEffect(() => {
    fetchGameData()
    socket.emit('join_game', GAMEID.SICBO_ID)
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

    socket.on('sic_bo_dices', (dices) => {
      setState({ dices })
    })
  }, [socket])

  useEffect(async () => {
    if (SBState.dices && SBState.round.newRoundId) {
      await stopRound({ gameId: GAMEID.SICBO_ID, roundId: SBState.round.newRoundId })
      setTimeout(async () => {
        const result = await gameResult({ userId, gameId: GAMEID.SICBO_ID, roundId: SBState.round.newRoundId })
        setState({ result })
      }, 5000)
      setTimeout(() => {
        setState({ ...initialState, gameData: SBState.gameData, lastBet: SBState.currentGameStates })
      }, 10 * 1000)
    }
  }, [SBState.dices])

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
    const response = await getPreGameDataApi({ userId, gameId: GAMEID.SICBO_ID })
    setState({ gameData: response })
  }

  const handlePlaceBetApi = async () => {
    const result = chain(SBState.currentGameStates)
      .groupBy('betType')
      .map((group) => ({
        betType: group[0].betType,
        betAmount: sumBy(group, 'betAmount')
      }))
      .value()
    if (SBState.round && SBState.round.newRoundId && result.length) {
      setTimeout(async () => {
        await placeBetApi({
          userId,
          gameId: GAMEID.SICBO_ID,
          roundId: SBState.round.newRoundId,
          placedBet: result
        })
      }, 2000)
    }
  }

  const handleBet = ({ betType }) => {
    if (!SBState.selectedBetCoin) {
      alert('Please select betting amount')
      return
    }

    if (!timer) {
      return
    }
    const betObject = {
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

  const handleRepeat = () => {
    if (SBState.lastBet.length) {
      setState({ currentGameStates: SBState.lastBet, previousGameStates: [[]] })
    }
  }

  return {
    SBState,
    timer,
    SICBO_GAME_DATA,
    handleBet,
    handleSelectedBetCoin,
    handleUndo,
    handleDouble,
    handleRepeat
  }
}
