import React, { useRef } from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

const renderTime = ({ remainingTime }) => {
  const currentTime = useRef(remainingTime)
  const prevTime = useRef(null)
  const isNewTimeFirstTick = useRef(false)

  if (currentTime.current !== remainingTime) {
    isNewTimeFirstTick.current = true
    prevTime.current = currentTime.current
    currentTime.current = remainingTime
  } else {
    isNewTimeFirstTick.current = false
  }

  const isTimeUp = isNewTimeFirstTick.current

  return (
    <div className='time-wrapper'>
      <div key={remainingTime} className={`time ${isTimeUp ? 'up' : ''}`}>
        {remainingTime}
      </div>
    </div>
  )
}

export const CountDownTimer = ({ countDownTime = 10 }) => {
  return (
    <CountdownCircleTimer
      isPlaying
      duration={countDownTime}
      colors={[['#004777']]}
      size={50}
      strokeWidth={7}
    >
      {renderTime}
    </CountdownCircleTimer>
  )
}
