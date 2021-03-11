import { createMuiTheme } from '@material-ui/core'

const theme = createMuiTheme({
  palette: {
    primary: { main: '#CD0A64' },
    secondary: { main: '#FFD5E2' },
    error: { main: '#FF9516' },
  },
  typography: {
    fontFamily: ['Degular', 'sans-serif'].join(','),
    h5: {
      lineHeight: '1.5rem',
    },
    h6: {
      lineHeight: '1.25rem',
    },
  },
  // overrides: {
  //   MuiBottomNavigation: {
  //     root: {
  //       backgroundColor: 'black',
  //     },
  //   },
  //   MuiBottomNavigationAction: {
  //     root: {
  //       color: 'white',
  //     },
  //   },
  // },
})

export default theme
