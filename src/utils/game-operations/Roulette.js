const RouletteOperations = {
  zeroNumber: 'ROULETTE_ZERO',
  singleNumberBet: 'ROULETTE_STRAIGHTUP',
  twoNumberBet: 'ROULETTE_SPLIT',
  threeNumberBet: 'ROULETTE_STREET',
  fourNumberBet: 'ROULETTE_CORNER',
  sixNumberBet: 'ROULETTE_DOUBLESTREET',
  twelveNumberBet: 'ROULETTE_DOZEN',
  rowViseBet: 'ROULETTE_COLUMN',
  evenOddBet: 'ROULETTE',
  colorBet: 'ROULETTE',
  rangeBet: 'ROULETTE_HALF',
  zero: 'zero',
  tier: 'tier',
  orphelins: 'orphelins',
  voisins: 'voisins'
}

export default RouletteOperations

export const RouletteCallBets = {
  zero: [
    'ROULETTE_SPLIT_3_0',
    'ROULETTE_SPLIT_15_12',
    'ROULETTE_SPLIT_35_32',
    'ROULETTE_STRAIGHTUP_26'
  ],
  tier: [
    'ROULETTE_SPLIT_8_5',
    'ROULETTE_SPLIT_11_10',
    'ROULETTE_SPLIT_16_13',
    'ROULETTE_SPLIT_24_23',
    'ROULETTE_SPLIT_30_27',
    'ROULETTE_SPLIT_36_33'
  ],
  orphelins: [
    'ROULETTE_STRAIGHTUP_1',
    'ROULETTE_SPLIT_9_6',
    'ROULETTE_SPLIT_17_14',
    'ROULETTE_SPLIT_20_17',
    'ROULETTE_SPLIT_34_31'
  ],
  voisins: [
    'ROULETTE_STREET_0_3_2',
    'ROULETTE_SPLIT_7_4',
    'ROULETTE_SPLIT_15_12',
    'ROULETTE_SPLIT_21_18',
    'ROULETTE_SPLIT_22_19',
    'ROULETTE_SPLIT_35_32',
    'ROULETTE_CORNER_26_29_25_28'
  ]
}

export const DoubleChipsCallBets = ['ROULETTE_STREET_0_3_2', 'ROULETTE_CORNER_26_29_25_28']

export const TIER_VALUES = [33, 16, 24, 5, 10, 23, 8, 30, 11, 36, 13, 27]
export const ORPHELINS_VALUES = [1, 20, 14, 31, 9, 6, 34, 17]
export const VOISINS_VALUES = [0, 2, 3, 4, 7, 12, 15, 18, 19, 21, 22, 25, 26, 28, 29, 32, 35]
export const ZERO_VALUES = [3, 0, 15, 12, 35, 32, 26]
