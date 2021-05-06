import React from 'react'
import { Box, Grid, ButtonBase } from '@material-ui/core'

import theme from 'theme'

const PaginationDots = ({ count, index, setIndex, color }) => {
  const dots = [...Array(count)]

  const handleClick = i => {
    setIndex(i)
  }

  return (
    <Box position="fixed" top={theme.spacing(3)} left="0" right="0" zIndex={10}>
      <Grid container justifyContent="center">
        <Grid item>
          <Box display="flex">
            {count > 1 &&
              dots.map((dot, i) => {
                return (
                  <ButtonBase key={i} onClick={() => handleClick(i)}>
                    <Box
                      bgcolor={color}
                      borderRadius="50%"
                      width="7px"
                      height="7px"
                      mr="5px"
                      style={i !== index ? { opacity: '30%' } : null}
                    />
                  </ButtonBase>
                )
              })}
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default PaginationDots
