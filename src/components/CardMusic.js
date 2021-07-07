import React from 'react'
import { Grid, Box, Typography, makeStyles, styled } from '@material-ui/core'
import { Photo } from '@material-ui/icons'
import ButtonIconMusicLink from './ButtonIconMusicLink'

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

const CardMusic = ({ card, style }) => {
  const classes = useStyles(style)

  const musicLinkTypes = ['youtube', 'spotify', 'appleMusic', 'other']

  return (
    <Grid container justifyContent="center">
      <Grid
        item
        xs={10}
        container
        justifyContent="center"
        sx={{ maxWidth: '400px' }}
      >
        <Grid item container justifyContent="center" spacing={1}>
          <Grid item xs={12}>
            <Box height={15} />
          </Grid>
          <Grid item xs={12}>
            <Box
              height="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              justifyItems="center"
              paddingTop={10}
            >
              {card.image ? (
                <Image src={card.imageUrl} />
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
          {card.title && (
            <Grid item xs={12}>
              <Box pt={2}>
                <Typography
                  variant="h5"
                  className={classes.type}
                  textAlign="center"
                >
                  <b>{card.title}</b>
                </Typography>
              </Box>
            </Grid>
          )}

          {card.text && (
            <Grid item xs={12}>
              <Box pt={1} pb={1}>
                <Typography
                  variant="h6"
                  className={classes.type}
                  textAlign="center"
                >
                  {card.text}
                </Typography>
              </Box>
            </Grid>
          )}

          {card.links && (
            <Grid item xs={12} container justifyContent="center">
              {musicLinkTypes
                .map(type => {
                  const link = (card.links || []).find(
                    link => link.type === type
                  )
                  return link
                })
                .filter(link => !!link)
                .map(link => {
                  return (
                    <Box pr={1} key={link.type}>
                      <ButtonIconMusicLink link={link} style={style} />
                    </Box>
                  )
                })}
            </Grid>
          )}
          <Grid item xs={12}>
            <Box height="50px" />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default CardMusic
