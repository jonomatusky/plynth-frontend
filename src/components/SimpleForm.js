import React from 'react'
import { useHistory } from 'react-router-dom'
import { Grid, Box, Button, Typography } from '@mui/material'
import { Formik, Form } from 'formik'
import ButtonCardLoading from './ButtonCardLoading'

const SimpleForm = ({
  children,
  onSubmit,
  status,
  initialValues,
  validationSchema,
  buttonLabel,
  confirmationMessage,
  onClose,
  ps,
}) => {
  const history = useHistory()

  const handleSubmit = async (values, actions) => {
    if (status !== 'loading') {
      onSubmit(values, actions)
    }
  }

  if (status === 'succeeded' && confirmationMessage) {
    return (
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        style={{ height: '100%' }}
      >
        {confirmationMessage && (
          <>
            <Grid item xs={12}>
              <Typography align="center" variant="h6">
                {confirmationMessage}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Box height="1rem" />
            </Grid>
          </>
        )}
        {onClose && (
          <Grid item>
            <Button onClick={onClose || history.goBack}>Close</Button>
          </Grid>
        )}
      </Grid>
    );
  } else {
    return (
      <Formik
        enableReinitialize="true"
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Grid container spacing={3}>
            {children.isArray ? (
              children.map(child => {
                return (
                  <Grid item xs={12}>
                    {child}
                  </Grid>
                )
              })
            ) : (
              <Grid item xs={12}>
                {children}
              </Grid>
            )}
            <Box height="0.5rem" />
            <Grid item xs={12}>
              <ButtonCardLoading color="white" type="submit" fullWidth>
                {buttonLabel || `Submit`}
              </ButtonCardLoading>
            </Grid>
            {!!ps && (
              <Grid item xs={12}>
                <Box color="secondary.main" mt={1}>
                  <Typography variant="body2" color="white">
                    <em>{ps}</em>
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </Form>
      </Formik>
    )
  }
}

export default SimpleForm
