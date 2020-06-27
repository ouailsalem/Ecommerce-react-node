import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Loading } from '../Loading';
 const PrivateRoute = ({ component: Component, ...otherProps }) => {

  const { user, loading,isAuthenticated } = useSelector(state => state.auth);

  return (
    <Route
      {...otherProps}
      render={props => (
        !loading
          ?
          (
            isAuthenticated
              ?
              <Component {...props} />
              :
              <Redirect to={otherProps.redirectTo ? otherProps.redirectTo : '/login'} />
          )
          :
          <Loading />
      )}
    />
  )

}
export default PrivateRoute
