import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import { Grid, Button, TextField } from '@material-ui/core'

// import { Image, ImageBox } from './FormElements'

// const ASSET_URL = process.env.REACT_APP_ASSET_URL

const PieceForm = ({ user, onSubmit, isLoading, submitLabel }) => {
  const { displayName, bio, links, avatar, username } = user || {}
  //avatarLink

  const defaultValues = {
    username: username || '',
    displayName: displayName || '',
    bio: bio || '',
    avatar: avatar || '',
    links,
  }

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(6, 'Username must be at least 6 characters long')
      .max(30, 'Username must be no longer than 30 characters')
      .matches(
        /^[a-z0-9_.]*$/,
        'Username must only contain lowercase characters a-z, numbers, . and _'
      )
      .matches(
        /^(?!.*?\.\.).*?$/,
        'Username cannot contain two consecutive (.)'
      )
      .matches(/^((?!\.).*(?!\.))$/, 'Username cannot start or end with (.)')
      .required('Required'),
    displayName: Yup.string()
      .max(30, 'Enter a name under 30 characters')
      .required('Required'),
    avatar: Yup.string(),
    bio: Yup.string(),
    links: Yup.array().of(
      Yup.object({
        name: Yup.string()
          .max(32, 'Must be 32 characters or less')
          .required('Required'),
        url: Yup.string().url('Must be a valid URL').required('Required'),
      })
    ),
  })

  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
    defaultValues,
    shouldUnregister: false,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={4}>
        {/* <Grid item xs={12}>
          <Grid container justify="center">
            <Grid item>
              <ImageBox>
                {avatarLink && (
                  <Image src={`${ASSET_URL}/${avatarLink}`} alt="Preview" />
                )}
              </ImageBox>
            </Grid>
          </Grid>
        </Grid> */}
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            name="displayName"
            label="Display Name"
            placeholder="The Band"
            inputRef={register}
            // control={control}
            error={Boolean(errors.title)}
            helperText={errors.title?.message}
            autoComplete="off"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            name="username"
            label="Username"
            placeholder="theband"
            inputRef={register}
            // control={control}
            error={Boolean(errors.title)}
            helperText={errors.title?.message}
            autoComplete="off"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            // onClick={onSubmit}
            // loading={isLoading}
          >
            {submitLabel || `Save & Close`}
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default PieceForm
