import React from 'react'
import { Box, makeStyles } from '@material-ui/core'
import PackContent from './PackContent'
import theme from 'theme'
import PackButtonsMobile from './PackButtonsMobile'

// const { REACT_APP_PUBLIC_URL } = process.env

const useStyles = makeStyles({
  phoneContainer: {
    [theme.breakpoints.up('lg')]: {
      maxHeight: '600px',
    },
    [theme.breakpoints.down('lg')]: {
      maxHeight: '520px',
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
    transformOrigin: 'top center',
  },
})

const LivePreview = ({ pack, cardIndex, isLoading, setIndex }) => {
  const { cards, style } = pack || {}

  const classes = useStyles(style)

  // const Frame = ({ pack }) => {
  //   return (
  //     <>
  //       {pack && (
  //         <iframe
  //           src={`${REACT_APP_PUBLIC_URL}/p/${pack.id}`}
  //           title="live-preview"
  //           height="100%"
  //           width="100%"
  //         />
  //       )}
  //     </>
  //   )
  // }

  return (
    <Box className={classes.phoneContainer}>
      <Box
        width="400px"
        height="800px"
        border={20}
        borderRadius="40px"
        position="relative"
        className={classes.phone}
      >
        {/* <Frame pack={pack} /> */}
        <PackContent
          preview={true}
          pack={pack}
          index={cardIndex}
          setIndex={setIndex}
        />
        <PackButtonsMobile
          index={cardIndex}
          setIndex={setIndex}
          lastIndex={(cards || []).length}
          fontColor={(style || {}).fontColor}
        />
      </Box>
    </Box>
  )
}

export default LivePreview
