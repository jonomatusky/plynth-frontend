import React from 'react'
import { Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import theme from 'theme'

// const { REACT_APP_PUBLIC_URL } = process.env

const scaleLgUp = 0.75
const scaleLgDown = 0.65
const screenHeight = 800
const screenWidth = 400

const useStyles = makeStyles({
  phoneContainer: {
    [theme.breakpoints.up('lg')]: {
      maxHeight: `${screenHeight * scaleLgUp}px`,
      maxWidth: `${screenWidth * scaleLgUp}px`,
    },
    [theme.breakpoints.down('xl')]: {
      maxHeight: `${screenHeight * scaleLgDown}px`,
      maxWidth: `${screenWidth * scaleLgDown}px`,
    },
  },
  phone: {
    background: props => props.backgroundColor || '#ffffff',
    color: props => props.fontColor || '#000000',
    borderColor: '#444444',
    [theme.breakpoints.up('lg')]: {
      transform: `scale(${scaleLgUp})`,
    },
    [theme.breakpoints.down('xl')]: {
      transform: `scale(${scaleLgDown})`,
    },
    transformOrigin: 'top left',
  },
})

const Phone = ({ children }) => {
  const classes = useStyles()

  return (
    <Box className={classes.phoneContainer}>
      <Box
        width="400px"
        height="800px"
        border={20}
        borderRadius="40px"
        backgroundColor="#999999"
        position="relative"
        className={classes.phone}
        overflow="hidden"
      >
        {children}
      </Box>
    </Box>
  )
}

export default Phone
