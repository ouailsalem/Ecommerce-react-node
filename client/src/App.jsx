import React from 'react'
import { Navbar } from './components/Navbar'
import { Header } from './Screens/Header'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'
import { Allproducts } from './Screens/Allproducts'
import { Footer } from './Screens/Footer'
import { Profile } from './Screens/Profile'
import { Register } from './Screens/Register'
import { Login } from './Screens/Login'
import { Explaining } from './Screens/Explaining'

export default function Album() {
  return (
    <Router>
      <React.Fragment>
        <CssBaseline />
        <Navbar />
        <Route exact path='/' component={Header} />
        <Route exact path='/features' component={Explaining} />
        <Route exact path='/products' component={Allproducts} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Footer />
      </React.Fragment>
    </Router>
  )
}
