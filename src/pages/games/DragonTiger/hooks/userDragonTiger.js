import { useEffect, useReducer, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

export const userDragonTiger = () => {
  const OperationType = {
    TIGER: 'TIGER',
    DRAGON: 'DRAGON',
    TIE: 'TIE',
    SUITED_TIE: 'SUITED_TIE',
    DOUBLE: 'DOUBLE',
    REPEAT: 'REPEAT'
  }

  const initialState = {
    selectedBetCoin: null,
    betAmountOnDragon: 0,
    betAmountOnTiger: 0,
    betAmountOnTie: 0,
    betAmountOnSuitedTie: 0,
    betSequence: []
    // isBetActive: true
  }

  // Backend
  const casinoTokens = [0.2, 1, 5, 20, 100, 200]

  const [DTState, setState] = useReducer(
    (state, newState) => ({
      ...state,
      ...newState
    }),
    initialState
  )
  const [isBetActive, setIsBetActive] = useState(true)

  const handlerSelectedBetCoin = (betCoin) => {
    setState({ selectedBetCoin: betCoin })
  }

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
          betAmountOnDragon: 0,
          betAmountOnTiger: 0,
          betAmountOnTie: 0,
          betAmountOnSuitedTie: 0,
          betSequence: []
        })
      }
    }, [isBetActive]
  )

  const handlerUndoOperation = () => {
    const lastBet = DTState.betSequence[DTState.betSequence.length - 1]
    setState({ betSequence: DTState.betSequence.slice(0, -1) })
    switch (lastBet.type) {
      case OperationType.TIGER:
        setState({
          betAmountOnTiger: DTState.betAmountOnTiger - lastBet.betValue
        })
        break
      case OperationType.DRAGON:
        setState({
          betAmountOnDragon: DTState.betAmountOnDragon - lastBet.betValue
        })
        break
      case OperationType.TIE:
        setState({
          betAmountOnTie: DTState.betAmountOnTie - lastBet.betValue
        })
        break
      case OperationType.SUITED_TIE:
        setState({
          betAmountOnSuitedTie: DTState.betAmountOnSuitedTie - lastBet.betValue
        })
        break
      case OperationType.DOUBLE:
        setState({
          betAmountOnDragon: DTState.betAmountOnDragon / 2,
          betAmountOnTiger: DTState.betAmountOnTiger / 2,
          betAmountOnTie: DTState.betAmountOnTie / 2,
          betAmountOnSuitedTie: DTState.betAmountOnSuitedTie / 2
        })
        break
    }
  }

  const handlerBet = (type) => {
    if (!DTState.selectedBetCoin) {
      alert('Please select betting amount')
      return
    }

    setState({
      betSequence: [
        ...DTState.betSequence,
        { id: uuidv4(), type, betValue: DTState.selectedBetCoin }
      ]
    })
    switch (type) {
      case OperationType.TIGER:
        setState({
          betAmountOnTiger: DTState.betAmountOnTiger + DTState.selectedBetCoin
        })
        break
      case OperationType.DRAGON:
        setState({
          betAmountOnDragon:
            DTState.betAmountOnDragon + DTState.selectedBetCoin
        })
        break
      case OperationType.TIE:
        setState({
          betAmountOnTie: DTState.betAmountOnTie + DTState.selectedBetCoin
        })
        break
      case OperationType.SUITED_TIE:
        setState({
          betAmountOnSuitedTie:
            DTState.betAmountOnSuitedTie + DTState.selectedBetCoin
        })
        break
      case OperationType.DOUBLE:
        setState({
          betAmountOnDragon: DTState.betAmountOnDragon * 2,
          betAmountOnTiger: DTState.betAmountOnTiger * 2,
          betAmountOnTie: DTState.betAmountOnTie * 2,
          betAmountOnSuitedTie: DTState.betAmountOnSuitedTie * 2
        })
        break
    }
  }

  return {
    OperationType,
    initialState,
    casinoTokens,
    DTState,
    isBetActive,
    handlerSelectedBetCoin,
    handlerUndoOperation,
    handlerBet
  }
}
