import React, { Fragment } from 'react'
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
//redux
import { Provider } from 'react-redux'
import store from './redux/store'

export default function Album() {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <CssBaseline />
          <Navbar />

          <Route exact path='/' component={Header} />
          <Route exact path='/features' component={Explaining} />
          <Route exact path='/products' component={Allproducts} />
          <Route exact path='/profile' component={Profile} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />

          <Footer />
        </Fragment>
      </Router>
    </Provider>
  )
}
