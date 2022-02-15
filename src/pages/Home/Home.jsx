import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GameIcon, GamesContainer, GameTitle, UserInputDiv } from './Home.styles'
import TextField from '@mui/material/TextField'
import { Alert, AlertTitle, Button } from '@mui/material'
import Cookies from 'universal-cookie'

// const COOKIE_EXPIRE_MIN = 20
const cookies = new Cookies()
export const Home = () => {
  const [userId, setUserId] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (cookies.get('userId')) {
      setUserId(cookies.get('userId'))
      setSuccess(true)
    }
  }, [])

  const handleUserIdChange = (value) => {
    setUserId(value)
  }

  const handleSubmitUserId = () => {
    if (userId) {
      cookies.set('userId', userId, {
        path: '/'
      // FIXME: add again the expiration time
      // expires: new Date((Date.now() + COOKIE_EXPIRE_MIN * 60 * 1000))
      })
      setSuccess(true)
    }
  }

  return (
    <div>
      {
        !success && (
          <UserInputDiv className='user-input-div'>
            <TextField id='outlined-basic' onChange={(e) => handleUserIdChange(e.target.value)} label='Enter User Id' variant='outlined' type='number' value={userId} />
            <Button onClick={handleSubmitUserId} variant='contained' disabled={!userId}>Submit</Button>
          </UserInputDiv>
        )
      }
      {success &&
        (
          <Alert severity='success'>
            <AlertTitle>Success</AlertTitle>
            User id :{userId} Submitted — <strong>check out our games!</strong>
          </Alert>
        )}
      <GamesContainer className='games-container'>
        <Link to={userId ? '/dragon-tiger' : '/'}>
          <GameIcon
            src='game-icon/dragon-tiger-logo.png'
            alt='dragon_tiger_icon'
          />
          <GameTitle>Dragon Tiger</GameTitle>
        </Link>

        <Link to={userId ? '/roulette' : '/'}>
          <GameIcon src='game-icon/roulette-logo.png' alt='roulette_icon' />
          <GameTitle>Roulette</GameTitle>
        </Link>

        <Link to={userId ? '/sicbo' : '/'}>
          <GameIcon src='game-icon/sicbo-logo.png' alt='roulette_icon' />
          <GameTitle>SicBo</GameTitle>
        </Link>
        <Link to={userId ? '/livestream' : '/'}>
          {/* <GameIcon src='game-icon/sicbo-logo.png' alt='roulette_icon' /> */}
          <GameTitle>Live Stream</GameTitle>
        </Link>
      </GamesContainer>
    </div>
  )
}
