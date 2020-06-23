import React, { Fragment, useEffect } from 'react'
import './App.css'
// React Router
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useRouteMatch,
  useLocation,
} from 'react-router-dom'
import PrivateRoute from './Screens/routing/PrivateRoute'
// Material UI & Theme
import { CssBaseline } from '@material-ui/core'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
//  Components & Screens
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
//Redux
import store from './redux/store'
import { Provider } from 'react-redux'
import { loadUser } from './redux/actions/auth'

// Utitliy
import setAuthToken from './utils/setAuthToken'
// Customize
import { mainFont } from './customize/font'
import { Affiliate } from './Screens/Affiliate'
import { Dashboard } from './AdminScreens/Dashboard'
import { AppDrawer } from './AdminScreens/AppDrawer'
import { AdminProducts } from './AdminScreens/AdminProducts'
import { AdminOrders } from './AdminScreens/AdminOrders'
import { AdminReviews } from './AdminScreens/AdminReviews'
import { AdminMembers } from './AdminScreens/AdminMembers'

/*----------------------------------------- create MuiTheme -------------------------------------------*/

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
/*----------------------------------------- setAuthToken -------------------------------------------*/

if (localStorage && localStorage.token) {
  setAuthToken(localStorage.token)
}

export default function App() {
  /*----------------------------------------- React Hooks -------------------------------------------*/
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  
  /*----------------------------------------- Main App     -------------------------------------------*/

  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <Router>
          <Fragment>
            <CssBaseline />
            <Switch>
              <Route path='/admin'>
                <div style={{ display: 'flex' }}>
                  <AppDrawer />
                  <PrivateRoute exact path='/admin' component={Dashboard} />
                  <PrivateRoute
                    exact
                    path='/admin/products'
                    component={AdminProducts}
                  />
                  <PrivateRoute
                    exact
                    path='/admin/orders'
                    component={AdminOrders}
                  />
                  <PrivateRoute
                    exact
                    path='/admin/members'
                    component={AdminMembers}
                  />
                  <PrivateRoute
                    exact
                    path='/admin/reviews'
                    component={AdminReviews}
                  />
                </div>
              </Route>

              <Route path='/'>
                <Navbar />
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
                <PrivateRoute exact path='/profile' component={Profile} />
                <PrivateRoute exact path='/affiliate' component={Affiliate} />
                <Route
                  exact
                  path='/order/:productId/:refer'
                  component={Order}
                />
                <Footer />
              </Route>
            </Switch>
            <Alerts />
          </Fragment>
        </Router>
      </MuiThemeProvider>
    </Provider>
  )
}
