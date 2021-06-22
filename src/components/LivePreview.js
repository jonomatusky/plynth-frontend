import React, { useState } from 'react'
import { Box, makeStyles } from '@material-ui/core'
import PackContent from './PackContent'
import theme from 'theme'
import PackButtonsMobile from './PackButtonsMobile'
import PaginationDots from './PaginationDots'

// const { REACT_APP_PUBLIC_URL } = process.env

const useStyles = makeStyles({
  phoneContainer: {
    [theme.breakpoints.up('lg')]: {
      maxHeight: '600px',
      maxWidth: '300px',
    },
    [theme.breakpoints.down('lg')]: {
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
    [theme.breakpoints.down('lg')]: {
      transform: 'scale(0.65)',
    },
    transformOrigin: 'top left',
  },
})

const LivePreview = ({
  pack,
  cardIndex,
  isLoading,
  setIndex: setCardIndex,
}) => {
  const { cards, style } = pack || {}
  const [i, setI] = useState(0)

  const classes = useStyles(style)

  const index = cardIndex || i

  const setIndex = setCardIndex || setI

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
        {/* <Frame pack={pack} /> */}
        <PaginationDots
          index={index}
          setIndex={setIndex}
          color={(style || {}).fontColor}
          count={(cards || []).length}
        />
        <Box height="100%">
          <PackContent
            preview={true}
            pack={pack}
            index={index}
            setIndex={setIndex}
          />
        </Box>
        {!(cards[index] || {}).hideButtons && (
          <PackButtonsMobile
            index={index}
            setIndex={setIndex}
            lastIndex={(cards || []).length - 1}
            fontColor={(style || {}).fontColor}
          />
        )}
      </Box>
    </Box>
  )
}

export default LivePreview
