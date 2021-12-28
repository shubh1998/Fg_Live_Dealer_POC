import { useReducer, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

export const useSicboController = () => {
  const OperationType = {
    oddEven: 'oddEven',
    bigSmall: 'bigSmall',
    exactDouble: 'exactDouble',
    exactTriple: 'exactTriple',
    anyTriple: 'anyTriple',
    allDiceSum: 'allDiceSum',
    twoDiceBet: 'twoDiceBet',
    oneDiceBet: 'oneDiceBet',
    double: 'double'
  }

  const TRIPLE_SUM_DICE_ARRAY = Array.from({ length: 14 }, (_, i) => i + 4)
  const SINGLE_DICE_ARRAY = Array.from({ length: 6 }, (_, i) => i + 1)

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

  const casinoTokens = [0.2, 1, 5, 20, 100, 200]

  const initialState = {
    selectedBetCoin: null,
    oddEven: { odd: 0, even: 0 },
    bigSmall: { big: 0, small: 0 },
    exactDouble: { one: 0, two: 0, three: 0, four: 0, five: 0, six: 0 },
    exactTriple: { one: 0, two: 0, three: 0, four: 0, five: 0, six: 0 },
    anyTriple: { value: 0 },
    allDiceSum: {
      4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0, 14: 0, 15: 0, 16: 0, 17: 0
    },
    twoDiceBet: DOUBLE_DICE_INITIAL_VALUE,
    oneDiceBet: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
    betSequence: []
  }

  const [isBetActive, setIsBetActive] = useState(true)
  const [SBState, setState] = useReducer(
    (state, newState) => ({
      ...state,
      ...newState
    }),
    initialState
  )

  useEffect(() => {
    setInterval(() => {
      setIsBetActive((prev) => !prev)
    }, 10000)
    return () => {}
  }, [])

  useEffect(
    () => {
      if (isBetActive) {
        setState(initialState)
      }
    }, [isBetActive]
  )

  const handleUndoOperation = () => {
    const lastBet = SBState.betSequence[SBState.betSequence.length - 1]
    setState({ betSequence: SBState.betSequence.slice(0, -1) })

    if (lastBet.type !== OperationType.double) {
      setState({
        [lastBet.type]: { ...SBState[lastBet.type], [lastBet.betOn]: SBState[lastBet.type][lastBet.betOn] - lastBet.betValue }
      })
    } else if (lastBet.type === OperationType.double) {
      for (const property in SBState) {
        if (property !== 'selectedBetCoin' && property !== 'betSequence') {
          const newObj = {}
          for (const innerProp in SBState[property]) {
            newObj[innerProp] = SBState[property][innerProp] / 2
          }
          setState({
            [property]: newObj
          })
        }
      }
    }
  }

  const handleBet = (type, betOn) => {
    if (!isBetActive) {
      return
    }
    if (!SBState.selectedBetCoin) {
      alert('Please select betting amount')
      return
    }
    if (type !== OperationType.double) {
      setState({
        [type]: { ...SBState[type], [betOn]: SBState[type][betOn] + SBState.selectedBetCoin }
      })
    } else if (type === OperationType.double) {
      for (const property in SBState) {
        if (property !== 'selectedBetCoin' && property !== 'betSequence') {
          const newObj = {}
          for (const innerProp in SBState[property]) {
            newObj[innerProp] = SBState[property][innerProp] * 2
          }
          setState({
            [property]: newObj
          })
        }
      }
    }

    setState({
      betSequence: [
        ...SBState.betSequence,
        { id: uuidv4(), type, betOn, betValue: SBState.selectedBetCoin }
      ]
    })
  }

  const handleSelectedBetCoin = (betCoin) => {
    setState({ selectedBetCoin: betCoin })
  }

  return {
    isBetActive,
    SBState,
    OperationType,
    TRIPLE_SUM_DICE_ARRAY,
    SINGLE_DICE_ARRAY,
    DOUBLE_DICE_COMBINATION,
    casinoTokens,
    handleUndoOperation,
    handleBet,
    handleSelectedBetCoin
  }
}
