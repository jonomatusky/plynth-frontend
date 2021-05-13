import React from 'react'
import { Grid, Box, Typography, makeStyles } from '@material-ui/core'
import ReactPlayer from 'react-player'

import TextTypography from 'components/TextTypography'
import Div100vh from 'components/Div100vh'

const useStyles = makeStyles({
  type: {
    fontFamily: props => props.font,
  },
})

const CardVideo = ({ card, style }) => {
  const classes = useStyles(style)

  const { title, url, text, isFullscreenMobile } = card || {}
  const { font } = style || {}

  return (
    <>
      {isFullscreenMobile && (
        <>
          <Div100vh overflow="hidden">
            <Box
              height="100%"
              maxWidth="100%"
              diplay="flex"
              justifyContent="center"
              overflow="hidden"
            >
              <ReactPlayer
                url={url}
                height="100%"
                width="100%"
                overflow="hidden"
                controls={false}
                style={{ position: 'absolute', top: 0, bottom: 0 }}
              />
            </Box>
          </Div100vh>
        </>
      )}
      {!isFullscreenMobile && (
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
        </Grid>
      )}
    </>
  )
}

export default CardVideo
