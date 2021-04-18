import { Box, Grid } from '@material-ui/core'
import React from 'react'
import theme from 'theme'

const PaginationDots = ({ count, index, color }) => {
  const dots = [...Array(count)]

  return (
    <Box position="absolute" top={theme.spacing(3)} left="0" right="0">
      <Grid container justifyContent="center">
        <Grid item>
          <Box display="flex">
            {count > 1 &&
              dots.map((dot, i) => {
                return (
                  <Box
                    key={i}
                    bgcolor={color}
                    borderRadius="50%"
                    width="7px"
                    height="7px"
                    mr="5px"
                    style={i !== index ? { opacity: '30%' } : null}
                  />
                )
              })}
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default PaginationDots
