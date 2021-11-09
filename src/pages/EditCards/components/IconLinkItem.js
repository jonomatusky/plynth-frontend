import React, { useState, useEffect } from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DeleteOutline, DragIndicator } from '@mui/icons-material'
import isURL from 'validator/lib/isURL'

import iconOptions from 'util/iconOptions'

const IconLinkItem = ({
  link,
  onChange,
  onRemove,
  index,
  onExpand,
  expanded,
  disableButton,
}) => {
  const [values, setValues] = useState(link)

  useEffect(() => {
    setValues(link)
  }, [link])

  // attempt to blur form field after hitting enter to submit
  // const linkRef = useRef()

  const { type, url } = values

  const error = !!url && !isURL(url, { require_protocol: true })

  const optionsList = Object.keys(iconOptions).sort()

  // let schema = Yup.string()
  //   .url(`Must be a valid URL. Include http:// or https://`)
  //   .required(`Must be a valid URL. Include http:// or https://`)

  // useEffect(() => {
  //   console.log('running')
  //   const checkError = async () => {
  //     try {
  //       // await schema.validate(url)
  //       return
  //     } catch (err) {
  //       setError(err)
  //     }
  //   }
  //   checkError()
  // }, [schema, url])

  const handleSubmit = async event => {
    event.preventDefault()
    // linkRef.current.blur()
    // console.log(event.target.value)
    // const newUrl = event.target.value

    if (url !== link.url) {
      const newValues = { ...values, url }
      setValues(newValues)
      onChange(newValues, index)
    }
  }

  const handleBlur = event => {
    disableButton(false)
    handleSubmit(event)
  }

  const handleRemove = () => {
    onRemove(index)
  }

  const handleSelect = event => {
    const newValues = { ...values, type: event.target.value }
    setValues(newValues)
    onChange(newValues, index)
  }

  const handleChange = event => {
    setValues({ ...values, url: event.target.value })
  }

  return (
    <Accordion
      variant="outlined"
      expanded={expanded}
      onChange={onExpand(link.id)}
    >
      <AccordionSummary sx={{ pr: 0.75 }}>
        <Box
          width="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
        >
          <Box display="flex" alignItems="center">
            <FontAwesomeIcon
              icon={(iconOptions[type] || {}).faIcon || 'link'}
            />

            <Box mr={2} />
            <Typography variant="h6">
              {(iconOptions[type] || {}).name || 'Link'}
            </Typography>
          </Box>
          <Box>
            <Box display="flex" alignItems="center">
              <IconButton size="small" onClick={handleRemove}>
                <DeleteOutline />
              </IconButton>

              <DragIndicator color="secondary" />
            </Box>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <form onSubmit={handleSubmit}>
              <TextField
                // ref={linkRef}
                variant="outlined"
                fullWidth
                name="url"
                label="URL"
                placeholder="Add your URL"
                value={url}
                error={error}
                helperText={
                  error && 'Must be a valid URL. Include http:// or https://'
                }
                onBlur={handleBlur}
                onFocus={() => disableButton(true)}
                autoComplete="off"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleChange}
              />
            </form>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="link-select-label" shrink={true}>
                Type
              </InputLabel>
              <Select
                labelId="link-select-label"
                id="link-select"
                value={values.type || ''}
                onChange={handleSelect}
                label="Type"
              >
                {optionsList.map(optionLabel => {
                  return (
                    <MenuItem
                      value={iconOptions[optionLabel].type}
                      key={iconOptions[optionLabel].type}
                    >
                      {iconOptions[optionLabel].name}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}

export default IconLinkItem
