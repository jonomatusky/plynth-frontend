import React from 'react'
import { Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import PortalContent from 'pages/Portal/components/PortalContent'
import theme from 'theme'

// const { REACT_APP_PUBLIC_URL } = process.env

const useStyles = makeStyles({
  phoneContainer: {
    [theme.breakpoints.up('lg')]: {
      maxHeight: '600px',
      maxWidth: '300px',
    },
    [theme.breakpoints.down('xl')]: {
      maxHeight: '520px',
      maxWidth: '260px',
    },
  },
  phone: {
    background: props => props.backgroundColor || '#ffffff',
    color: props => props.fontColor || '#000000',
    borderColor: '#000000',
    [theme.breakpoints.up('lg')]: {
      transform: 'scale(0.75)',
    },
    [theme.breakpoints.down('xl')]: {
      transform: 'scale(0.65)',
    },
    transformOrigin: 'top left',
  },
})

const LivePreviewPortal = ({
  portal,
  cardIndex,
  isLoading,
  setIndex: setCardIndex,
}) => {
  const { style } = portal || {}

  const classes = useStyles(style)

  return (
    <Box className={classes.phoneContainer}>
      <Box
        width="400px"
        height="800px"
        border={20}
        borderRadius="40px"
        position="relative"
        className={classes.phone}
        overflow="hidden"
      >
        <Box height="100%">
          <PortalContent preview={true} portal={portal} />
        </Box>
      </Box>
    </Box>
  )
}

export default LivePreviewPortal
