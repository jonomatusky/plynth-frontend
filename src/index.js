import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import 'index.css'
import reportWebVitals from './reportWebVitals'
import { ThemeProvider } from '@material-ui/core/styles'
import StyledEngineProvider from '@material-ui/core/StyledEngineProvider'
import CssBaseline from '@material-ui/core/CssBaseline'

import App from './App'
import store from './redux/store'
import theme from './theme'
import './config/fontawesome'

ReactDOM.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </Provider>
    </StyledEngineProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
