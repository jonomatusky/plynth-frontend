import React from 'react'
import {
  Grid,
  Typography,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core'

import { ArrowForward } from '@material-ui/icons'

const TypeForm = ({ type, onSubmit }) => {
  const [value, setValue] = React.useState('female')

  const handleChange = event => {
    setValue(event.target.value)
  }

  const handleSubmit = () => {
    onSubmit(value)
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h4" color="white">
          <b>Choose your content</b>
        </Typography>
      </Grid>
      <Grid item xs={12} mb={2}>
        <Typography color="white">
          <b>
            Plynth can link to videos, music, images, and more. Add one below
            for the demo.
          </b>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            aria-label="gender"
            name="gender1"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel
              value="video"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="music" control={<Radio />} label="Male" />
            <FormControlLabel value="text" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Button
          type="button"
          onClick={handleSubmit}
          variant="contained"
          endIcon={<ArrowForward />}
          size="large"
          fullWidth
          sx={{ height: '51.5px' }}
        >
          <Typography letterSpacing={1} style={{ fontWeight: 800 }}>
            Add Content
          </Typography>
        </Button>
      </Grid>
    </Grid>
  )
}

export default TypeForm
