import { createMuiTheme } from '@material-ui/core'

const theme = createMuiTheme({
  palette: {
    primary: { main: '#CD0A64' },
    secondary: { main: '#888888' },
    error: { main: '#FF9516' },
  },
  typography: {
    fontFamily: ['Degular', 'sans-serif'].join(','),
    h5: {
      lineHeight: '1.5',
    },
    h6: {
      lineHeight: '1.25',
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
