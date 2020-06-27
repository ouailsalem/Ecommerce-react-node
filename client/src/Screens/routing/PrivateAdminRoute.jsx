import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Loading } from '../Loading';
const PrivateAdminRoute = ({ component: Component, ...otherProps }) => {

  const { user, loading, isAuthenticated } = useSelector(state => state.auth);

  return (
    <Route
      {...otherProps}
      render={props => (
        !loading
          ?
          (
            isAuthenticated
              ?
              (user.name === "admin" ?
                <Component {...props} /> :
                <Redirect to={otherProps.redirectTo ? otherProps.redirectTo : '/404'} />
              )
              :
              <Redirect to={otherProps.redirectTo ? otherProps.redirectTo : '/404'} />
          )
          :
          <Loading />
      )}
    />
  )

}
export default PrivateAdminRoute
