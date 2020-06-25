import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Dashboard } from '@material-ui/icons'
import PrivateAdminRoute from './PrivateAdminRoute'
import PrivateRoute from './PrivateRoute'
import { Affiliate } from '../Affiliate'
import { Profile } from '../Profile'
import { Register } from '../Register'
import { Login } from '../Login'
import { SingleProduct } from '../SingleProduct'
import { Order } from '../Order'
import { Allproducts } from '../Allproducts'
import { Landing } from '../Landing'
import { AdminReviews } from '../../AdminScreens/AdminReviews'
import { AdminMembers } from '../../AdminScreens/AdminMembers'
import { AdminOrdersUpdate } from '../../AdminScreens/AdminOrdersUpdate'
import { AdminOrders } from '../../AdminScreens/AdminOrders'
import { AdminProductsUpdate } from '../../AdminScreens/AdminProductsUpdate'
import { AdminProductsAdd } from '../../AdminScreens/AdminProductsAdd'
import { AdminProducts } from '../../AdminScreens/AdminProducts'
import { AppDrawer } from '../../AdminScreens/AppDrawer'
import { Navbar } from '../../components/Navbar'
import { Alerts } from '../../components/Alerts'
import { Footer } from '../Footer'
import { NotFound } from '../NotFound'
import { Header } from '../Header'

export const Routes = () => {
  return (
    <Switch>
      <Route exact path='/' component={PublicRoutes} />
      <Route  path='/admin' component={AdminRoutes} />
    </Switch>
  )
}

const AdminRoutes = () => {
  return (
    <Route>
      <div style={{ display: 'flex' }}>
        <AppDrawer />
        <Switch>
          <PrivateAdminRoute exact path='/admin' component={Dashboard} />
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
            path='/admin/reviews'
            component={AdminReviews}
          />
        </Switch>
      </div>
    </Route>
  )
}

const PublicRoutes = () => {
  return (
    <Route>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/products' component={Allproducts} />
        <Route exact path='/products/:productId' component={SingleProduct} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <PrivateRoute exact path='/profile' component={Profile} />
        <PrivateRoute exact path='/affiliate' component={Affiliate} />
        <Route exact path='/order/:productId/:refer' component={Order} />
        <Route path='*' component={NotFound} />
      </Switch>
      <Footer />
    </Route>
  )
}
