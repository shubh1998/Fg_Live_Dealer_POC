import React, { useState } from 'react'
import ReactPlayer from 'react-player'

const STREAM_URL = 'https://38656f1b3126.us-east-1.playback.live-video.net/api/video/v1/us-east-1.981682985198.channel.8QuB9cofEWXV.m3u8'
// const SAMPLE_VIDEO = 'https://youtu.be/lkbP5OPQhdQ'

export const LiveStream = () => {
  const [play, setPlay] = useState(true)
  return (
    <>
      <div style={
        {
          minHeight: '500px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }
      }
      >
        <div>
          <h1>Live Stream</h1>
          <ReactPlayer
            url={STREAM_URL}
            // url={SAMPLE_VIDEO}
            playing={play}
            onReady={() => setPlay(true)}
            controls
          />
        </div>
      </div>
    </>
  )
}
