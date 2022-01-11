import { Wheel } from 'react-custom-roulette'

export const RouletteWheel = ({ startWheel, index, data, onStopSpinning }) => {
  return (
    <div style={{ transform: 'scale(0.8)' }}>
      {
        index >= 0 &&
        (
          <Wheel
            mustStartSpinning={startWheel}
            prizeNumber={index}
            data={data}
            textColors={['#ffffff']}
            onStopSpinning={onStopSpinning}
            innerRadius={60}
            textDistance={90}
            perpendicularText
            outerBorderColor='white'
            outerBorderWidth={10}
            radiusLineWidth={1}
            radiusLineColor='white'
          />
        )
      }
      {
        index < 0 &&
        (
          <Wheel
            mustStartSpinning={startWheel}
            prizeNumber={index}
            data={data}
            innerRadius={60}
            textDistance={90}
            perpendicularText
            outerBorderColor='white'
            outerBorderWidth={10}
            radiusLineWidth={1}
            radiusLineColor='white'
            textColors={['#ffffff']}
          />
        )
      }
    </div>
  )
}
