import React, { useEffect } from 'react'
import styled from '@emotion/styled'

const AmazonIVS = ({ URL }) => {
  const { flvjs } = window

  useEffect(() => {
    const videoElement = document.getElementById('videoElement')
    const flvPlayer = flvjs.createPlayer({
      type: 'flv',
      url: URL
    })
    flvPlayer.attachMediaElement(videoElement)
    flvPlayer.load()
    flvPlayer.play()
  }, [URL])

  return (
    <>
      <video
        id='videoElement'
        playsInline
        autoPlay
        muted
        height={900}
        width={1200}
        style={{ borderRadius: '18px' }}
      />
    </>
  )
}

export default AmazonIVS

export const StreamControlDiv = styled.div({
  padding: '1%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  width: '100%'
})
