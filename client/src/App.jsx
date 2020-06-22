import React, { Fragment, useEffect } from 'react'
import './App.css'
// router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PrivateRoute from './Screens/routing/PrivateRoute'
// @material-ui & Theme
import { CssBaseline } from '@material-ui/core'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import RTL from './components/rtl'
// screens & components
import { Alerts } from './components/Alerts'
import { Allproducts } from './Screens/Allproducts'
import { Explaining } from './Screens/Explaining'
import { Footer } from './Screens/Footer'
import { Navbar } from './components/Navbar'
import { Header } from './Screens/Header'
import { Login } from './Screens/Login'
import { Order } from './Screens/Order'
import { Profile } from './Screens/Profile'
import { Register } from './Screens/Register'
import { SingleProduct } from './Screens/SingleProduct'
//redux
import store from './redux/store'
import { Provider } from 'react-redux'
import { loadUser } from './redux/actions/auth'
import setAuthToken from './utils/setAuthToken'
import { mainFont } from './customize/font'
import ScrollIntoView from './Screens/routing/scrollIntoView'

//

const theme = createMuiTheme({
  direction: 'rtl',
  palette: {
    primary: {
      main: '#222222',
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      contrastText: '#FFCC33',
    },

    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    fontFamily: [
      mainFont,
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
})
console.log(theme)
//
if (localStorage && localStorage.token) {
  setAuthToken(localStorage.token)
}

export default function App() {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <Router>
          <Fragment>
            <ScrollIntoView>
              <CssBaseline />
              <Navbar />
              <Switch>
                <Route exact path='/' component={Header} />
                <Route exact path='/features' component={Explaining} />
                <Route exact path='/products' component={Allproducts} />
                <Route
                  exact
                  path='/products/:productId'
                  component={SingleProduct}
                />
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
                <Route
                  exact
                  path='/order/:productId/:refer'
                  component={Order}
                />
                <PrivateRoute exact path='/profile' component={Profile} />
              </Switch>
              <Alerts />
              <Footer />
            </ScrollIntoView>
          </Fragment>
        </Router>
      </MuiThemeProvider>
    </Provider>
  )
}
