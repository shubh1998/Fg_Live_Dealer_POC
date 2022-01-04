import { CountDownTimer } from '../../../components/CountDownTimer'
import { Notifier } from '../../../components/Notifier'
import {
  BetSideTitle,
  FlexContainer,
  GameContainer,
  GameIcon,
  HalfContainer,
  Root,
  TimerDiv
} from './DragonTiger.styles'
import { useDragonTigerController } from './hooks/useDragonTigerController'
import { displaySumOfBetAmount } from '../../../utils/common-functions'
import { BetCoinSection } from '../../../components/BetCoinSection'

export const DragonTiger = () => {
  const {
    DTState,
    isBetActive,
    timer,
    DragonTigerOperation,
    DRAGON_TIGER_GAME_DATA,
    handleBet,
    handleSelectedBetCoin,
    handleUndo,
    handleDouble
  } = useDragonTigerController()
  const array = DTState.currentGameStates

  return (
    <Root>
      <GameContainer>
        <Notifier isBetActive={isBetActive} />
        <FlexContainer className='betting-option'>
          <HalfContainer
            onClick={() =>
              handleBet({
                betType: DragonTigerOperation.DRAGON
              })}
          >
            <GameIcon src='game-icon/dragon.svg' alt='dragon_icon' />
            {displaySumOfBetAmount({
              betType: DragonTigerOperation.DRAGON,
              array
            })}
            <span>1:1</span>
            <BetSideTitle>Dragon</BetSideTitle>
          </HalfContainer>

          <HalfContainer>
            <div
              onClick={() =>
                handleBet({
                  betType: DragonTigerOperation.TIE
                })}
            >
              {displaySumOfBetAmount({
                betType: DragonTigerOperation.TIE,
                array
              })}
              <p>11:1</p>
              <BetSideTitle>Tie</BetSideTitle>
            </div>
            <div
              onClick={() =>
                handleBet({
                  betType: DragonTigerOperation.SUITED_TIE
                })}
            >
              {displaySumOfBetAmount({
                betType: DragonTigerOperation.SUITED_TIE,
                array
              })}
              <p>50:1</p>
              <BetSideTitle>Suited Tie</BetSideTitle>
            </div>
          </HalfContainer>

          <HalfContainer
            onClick={() =>
              handleBet({
                betType: DragonTigerOperation.TIGER
              })}
          >
            <GameIcon src='game-icon/tiger.svg' alt='tiger_icon' />
            {displaySumOfBetAmount({
              betType: DragonTigerOperation.TIGER,
              array
            })}
            <span>1:1</span>
            <BetSideTitle>Tiger</BetSideTitle>
          </HalfContainer>
        </FlexContainer>

        <BetCoinSection
          casinoTokens={DRAGON_TIGER_GAME_DATA.casinoTokens}
          handleUndo={handleUndo}
          disableUndo={!isBetActive || DTState.previousGameStates.length === 0}
          isBetActive={isBetActive}
          handleSelectedBetCoin={handleSelectedBetCoin}
          handleDouble={handleDouble}
          disableDouble={!isBetActive || DTState.currentGameStates.length === 0}
          selectedBetCoin={DTState.selectedBetCoin}
        />
        {timer > 0 && (
          <TimerDiv>
            <CountDownTimer countDownTime={timer} />
          </TimerDiv>
        )}
      </GameContainer>
    </Root>
  )
}
