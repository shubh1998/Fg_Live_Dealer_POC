import { CircularProgress, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

export const CountDownTimer = ({ countDownTime = 15, totalDuration = 15 }) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress size={100} variant='determinate' value={(countDownTime / totalDuration) * -100} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Typography sx={{ color: 'white', fontWeight: 'bold', fontSize: 40 }} variant='caption' component='div'>
          {countDownTime}
        </Typography>
      </Box>
    </Box>
  )
}
