import { Box, Button, Menu, MenuItem, Slider, Stack } from '@mui/material'
import { isString } from 'lodash'
import React, { useEffect, useRef, useState } from 'react'
import styled from '@emotion/styled'
import { VolumeDown, VolumeOff, VolumeUp } from '@mui/icons-material'

const AmazonIVS = ({ URL }) => {
  const { IVSPlayer } = window
  const { isPlayerSupported } = IVSPlayer
  const player = useRef(null)
  const videoEl = useRef(null)
  const [qualities, setQualities] = useState(null)
  const [quality, setQuality] = useState('Auto')
  const [volume, setVolume] = useState(0)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

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
      if (player.current.getQualities().length) setQualities(player.current.getQualities())
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

  const handleQuality = (item) => {
    if (player && player.current) {
      if (isString(item)) {
        player.current.setAutoQualityMode(true)
        setQuality('Auto')
      } else {
        player.current.setQuality(item, false)
        setQuality(item.name)
      }
    }
    handleClose()
  }
  const handleVolumeChange = (e) => {
    if (player && player.current) {
      setVolume(e.target.value)
      player.current.setVolume(e.target.value)
      player.current.setMuted(false)
    }
  }

  const handleMute = (volume) => {
    if (player && player.current) {
      setVolume(volume)
      player.current.setVolume(volume)
      player.current.setMuted(false)
    }
  }

  return (
    <>
      <video
        id='video-player'
        ref={videoEl}
        playsInline
        autoPlay
        height={800}
        volume={volume}
        style={{ borderRadius: '18px' }}
      // controls
      />
      {
        qualities &&
        (
          <StreamControlDiv>
            <Button
              id='basic-button'
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
              variant='contained'
              onClick={handleClick}
            >
              {quality}
            </Button>
            <Menu
              id='basic-menu'
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button'
              }}
            >
              <MenuItem onClick={() => handleQuality('Auto')}>Auto</MenuItem>
              {qualities.map((item) => <MenuItem onClick={() => handleQuality(item)} value={JSON.stringify(item)} key={item.name}>{item.name}</MenuItem>)}
            </Menu>
            <Box sx={{ width: 200, marginLeft: '2%' }}>
              <Stack spacing={2} direction='row' sx={{ mb: 1 }} alignItems='center'>
                {volume !== 0 ? <VolumeDown onClick={() => handleMute(0)} /> : <VolumeOff onClick={() => handleMute(0.2)} />}
                <Slider min={0} max={1} step={0.1} aria-label='Volume' value={volume} onChange={handleVolumeChange} />
                <VolumeUp />
              </Stack>
            </Box>
          </StreamControlDiv>
        )
      }
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
