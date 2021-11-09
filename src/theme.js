import { createTheme, adaptV4Theme } from '@mui/material'

const theme = createTheme(
  adaptV4Theme({
    palette: {
      primary: { main: '#CD0A64' },
      secondary: { main: '#666666' },
      website: { main: '#ffffff' },
      error: { main: '#FF9516' },
      background: {
        card: '#212421',
      },
    },
    typography: {
      fontFamily: ['Rubik', 'sans-serif'].join(','),
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
)

export default theme
