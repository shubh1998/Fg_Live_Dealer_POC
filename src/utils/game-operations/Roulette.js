const RouletteOperations = {
  singleNumberBet: 'bet_singleNumberBet',
  twoNumberBet: 'bet_twoNumberBet',
  threeNumberBet: 'bet_threeNumberBet',
  fourNumberBet: 'bet_fourNumberBet',
  sixNumberBet: 'bet_sixNumberBet',
  twelveNumberBet: 'bet_twelveNumberBet',
  rowViseBet: 'bet_rowViseBet',
  evenOddBet: 'bet_evenOddBet',
  rangeBet: 'bet_rangeBet',
  colorBet: 'bet_colorBet',
  zero: 'zero',
  tier: 'tier',
  orphelins: 'orphelins',
  voisins: 'voisins'
}

export default RouletteOperations

export const RouletteCallBets = {
  zero: [
    'bet_twoNumberBet_3_0',
    'bet_twoNumberBet_15_12',
    'bet_twoNumberBet_35_32',
    'bet_singleNumberBet_26'
  ],
  tier: [
    'bet_twoNumberBet_8_5',
    'bet_twoNumberBet_11_10',
    'bet_twoNumberBet_16_13',
    'bet_twoNumberBet_24_23',
    'bet_twoNumberBet_30_27',
    'bet_twoNumberBet_36_33'
  ],
  orphelins: [
    'bet_singleNumberBet_1',
    'bet_twoNumberBet_9_6',
    'bet_twoNumberBet_17_14',
    'bet_twoNumberBet_20_17',
    'bet_twoNumberBet_34_31'
  ],
  voisins: [
    'bet_threeNumberBet_0_3_2',
    'bet_twoNumberBet_7_4',
    'bet_twoNumberBet_15_12',
    'bet_twoNumberBet_21_18',
    'bet_twoNumberBet_22_19',
    'bet_twoNumberBet_35_32',
    'bet_fourNumberBet_26_29_25_28'
  ]
}

export const DoubleChipsCallBets = ['bet_threeNumberBet_0_3_2', 'bet_fourNumberBet_26_29_25_28']

export const TIER_VALUES = [33, 16, 24, 5, 10, 23, 8, 30, 11, 36, 13, 27]
export const ORPHELINS_VALUES = [1, 20, 14, 31, 9, 6, 34, 17]
export const VOISINS_VALUES = [0, 2, 3, 4, 7, 12, 15, 18, 19, 21, 22, 25, 26, 28, 29, 32, 35]
export const ZERO_VALUES = [3, 0, 15, 12, 35, 32, 26]
