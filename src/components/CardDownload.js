import React, { useState } from 'react'
import { Grid, Box, Typography, makeStyles, Button } from '@material-ui/core'

import ButtonDownload from './ButtonDownload'
import TextTypography from './TextTypography'
import CardDownloadDialog from './CardDownloadDialog'

const useStyles = makeStyles({
  type: {
    fontFamily: props => props.font,
  },
})

const CardDownload = ({ packId, cardIndex, card, style }) => {
  const classes = useStyles(style)
  const [downloadDialogIsOpen, setDownloadDialogIsOpen] = useState(false)

  const openDownloadDialog = () => {
    setDownloadDialogIsOpen(true)
  }

  const closeDownloadDialog = () => {
    setDownloadDialogIsOpen(false)
  }

  return (
    <>
      <CardDownloadDialog
        open={downloadDialogIsOpen}
        onClose={closeDownloadDialog}
        style={style}
        packId={packId}
        cardIndex={cardIndex}
      />
      <Grid container spacing={6} justifyContent="center">
        <Grid item xs={12}>
          <Box paddingTop={16}>
            <Box minHeight={40}>
              <Typography variant="h4" align="center" className={classes.type}>
                {card.title}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} container justifyContent="center">
          <Grid item>
            <ButtonDownload href={card.url} disabled={!card.url} />
          </Grid>
        </Grid>
        <Grid item xs={12} container justifyContent="center" spacing={2}>
          <Grid item xs={12}>
            <TextTypography variant="h5" align="center" font={style.font}>
              {card.text}
            </TextTypography>
          </Grid>
          {card.emailDownload && (
            <Grid item>
              <Button onClick={openDownloadDialog}>
                <Box color={style.fontColor}>
                  <Typography color="inherit" variant="subtitle2">
                    Send to My Email
                  </Typography>
                </Box>
              </Button>
            </Grid>
          )}
        </Grid>
      </Grid>
    </>
  )
}

export default CardDownload
