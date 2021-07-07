import React, { useState } from 'react'
import {
  Grid,
  Box,
  Typography,
  makeStyles,
  ButtonBase,
} from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import ReactPlayer from 'react-player'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import TextTypography from 'components/TextTypography'
import Div100vh from 'components/Div100vh'
import { use100vh } from 'hooks/use-100-vh'
import { PlayCircle } from '@material-ui/icons'

const useStyles = makeStyles({
  type: {
    fontFamily: props => props.font,
  },
})

const CardVideo = ({ cardIndex, currentIndex, card, style, preview }) => {
  // note: cardindex and current index are actually swapped. current index is the index of the card in the pack, card index is the index the user is viewing currently
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const classes = useStyles(style)

  const { title, url, text, isFullscreenMobile, loopingVideo } = card || {}
  const { font } = style || {}

  const windowHeight = use100vh()

  const isVimeo = (url || '').includes('vimeo.com')
  const hideControls = isVimeo || loopingVideo
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <>
      {(currentIndex === cardIndex ||
        currentIndex === cardIndex + 1 ||
        currentIndex === cardIndex - 1) && (
        <>
          {isFullscreenMobile && preview && (
            <Box height="100%" overflow="hidden">
              <Box
                height="100%"
                display="flex"
                justifyContent="center"
                overflow="hidden"
                bgcolor="black"
              >
                <ReactPlayer
                  url={url}
                  height="100%"
                  overflow="hidden"
                  controls={!hideControls}
                  playsinline={true}
                  playing={isPlaying || loopingVideo}
                  loop={loopingVideo}
                  volume={loopingVideo ? 0 : null}
                />
                <Box
                  height="100%"
                  position="absolute"
                  zIndex={10}
                  width="100%"
                  bottom={0}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  // add onClick to Box
                  component={ButtonBase}
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {hideControls && !loopingVideo && (
                    <Box width="100%">
                      {!isPlaying && (
                        <PlayCircle
                          fontSize="large"
                          sx={{
                            width: '80px',
                            height: '80px',
                            color: 'white',
                          }}
                        />
                      )}
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          )}
          {isFullscreenMobile && isMobile && (
            <Div100vh overflow="hidden">
              <Box
                height="100%"
                maxWidth="100vw"
                display="flex"
                justifyContent="center"
                overflow="hidden"
                bgcolor="black"
              >
                <ReactPlayer
                  url={url}
                  height="100%"
                  width="100%"
                  overflow="hidden"
                  controls={!hideControls}
                  playsinline={true}
                  playing={isPlaying || loopingVideo}
                  loop={loopingVideo}
                  volume={loopingVideo ? 0 : null}
                />
                <Box
                  height={windowHeight}
                  position="absolute"
                  zIndex={10}
                  width="100vw"
                  bottom={0}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  // add onClick to Box
                  component={ButtonBase}
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {hideControls && !loopingVideo && (
                    <Box width="100vw">
                      {!isPlaying && (
                        <PlayCircle
                          fontSize="large"
                          sx={{
                            width: '20vw',
                            height: '20vw',
                            color: 'white',
                          }}
                        />
                      )}
                    </Box>
                  )}
                </Box>
              </Box>
            </Div100vh>
          )}
          {(!isFullscreenMobile || (!isMobile && !preview) || !isVimeo) && (
            <Grid container spacing={3} justifyContent="flex-start">
              <Grid item xs={12}>
                <Grid container justifyContent="center">
                  <Grid item xs={10}>
                    {title && (
                      <Box paddingTop={10} width="100%">
                        <Typography variant="h4" className={classes.type}>
                          {title}
                        </Typography>
                      </Box>
                    )}

                    {!title && <Box paddingTop={16} />}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <div style={{ position: 'relative', paddingTop: '56.25%' }}>
                  <ReactPlayer
                    url={url}
                    width="100%"
                    height="100%"
                    controls={true}
                    playsinline={true}
                    style={{ position: 'absolute', top: 0, left: 0 }}
                  />
                </div>
              </Grid>
              <Grid item xs={12} container justifyContent="center">
                <Grid item xs={10}>
                  <TextTypography variant="h5" font={font}>
                    {text}
                  </TextTypography>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Box height="50px" />
              </Grid>
            </Grid>
          )}
        </>
      )}
    </>
  )
}

export default CardVideo
