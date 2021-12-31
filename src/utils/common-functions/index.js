const displaySumOfBetAmount = ({ betType, array }) => {
  if (array.length) {
    let sum = 0
    array.forEach((item) => {
      if (item.betType === betType) {
        sum = sum + item.betAmount
      }
    })
    if (sum !== 0) return sum.toFixed(1).replace(/[.,]0$/, '')
  }
  return ''
}

export {
  displaySumOfBetAmount
}
