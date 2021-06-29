import React, { useState } from 'react'
import { Box, makeStyles } from '@material-ui/core'
import theme from 'theme'
import PackButtonsMobile from './PackButtonsMobile'
import PaginationDots from './PaginationDots'
import LivePreviewContent from './LivePreviewContent'

// const { REACT_APP_PUBLIC_URL } = process.env

const scaleLgUp = 0.75
const scaleLgDown = 0.65
const screenHeight = 800 - 40
const screenWidth = 400

const useStyles = makeStyles({
  phoneContainer: {
    [theme.breakpoints.up('lg')]: {
      maxHeight: `${screenHeight * scaleLgUp}px`,
      maxWidth: `${screenWidth * scaleLgUp}px`,
    },
    [theme.breakpoints.down('lg')]: {
      maxHeight: `${screenHeight * scaleLgDown}px`,
      maxWidth: `${screenWidth * scaleLgDown}px`,
    },
  },
  phone: {
    background: props => props.backgroundColor || '#ffffff',
    color: props => props.fontColor || '#000000',
    borderColor: '#000000',
    [theme.breakpoints.up('lg')]: {
      transform: `scale(${scaleLgUp})`,
    },
    [theme.breakpoints.down('lg')]: {
      transform: `scale(${scaleLgDown})`,
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
        <Box id="content-box" height="100%" overflow="hidden">
          <LivePreviewContent
            pack={pack}
            index={index}
            setIndex={setIndex}
            height={`${screenHeight}px`}
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
