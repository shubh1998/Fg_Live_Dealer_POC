import { chain, cloneDeep, isNumber, sumBy } from 'lodash'
import { useReducer, useState, useEffect, useMemo } from 'react'
import { gameResult, getPreGameDataApi, placeBetApi, stopRound } from '../../../../API/services/dragon-tiger.service'
import { useGetCookie } from '../../../../utils/custom-hooks/useGetCookie'
import { useSocketIO } from '../../../../utils/custom-hooks/useSocketIO'
import { GAMEID } from '../../../../utils/game-ids'
import RouletteOperations, { DoubleChipsCallBets, RouletteCallBets } from '../../../../utils/game-operations/Roulette'

let IntervalTimer
let count = 0

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
        label: '1',
        block: 1,
        title: '1st 12'
      },
      {
        label: '2',
        block: 2,
        title: '2nd 12'
      },
      {
        label: '3',
        block: 3,
        title: '3rd 12'
      }],
    LAST_BET_ROW: [
      {
        label: '1',
        type: RouletteOperations.rangeBet,
        title: '1 to 18'
      },
      {
        label: 'EVEN',
        type: RouletteOperations.evenOddBet,
        title: 'Even'
      },
      {
        label: 'RED',
        type: RouletteOperations.colorBet,
        title: 'Red'
      },
      {
        label: 'BLACK',
        type: RouletteOperations.colorBet,
        title: 'Black'
      },
      {
        label: 'ODD',
        type: RouletteOperations.evenOddBet,
        title: 'Odd'
      },
      {
        label: '2',
        type: RouletteOperations.rangeBet,
        title: '19 to 36'
      }
    ],
    SIDE_ROW_BETS: [
      {
        label: '1',
        value: '2 To 1',
        type: RouletteOperations.rowViseBet
      },
      {
        label: '2',
        value: '2 To 1',
        type: RouletteOperations.rowViseBet
      },
      {
        label: '3',
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
    count: 0,
    result: null,
    gameData: {
      gameId: null,
      gameName: 'Roulette',
      minimumBet: null,
      availableCoins: [],
      gameRules: []
    },
    round: {
      newRoundId: null,
      roundStatus: null,
      roundWinner: null
    },
    rouletteBallResult: {
      roundOutcome: null
    },
    lastBet: [],
    startWheel: false,
    showResult: false
  }

  const socket = useMemo(() => useSocketIO(), [])
  const userId = useMemo(() => useGetCookie(), [])

  const [RState, setState] = useReducer((state, newState) => ({
    ...state,
    ...newState
  }), initialState)

  const [timer, setTimer] = useState(0)

  const setCount = (value) => {
    setState({
      count: value
    })
  }

  useEffect(() => {
    fetchGameData()
    socket.emit('join_game', GAMEID.ROULETTE_ID)
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
    socket.on('roulette_outcome', (rouletteBallResult) => {
      setState({ rouletteBallResult })
      setState({ startWheel: false })
    })
  }, [socket])

  useEffect(async () => {
    if (RState.round.newRoundId) {
      await stopRound({ gameId: GAMEID.ROULETTE_ID, roundId: RState.round.newRoundId })
      setTimeout(async () => {
        const result = await gameResult({ userId, gameId: GAMEID.ROULETTE_ID, roundId: RState.round.newRoundId })
        setState({ result })
      }, 5000)
      setTimeout(() => {
        setState({ ...initialState, gameData: RState.gameData, lastBet: RState.currentGameStates })
      }, 20 * 1000)
    }
  }, [RState.rouletteBallResult])

  useEffect(() => {
    if (timer === 0) {
      clearInterval(IntervalTimer)
      count = 0
    }
    if (timer === 1) {
      handlePlaceBetApi()
      setState({ startWheel: true })
    }
  }, [timer])

  const fetchGameData = async () => {
    const response = await getPreGameDataApi({ userId, gameId: GAMEID.ROULETTE_ID })
    setState({ gameData: response })
  }

  const handlePlaceBetApi = async () => {
    const result = chain(RState.currentGameStates)
      .groupBy('betType')
      .map((group) => ({
        betType: group[0].betType,
        betAmount: sumBy(group, 'betAmount')
      }))
      .value()
    if (RState.round && RState.round.newRoundId && result.length) {
      setTimeout(async () => {
        await placeBetApi({
          userId,
          gameId: GAMEID.ROULETTE_ID,
          roundId: RState.round.newRoundId,
          placedBet: result
        })
      }, 2000)
    }
  }

  const setShowResult = (value) => {
    setState({
      showResult: value
    })
  }

  const handleBet = ({ betType }) => {
    if (!timer) {
      alert('Please wait for next game start')
      return
    }

    if (!RState.selectedBetCoin) {
      alert('Please select betting amount')
      return
    }
    const betObject = {
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
    if (!timer) {
      return
    }
    if (RouletteCallBets[callBet]) {
      const newCurrentGameState = RouletteCallBets[callBet].map((item) => {
        const newValues = {
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
      if (mouseIn) {
        value.forEach((item) => {
          const indCallBet = ROULETTE_GAME_DATA.ROULETTE_WHEEL_SEQUENCE.indexOf(item)
          const ind = ROULETTE_GAME_DATA.ROULETTE_NUMBER_ARRAY.indexOf(item)

          hoverIndexesCallBet.push(indCallBet)
          hoverIndexes.push(ind)
        })
      }
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

  const handleRepeat = () => {
    if (RState.lastBet.length) {
      setState({ currentGameStates: RState.lastBet, previousGameStates: [[]] })
    }
  }

  return {
    RState,
    setCount,
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
    handleCallBetHover,
    handleRepeat,
    setShowResult
  }
}
