import { CountDownTimer } from '../../../components/CountDownTimer/CountDownTimer'
import { BetCoin, BetSideTitle, BettingAmountOptions, FlexContainer, GameContainer, GameIcon, HalfContainer, Notifier, Root, TimerDiv } from './DragonTiger.styles'
import { userDragonTiger } from './hooks/userDragonTiger'

export const DragonTiger = () => {
  const {
    OperationType,
    casinoTokens,
    DTState,
    isBetActive,
    handleSelectedBetCoin,
    handleUndoOperation,
    handleBet
  } = userDragonTiger()

  return (
    <Root>
      <GameContainer>
        <Notifier isActive={isBetActive}>
          {isBetActive ? 'Betting time is ACTIVE' : 'Betting time is CLOSE'}
        </Notifier>
        <FlexContainer className='betting-option'>
          <HalfContainer onClick={() => handleBet(OperationType.DRAGON)}>
            <GameIcon src='game-icon/dragon.svg' alt='dragon_icon' />
            {DTState.betAmountOnDragon.toFixed(1).replace(/[.,]0$/, '')}
            <span>1:1</span>
            <BetSideTitle>Dragon</BetSideTitle>
          </HalfContainer>

          <HalfContainer>
            <div onClick={() => handleBet(OperationType.TIE)}>
              {DTState.betAmountOnTie.toFixed(1).replace(/[.,]0$/, '')}
              <p>11:1</p>
              <BetSideTitle>Tie</BetSideTitle>
            </div>
            <div onClick={() => handleBet(OperationType.SUITED_TIE)}>
              {DTState.betAmountOnSuitedTie.toFixed(1).replace(/[.,]0$/, '')}
              <p>50:1</p>
              <BetSideTitle>Suited Tie</BetSideTitle>
            </div>
          </HalfContainer>

          <HalfContainer onClick={() => handleBet(OperationType.TIGER)}>
            <GameIcon src='game-icon/tiger.svg' alt='tiger_icon' />
            {DTState.betAmountOnTiger.toFixed(1).replace(/[.,]0$/, '')}
            <span>1:1</span>
            <BetSideTitle>Tiger</BetSideTitle>
          </HalfContainer>
        </FlexContainer>
        <BettingAmountOptions className='casino-coin'>
          <button
            disabled={!isBetActive || DTState.betSequence.length === 0}
            onClick={handleUndoOperation}
          >
            Undo
          </button>

          {casinoTokens.map((token, index) => (
            <BetCoin
              key={index}
              disabled={!isBetActive}
              selectedButton={DTState.selectedBetCoin === token}
              onClick={() => handleSelectedBetCoin(token)}
            >
              {token}
            </BetCoin>
          ))}
          <button
            disabled={!isBetActive || DTState.betSequence.length === 0}
            onClick={() => {
              handleBet(OperationType.DOUBLE)
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
