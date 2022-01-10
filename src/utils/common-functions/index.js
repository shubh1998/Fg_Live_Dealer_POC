import np from 'number-precision'

const displaySumOfBetAmount = ({ betType, array }) => {
  if (array.length) {
    let sum = 0
    array.forEach((item) => {
      if (item.betType === betType) {
        sum = np.plus(sum, item.betAmount)
      }
    })
    if (sum !== 0) return sum
  }
  return ''
}

const isWinningBlock = ({ betType, allWinningBets }) => allWinningBets && allWinningBets.some(winner => winner.betType === betType)

const getBetPayout = ({ betType, gameRules }) => {
  const payout = gameRules.find(item => item.bet_type === betType)?.payout
  return `${payout}:1`
}

export {
  displaySumOfBetAmount,
  isWinningBlock,
  getBetPayout
}
