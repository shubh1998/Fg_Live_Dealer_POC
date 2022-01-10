import { CircularProgress, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

export const CountDownTimer = ({ countDownTime = 15, totalDuration = 15 }) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant='determinate' value={(countDownTime / totalDuration) * -100} />
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
        <Typography variant='caption' component='div' color='text.secondary'>
          {countDownTime}
        </Typography>
      </Box>
    </Box>
  )
}
