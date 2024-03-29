import React from 'react'
import { Grid, Box, Typography, styled } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Photo, ArrowForward } from '@mui/icons-material'
import ButtonCard from './ButtonCard'
import TextTypography from './TextTypography'

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
}))

const CardHighlight = ({ card, style, increment }) => {
  const classes = useStyles(style)

  const handleClick = () => {
    if (!card.url) {
      increment()
    }
  }

  return (
    <Grid container justifyContent="center">
      <Grid
        item
        xs={9}
        container
        justifyContent="center"
        sx={{ maxWidth: '300px' }}
      >
        <Grid container justifyContent="center" spacing={2}>
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
          <Grid item xs={12}>
            <Box pt={2}>
              <Typography
                variant="h5"
                className={classes.type}
                align={card.textAlign}
              >
                <b>{card.title}</b>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <TextTypography font={style.font} align={card.textAlign}>
              {card.text}
            </TextTypography>
          </Grid>
          {card.label && (
            <Grid item xs={12}>
              <ButtonCard
                endIcon={
                  !card.url && (
                    <ArrowForward
                      sx={{
                        color: style.buttonColor
                          ? style.buttonFontColor
                          : style.fontColor,
                      }}
                    />
                  )
                }
                href={card.url}
                style={style}
                onClick={handleClick}
                target="_blank"
                fullWidth
              >
                <b>{card.label || 'Get Started'}</b>
              </ButtonCard>
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

export default CardHighlight
