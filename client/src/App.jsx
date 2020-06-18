import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Header } from './Screens/Header'
import { CssBaseline } from '@material-ui/core'
import { Explaining } from './Screens/Explaining'
import { Profile } from './Screens/Profile'
import { Allproducts } from './Screens/Allproducts'
import { Footer } from './Screens/Footer'
import { Login } from './Screens/Login'
import { Register } from './Screens/Register'
import { Alerts } from './components/Alerts'
//redux
import { Provider } from 'react-redux'
import store from './redux/store'
import { loadUser } from './redux/actions/auth'
import setAuthToken from './utils/setAuthToken'
import PrivateRoute from './Screens/routing/PrivateRoute'
import { SingleProduct } from './Screens/SingleProduct'
import './App.css'

if (localStorage && localStorage.token) {
  setAuthToken(localStorage.token)
}

export default function App() {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
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
            <PrivateRoute exact path='/profile' component={Profile} />
          </Switch>
          <Alerts />
          <Footer />
        </Fragment>
      </Router>
    </Provider>
  )
}
