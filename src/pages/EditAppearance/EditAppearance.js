import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import {
  Grid,
  Box,
  CircularProgress,
  Paper,
  Typography,
  Hidden,
  makeStyles,
} from '@material-ui/core'

import usePackStore from 'hooks/store/use-pack-store'
import LivePreview from 'components/LivePreview'
import ButtonColor from 'components/ButtonColor'
import ButtonColorPicker from 'components/ButtonColorPicker'
import ButtonFont from 'components/ButtonFont'

const drawerWidth = 70

const useStyles = makeStyles({
  content: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
})

const EditAppearance = () => {
  const classes = useStyles()
  const { packId } = useParams()
  const { selectPack, updatePack, updateStatus } = usePackStore()

  const pack = selectPack(packId)
  const [cardIndex, setCardIndex] = useState(0)

  const style = (pack || {}).style
  const { backgroundColor } = style || {}

  // useEffect(() => {
  //   const packItUp = () => {
  //     const reduxPack = selectPack(packId)
  //     console.log('setting pack')
  //     setPack(reduxPack)
  //   }
  //   if (status === 'succeeded' && updateStatus !== 'loading') {
  //     packItUp()
  //   }
  // }, [packId, selectPack, status, updateStatus])

  const handleColorChange = color => {
    let textColor

    console.log('changing color')

    const hexToRGB = h => {
      let r = 0,
        g = 0,
        b = 0

      // 3 digits
      if (h.length === 4) {
        r = h[1] + h[1]
        g = h[2] + h[2]
        b = h[3] + h[3]

        // 6 digits
      } else if (h.length === 7) {
        r = h[1] + h[2]
        g = h[3] + h[4]
        b = h[5] + h[6]
      }

      return [r, g, b]
    }

    try {
      const rgb = hexToRGB(color)

      const brightness =
        Math.round(
          parseInt(rgb[0], 16) * 299 +
            parseInt(rgb[1], 16) * 587 +
            parseInt(rgb[2], 16) * 114
        ) / 1000

      console.log(brightness)

      if (brightness > 200) {
        textColor = '#000000'
      } else if (brightness > 125) {
        textColor = '#333333'
      } else {
        textColor = '#ffffff'
      }

      console.log(textColor)
    } catch (err) {
      console.log(err)
    }

    updatePack({
      id: packId,
      style: { ...style, backgroundColor: color, fontColor: textColor },
    })
  }

  const handleFontChange = font => {
    updatePack({
      id: packId,
      style: { ...style, font },
    })
  }

  // const handleSave = values => {
  //   if (status !== 'loading') {
  //     updateReduxPack(pack)
  //   }
  // }

  const [isSpinning, setIsSpinning] = useState(false)

  useEffect(() => {
    const setSpinning = () => {
      setIsSpinning(true)
    }
    const stopSpinning = () => {
      setTimeout(() => {
        if (isSpinning === true) {
          setIsSpinning(false)
        }
      }, 500)
    }
    if (updateStatus === 'loading') {
      setSpinning()
    } else {
      stopSpinning()
    }
  }, [updateStatus, isSpinning])

  return (
    <div className={classes.content}>
      <Box height="100vh">
        <Grid
          container
          justifyContent="center"
          alignItems="stretch"
          style={{ height: `100vh` }}
        >
          <Grid item sm={12} md={8}>
            <Box minHeight="48px" />

            <Box minHeight="48px" />
            <Grid container justifyContent="center">
              <Grid item xs={12} sm={9}>
                <Paper>
                  <Box padding={3}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Typography variant="h4">Edit Appearance</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h5">Background</Typography>
                      </Grid>
                      <Grid item xs={12} container spacing={2}>
                        <Grid item>
                          <ButtonColor
                            color={'#FFFFFF'}
                            setColor={handleColorChange}
                          />
                        </Grid>
                        <Grid item>
                          <ButtonColor
                            color={'#000000'}
                            setColor={handleColorChange}
                          />
                        </Grid>
                        <Grid item>
                          <ButtonColor
                            color={'#757575'}
                            setColor={handleColorChange}
                          />
                        </Grid>
                        <Grid item>
                          <ButtonColor
                            color={'#2F87B3'}
                            setColor={handleColorChange}
                          />
                        </Grid>
                        <Grid item>
                          <ButtonColor
                            color={'#FFF9F0'}
                            setColor={handleColorChange}
                          />
                        </Grid>
                        <Grid item>
                          <ButtonColor
                            color={'#9DFFE8'}
                            setColor={handleColorChange}
                          />
                        </Grid>
                        <Grid item>
                          <ButtonColor
                            color={'#CD0A64'}
                            setColor={handleColorChange}
                          />
                        </Grid>
                        <Grid item>
                          <ButtonColor
                            color={'#FE6B8B'}
                            setColor={handleColorChange}
                          />
                        </Grid>

                        <Grid item>
                          <ButtonColor
                            color={'#DCF10B'}
                            setColor={handleColorChange}
                          />
                        </Grid>
                        <Grid item>
                          <ButtonColorPicker
                            color={backgroundColor || '#ffffff'}
                            onChange={handleColorChange}
                          />
                        </Grid>
                      </Grid>

                      <Grid item xs={12}>
                        <Typography variant="h5">Font</Typography>
                      </Grid>

                      <Grid item xs={12} container spacing={2}>
                        <Grid item>
                          <ButtonFont
                            font={`'Degular', sans-serif`}
                            setFont={handleFontChange}
                          />
                        </Grid>
                        <Grid item>
                          <ButtonFont
                            font={`'Inter', sans-serif`}
                            setFont={handleFontChange}
                          />
                        </Grid>
                        <Grid item>
                          <ButtonFont
                            font={`'Josefin Sans', sans-serif`}
                            setFont={handleFontChange}
                          />
                        </Grid>
                        <Grid item>
                          <ButtonFont
                            font={`'Jacques Francois', serif`}
                            setFont={handleFontChange}
                          />
                        </Grid>
                        <Grid item>
                          <ButtonFont
                            font={`'Cutive Mono', monospace`}
                            setFont={handleFontChange}
                          />
                        </Grid>
                      </Grid>
                      {/* <Grid item xs={12}>
                        <Typography variant="h5">Patterns</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography>Coming Soon...</Typography>
                        <Button variant="outline">Unlock</Button>
                      </Grid> */}
                    </Grid>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Hidden mdDown>
            <Grid item md={4}>
              <Box borderLeft={1} borderColor="divider" height="100%">
                <Box minHeight="96px" />
                <Grid container justifyContent="center">
                  <Grid item xs={12}>
                    <Box paddingBottom={2}>
                      <Typography align="center" color="textSecondary">
                        LIVE PREVIEW
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} container justifyContent="center">
                    <LivePreview
                      pack={pack}
                      cardIndex={cardIndex}
                      isLoading={updateStatus === 'loading'}
                      setIndex={setCardIndex}
                    />
                  </Grid>
                  <Grid item container xs={12} justifyContent="center">
                    <Box paddingTop={4}>
                      {isSpinning && (
                        <CircularProgress
                          size="1.25rem"
                          color="inherit"
                          thickness={6}
                        />
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Hidden>
        </Grid>
      </Box>
    </div>
  )
}

export default EditAppearance