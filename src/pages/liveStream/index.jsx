import React from 'react'
import AmazonIVS from './AmazonIVS'

// const STREAM_URL = 'https://38656f1b3126.us-east-1.playback.live-video.net/api/video/v1/us-east-1.981682985198.channel.8QuB9cofEWXV.m3u8'
const STREAM_URL = 'https://fcc3ddae59ed.us-west-2.playback.live-video.net/api/video/v1/us-west-2.893648527354.channel.DmumNckWFTqz.m3u8'

export const LiveStream = () => {
  return (
    <>
      <div style={
        {
          minHeight: '970px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }
      }
      >
        <div>
          <h1 style={
            {
              margin: 'auto',
              width: 'fit-content',
              padding: '1%'
            }
          }
          >Live Stream
          </h1>
          <AmazonIVS URL={STREAM_URL} />
        </div>
      </div>
    </>
  )
}
