import React, { Fragment, useEffect } from 'react'
import './App.css'
// React Router
import {
  BrowserRouter as Router,
  Route,
  Switch,

} from 'react-router-dom'
import PrivateRoute from './Screens/routing/PrivateRoute'
import PrivateAdminRoute from './Screens/routing/PrivateAdminRoute'
// Material UI & Theme
import { CssBaseline } from '@material-ui/core'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
//  Components & Screens
import { Alerts } from './components/Alerts'
import { Allproducts } from './Screens/Allproducts'
import { Footer } from './Screens/Footer'
import { Navbar } from './components/Navbar'
import { Landing } from './Screens/Landing'
import { Login } from './Screens/Login'
import { Order } from './Screens/Order'
import { Profile } from './Screens/Profile'
import { Register } from './Screens/Register'
import { SingleProduct } from './Screens/SingleProduct'
import { NotFound } from './Screens/NotFound'
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
import { AdminMembersUpdate } from './AdminScreens/AdminMembersUpdate'
import { AdminProductsAdd } from './AdminScreens/AdminProductsAdd'
import { AdminProductsUpdate } from './AdminScreens/AdminProductsUpdate'
import { AdminOrdersUpdate } from './AdminScreens/AdminOrdersUpdate'
import { ProfileUpdate } from './Screens/ProfileUpdate'

/*----------------------------------------- create MuiTheme -------------------------------------------*/

const theme = createMuiTheme({
  direction: 'rtl',
  palette: {
    primary: {
      main: '#222222',
    },
    secondary: {
      light: '#fff',
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
        <Router >
          <Fragment>
            <CssBaseline />
            <Switch>
              <PrivateAdminRoute path='/admin'>
                <div style={{ display: 'flex' }}>
                  <AppDrawer />
                  <Switch>
                    <PrivateAdminRoute
                      exact
                      path='/admin'
                      component={Dashboard}
                    />
                    <PrivateAdminRoute
                      exact
                      path='/admin/products'
                      component={AdminProducts}
                    />
                    <PrivateAdminRoute
                      exact
                      path='/admin/products/add'
                      component={AdminProductsAdd}
                    />
                    <PrivateAdminRoute
                      exact
                      path='/admin/products/edit/:productId'
                      component={AdminProductsUpdate}
                    />
                    <PrivateAdminRoute
                      exact
                      path='/admin/orders'
                      component={AdminOrders}
                    />
                    <PrivateAdminRoute
                      exact
                      path='/admin/orders/edit/:orderId'
                      component={AdminOrdersUpdate}
                    />
                    <PrivateAdminRoute
                      exact
                      path='/admin/members'
                      component={AdminMembers}
                    />
                    <PrivateAdminRoute
                      exact
                      path='/admin/members/edit/:userId'
                      component={AdminMembersUpdate}
                    />
                    <PrivateAdminRoute
                      exact
                      path='/admin/reviews'
                      component={AdminReviews}
                    />
                    <Route component={NotFound} />
                  </Switch>
                </div>
              </PrivateAdminRoute>

              <Route path='/'>
                <Navbar />
                <Switch>
                  <Route exact path='/' component={Landing} />
                  <Route exact path='/products' component={Allproducts} />
                  <Route
                    exact
                    path='/products/:productId'
                    component={SingleProduct}
                  />
                  <Route exact path='/login' component={Login} />
                  <Route exact path='/register' component={Register} />
                  <PrivateRoute exact path='/profile' component={Profile} />
                  <PrivateRoute
                    exact
                    path='/profile/update'
                    component={ProfileUpdate}
                  />
                  <PrivateRoute exact path='/affiliate' component={Affiliate} />
                  <Route
                    exact
                    path='/order/:productId/:refer'
                    component={Order}
                  />

                  <Route component={NotFound} />
                </Switch>
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
