import React from 'react'
import {
  Grid,
  Box,
  Typography,
  makeStyles,
  styled,
  useMediaQuery,
} from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import { Photo, ArrowForward } from '@material-ui/icons'

import ButtonCard from './ButtonCard'
import TextTypography from './TextTypography'
import Div100vh from './Div100vh'

const useStyles = makeStyles({
  type: {
    fontFamily: props => props.font,
  },
})

const NoImage = styled(Box)(props => ({
  backgroundColor: `${props.color}33`,
  backgroundSize: 'contain',
  textAlign: 'center',
  position: 'relative',
  width: '100%',
  '&::after': {
    content: '""',
    display: 'block',
    paddingBottom: '100%',
  },
}))

const Image = styled('img')(props => ({
  width: '100%',
  height: 'auto',
  boxShadow: '0px 4px 10px #000',
}))

const CardImage = ({ card, style, increment, preview }) => {
  const classes = useStyles(style)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { image, imageUrl, title, url, text, label, isFullscreenMobile } =
    card || {}

  const handleClick = () => {
    if (!url) {
      increment()
    }
  }

  const showFullscreen = !!isFullscreenMobile && (!!isMobile || !!preview)

  return (
    <>
      {showFullscreen && (
        <Div100vh>
          {image && (
            <Box
              width="100%"
              height="100%"
              sx={{
                backgroundImage: `url(${imageUrl})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          )}
        </Div100vh>
      )}
      {!showFullscreen && (
        <Grid container justifyContent="center">
          <Grid item xs={10} container justifyContent="center">
            <Grid item container justifyContent="center" spacing={2}>
              <Grid item xs={12}>
                <Box
                  height="100%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  justifyItems="center"
                  paddingTop={8}
                >
                  {image ? (
                    <Image src={imageUrl} />
                  ) : (
                    <NoImage color={style.fontColor}>
                      <Box
                        height="100%"
                        width="100%"
                        position="absolute"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        justifyItems="center"
                      >
                        <Photo fontSize="large" />
                      </Box>
                    </NoImage>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box pt={2}>
                  <Typography variant="h4" className={classes.type}>
                    {title}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <TextTypography font={style.font}>{text}</TextTypography>
              </Grid>
              {card.label && (
                <Grid item xs={12}>
                  <ButtonCard
                    endIcon={!url && <ArrowForward />}
                    href={url}
                    style={style}
                    onClick={handleClick}
                    target="_blank"
                    fullWidth
                  >
                    <b>{label || 'Get Started'}</b>
                  </ButtonCard>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default CardImage
