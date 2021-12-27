import styled from '@emotion/styled'
import React, { useReducer, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { CountDownTimer } from '../../components/CountDownTimer/CountDownTimer'

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

export const DragonTiger = () => {
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
  return (
    <Root>
      {/* <iframe src='https://www.youtube.com/embed/cWDJoK8zw58' height={500} width={1000} /> */}
      <GameContainer>
        <Notifier isActive={isBetActive}>
          {isBetActive ? 'Betting time is ACTIVE' : 'Betting time is CLOSE'}
        </Notifier>
        <FlexContainer className='betting-option'>
          <HalfContainer onClick={() => handlerBet(OperationType.DRAGON)}>
            <GameIcon src='game-icon/dragon.svg' alt='dragon_icon' />
            {DTState.betAmountOnDragon.toFixed(1).replace(/[.,]0$/, '')}
            <span>1:1</span>
            <BetSideTitle>Dragon</BetSideTitle>
          </HalfContainer>

          <HalfContainer>
            <div onClick={() => handlerBet(OperationType.TIE)}>
              {DTState.betAmountOnTie.toFixed(1).replace(/[.,]0$/, '')}
              <p>11:1</p>
              <BetSideTitle>Tie</BetSideTitle>
            </div>
            <div onClick={() => handlerBet(OperationType.SUITED_TIE)}>
              {DTState.betAmountOnSuitedTie.toFixed(1).replace(/[.,]0$/, '')}
              <p>50:1</p>
              <BetSideTitle>Suited Tie</BetSideTitle>
            </div>
          </HalfContainer>

          <HalfContainer onClick={() => handlerBet(OperationType.TIGER)}>
            <GameIcon src='game-icon/tiger.svg' alt='tiger_icon' />
            {DTState.betAmountOnTiger.toFixed(1).replace(/[.,]0$/, '')}
            <span>1:1</span>
            <BetSideTitle>Tiger</BetSideTitle>
          </HalfContainer>
        </FlexContainer>
        <BettingAmountOptions className='casino-coin'>
          <button
            disabled={!isBetActive || DTState.betSequence.length === 0}
            onClick={handlerUndoOperation}
          >
            Undo
          </button>

          {casinoTokens.map((token, index) => (
            <BetCoin
              key={index}
              disabled={!isBetActive}
              selectedButton={DTState.selectedBetCoin === token}
              onClick={() => handlerSelectedBetCoin(token)}
            >
              {token}
            </BetCoin>
          ))}
          <button
            disabled={!isBetActive || DTState.betSequence.length === 0}
            onClick={() => {
              handlerBet(OperationType.DOUBLE)
            }}
          >
            Double
          </button>
        </BettingAmountOptions>
        {isBetActive && (
          <TimerDiv>
            <CountDownTimer countDownTime={10} />
          </TimerDiv>
        )}
      </GameContainer>
    </Root>
  )
}

const Notifier = styled.strong(({ isActive }) => ({
  textAlign: 'center',
  display: 'block',
  color: isActive ? 'green' : 'red'
}))

const Root = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
})

const GameContainer = styled.div({
  height: 500,
  width: 650,
  margin: 50,
  border: '4px solid black'
})

const TimerDiv = styled.div({
  margin: '20px auto 0',
  width: 50
  // position: 'absolute',
  // top: 400
})

const GameIcon = styled.img({
  width: '200px',
  height: '150px'
})

const BetSideTitle = styled.span({
  fontSize: 20,
  fontWeight: 'bold'
})

const FlexContainer = styled.div({
  display: 'flex',
  textAlign: 'center'
})

const HalfContainer = styled.div({
  display: 'grid',
  margin: '50px auto',
  border: '2px solid black'
})

const BettingAmountOptions = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  width: 400,
  margin: 'auto'
})

const BetCoin = styled.button(({ selectedButton }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: selectedButton ? '2px solid black' : 'none'
}))
