import { CountDownTimer } from '../../../components/CountDownTimer'
import { Notifier } from '../../../components/Notifier'
import { BetCoin, BetSideTitle, BettingAmountOptions, FlexContainer, GameContainer, GameIcon, HalfContainer, Root, TimerDiv } from './DragonTiger.styles'
import { v4 as uuidv4 } from 'uuid'
import { useDragonTigerController } from './hooks/useDragonTigerController'

export const DragonTiger = () => {
  const {
    DTState,
    isBetActive,
    OperationType,
    DRAGON_TIGER_GAME_DATA,
    handleBet,
    handleSelectedBetCoin,
    handleUndo,
    handleDouble,
    displayBetAmount
  } = useDragonTigerController()

  return (
    <Root>
      <GameContainer>
        <Notifier isBetActive={isBetActive} />
        <FlexContainer className='betting-option'>
          <HalfContainer onClick={() => handleBet({
            betId: uuidv4(),
            betType: OperationType.DRAGON
          })}
          >
            <GameIcon src='game-icon/dragon.svg' alt='dragon_icon' />
            {displayBetAmount(OperationType.DRAGON)}
            <span>1:1</span>
            <BetSideTitle>Dragon</BetSideTitle>
          </HalfContainer>

          <HalfContainer>
            <div onClick={() => handleBet({
              betId: uuidv4(),
              betType: OperationType.TIE
            })}
            >
              {displayBetAmount(OperationType.TIE)}
              <p>11:1</p>
              <BetSideTitle>Tie</BetSideTitle>
            </div>
            <div onClick={() => handleBet({
              betId: uuidv4(),
              betType: OperationType.SUITED_TIE
            })}
            >
              {displayBetAmount(OperationType.SUITED_TIE)}
              <p>50:1</p>
              <BetSideTitle>Suited Tie</BetSideTitle>
            </div>
          </HalfContainer>

          <HalfContainer onClick={() => handleBet({
            betId: uuidv4(),
            betType: OperationType.TIGER
          })}
          >
            <GameIcon src='game-icon/tiger.svg' alt='tiger_icon' />
            {displayBetAmount(OperationType.TIGER)}
            <span>1:1</span>
            <BetSideTitle>Tiger</BetSideTitle>
          </HalfContainer>
        </FlexContainer>
        <BettingAmountOptions className='casino-coin'>
          <button
            disabled={!isBetActive || DTState.previousGameStates.length === 0}
            onClick={handleUndo}
          >
            Undo
          </button>

          {DRAGON_TIGER_GAME_DATA.casinoTokens.map((token, index) => (
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
            disabled={!isBetActive || DTState.currentGameStates.length === 0}
            onClick={handleDouble}
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
