import React, { useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { loadUser } from '../../redux/actions/auth'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading ? (
          <Redirect to='/' />
        ) : (
          <Component {...props} />
        )
      }
    />
  )
}

export default PrivateRoute
