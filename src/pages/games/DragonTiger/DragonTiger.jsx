import { CountDownTimer } from '../../../components/CountDownTimer'
import { Notifier } from '../../../components/Notifier'
import {
  BetSideTitle,
  CardBox,
  FlexContainer,
  GameIcon,
  HalfContainer,
  TieContainer,
  TimerDiv
} from './DragonTiger.styles'
import { useDragonTigerController } from './hooks/useDragonTigerController'
import { displaySumOfBetAmount } from '../../../utils/common-functions'
import { BetCoinSection } from '../../../components/BetCoinSection'
import { ShowBetDetail } from '../../../components/ShowBetDetail'
import { RootContainer } from '../../../components/GameContainer'
import { Divider } from '@mui/material'

export const DragonTiger = () => {
  const {
    DTState,
    timer,
    DragonTigerOperation,
    handleBet,
    handleSelectedBetCoin,
    handleUndo,
    handleDouble,
    handleRepeat
  } = useDragonTigerController()
  const array = DTState.currentGameStates
  const { gameData, round, dragonCard, tigerCard, result, previousGameStates, currentGameStates, selectedBetCoin, lastBet } = DTState
  return (
    gameData.gameRules.length !== 0 &&
    (
      <RootContainer color='black' borderColor='#9f3434'>
        <Notifier isBetActive={timer} />
        <FlexContainer className='betting-option'>
          <HalfContainer
            isBetActive={timer}
            onClick={() =>
              handleBet({
                betType: DragonTigerOperation.DRAGON.betType,
                betId: DragonTigerOperation.DRAGON.betId
              })}
          >
            <GameIcon src='game-icon/dragon.svg' alt='dragon_icon' />
            {dragonCard && <CardBox> {dragonCard.suit + ' ' + dragonCard.cardValue}</CardBox>}
            <ShowBetDetail
              betValue={displaySumOfBetAmount({
                betType: DragonTigerOperation.DRAGON.betType,
                array
              })}
            />
            <span>{gameData.gameRules[0].payout}:1</span>
            <BetSideTitle>Dragon</BetSideTitle>
          </HalfContainer>

          <HalfContainer isTieBet isBetActive={timer}>
            <TieContainer
              isBetActive={timer}
              onClick={() =>
                handleBet({
                  betType: DragonTigerOperation.TIE.betType,
                  betId: DragonTigerOperation.TIE.betId
                })}
            >
              <ShowBetDetail
                betValue={displaySumOfBetAmount({
                  betType: DragonTigerOperation.TIE.betType,
                  array
                })}
              />
              <p>{gameData.gameRules[2].payout}:1</p>
              <BetSideTitle>Tie</BetSideTitle>
            </TieContainer>
            <Divider sx={{ borderColor: 'white' }} />
            <br />
            <TieContainer
              isBetActive={timer}
              onClick={() =>
                handleBet({
                  betType: DragonTigerOperation.SUITED_TIE.betType,
                  betId: DragonTigerOperation.SUITED_TIE.betId
                })}
            >
              <ShowBetDetail
                betValue={displaySumOfBetAmount({
                  betType: DragonTigerOperation.SUITED_TIE.betType,
                  array
                })}
              />
              <p>{gameData.gameRules[3].payout}:1</p>
              <BetSideTitle>Suited Tie</BetSideTitle>
            </TieContainer>
          </HalfContainer>

          <HalfContainer
            isBetActive={timer}
            onClick={() =>
              handleBet({
                betType: DragonTigerOperation.TIGER.betType,
                betId: DragonTigerOperation.TIGER.betId
              })}
          >
            <GameIcon src='game-icon/tiger.svg' alt='tiger_icon' />
            {tigerCard && <CardBox>{tigerCard.suit + ' ' + tigerCard.cardValue}</CardBox>}
            <ShowBetDetail
              betValue={displaySumOfBetAmount({
                betType: DragonTigerOperation.TIGER.betType,
                array
              })}
            />
            <span>{gameData.gameRules[1].payout}:1</span>
            <BetSideTitle>Tiger</BetSideTitle>
          </HalfContainer>
        </FlexContainer>
        <div style={{ color: 'white' }}>
          <BetCoinSection
            casinoTokens={gameData.availableCoins}
            handleUndo={handleUndo}
            disableUndo={!timer || !previousGameStates.length}
            isBetActive={timer}
            handleSelectedBetCoin={handleSelectedBetCoin}
            handleDouble={handleDouble}
            disableDouble={!timer || !currentGameStates.length}
            selectedBetCoin={selectedBetCoin}
            handleRepeat={handleRepeat}
            isShowRepeat={timer && !currentGameStates.length && lastBet.length}
          />
        </div>
        {timer > 0 && (
          <TimerDiv>
            <CountDownTimer countDownTime={timer} totalDuration={gameData.timer} />
          </TimerDiv>
        )}
        {
          result && round &&
          (
            <div style={{ textAlign: 'center', color: 'green', margin: 5, border: '1px solid black' }}>
              <div>
                {`Winner - ${round.roundWinner}`}
              </div>
              {
                result.winningAmount
                  ? (<div>  {`Winning amount ${result.winningAmount}`}  </div>)
                  : <></>
              }

            </div>
          )
        }
      </RootContainer>
    )
  )
}
