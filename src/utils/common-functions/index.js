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

export {
  displaySumOfBetAmount
}
