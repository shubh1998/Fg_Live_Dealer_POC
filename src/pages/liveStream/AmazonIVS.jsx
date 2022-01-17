import React, { useEffect, useRef } from 'react'

const AmazonIVS = ({ URL }) => {
  const { IVSPlayer } = window
  const { isPlayerSupported } = IVSPlayer
  const player = useRef(null)
  const videoEl = useRef(null)

  useEffect(() => {
    const { ENDED, PLAYING, READY } = IVSPlayer.PlayerState
    const { ERROR } = IVSPlayer.PlayerEventType

    if (!isPlayerSupported) {
      console.warn(
        'The current browser does not support the Amazon IVS player.'
      )

      return
    }

    const onStateChange = () => {
      const playerState = player.current.getState()

      console.log(`Player State - ${playerState}`)
    }

    const onError = (err) => {
      console.warn('Player Event - ERROR:', err)
    }

    player.current = IVSPlayer.create()
    player.current.attachHTMLVideoElement(videoEl.current)
    player.current.load(URL)
    player.current.play()

    player.current.addEventListener(READY, onStateChange)
    player.current.addEventListener(PLAYING, onStateChange)
    player.current.addEventListener(ENDED, onStateChange)
    player.current.addEventListener(ERROR, onError)

    return () => {
      player.current.removeEventListener(READY, onStateChange)
      player.current.removeEventListener(PLAYING, onStateChange)
      player.current.removeEventListener(ENDED, onStateChange)
      player.current.removeEventListener(ERROR, onError)
    }
  }, [IVSPlayer, isPlayerSupported, URL])

  return (
    <video
      id='video-player'
      ref={videoEl}
      playsInline
      autoPlay
      height={800}
      controls
    />
  )
}

export default AmazonIVS
