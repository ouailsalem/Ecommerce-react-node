import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Loading } from '../Loading'

const PrivateAdminRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth)
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page

    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading && user.name !== 'candy' ? (
          <Redirect to='/' />
        ) : (
          <Component {...props} />
        )
      }
    />
  )
}

export default PrivateAdminRoute