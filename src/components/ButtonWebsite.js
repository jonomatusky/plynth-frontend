const {
  Button,
  CircularProgress,
  Typography,
  Box,
} = require('@material-ui/core')

const ButtonWebsite = ({
  children,
  loading,
  onClick,
  to,
  endIcon,
  startIcon,
  ...props
}) => {
  return (
    <Button
      type="submit"
      variant="contained"
      endIcon={
        loading ? (
          <CircularProgress size={22} color="inherit" />
        ) : (
          endIcon || <Box width="22px" height="22px" />
        )
      }
      startIcon={startIcon || <Box width="22px" height="22px" />}
      size="large"
      fullWidth
      sx={{ height: '51.5px' }}
      color={loading ? 'secondary' : 'primary'}
      onClick={loading ? null : onClick}
      to={loading ? null : to}
      {...props}
    >
      <Typography letterSpacing={1} style={{ fontWeight: 800 }}>
        {children}
      </Typography>
    </Button>
  )
}

export default ButtonWebsite
