import styled from '@emotion/styled'
import { Button } from '@mui/material'

export const InfoContainerCallBetsBlock = styled.div(({ blockColor, hover, height, width }) => ({
  width: width || '30%',
  height: height || 30,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  backgroundColor: blockColor,
  color: 'white',
  boxShadow: hover ? 'inset 0 0 100px 100px rgba(255, 255, 255, 0.4)' : 'none',
  '&:hover': {
    boxShadow: 'inset 0 0 100px 100px rgba(255, 255, 255, 0.6)'
  }
}))

export const CallBetsRow = styled.div({
  display: 'flex'
})

export const CallbetContainer = styled.div({
  width: '45%',
  margin: 'auto',
  padding: '2%'
})

export const CallCenterDiv = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '24%',
  backgroundColor: 'green',
  color: 'white',
  border: '3px solid black',
  height: '144px',
  '&:hover': {
    boxShadow: 'inset 0 0 100px 100px rgba(255, 255, 255, 0.4)'
  }
})

export const CallBetCount = styled.div({
  width: '11%',
  display: 'flex',
  margin: '10px auto',
  justifyContent: 'space-between',
  alignItems: 'center'
})

export const CustomButton = styled(Button)({
  fontWeight: 'bold'
})
