import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Loading } from '../Loading'
import { loadUser } from '../../redux/actions/auth'

const PrivateAdminRoute = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    store.dispatch(loadUser())
  }, [dispatch])

  const { isAuthenticated, loading, user } = useSelector((state) => state.auth)
  return (
    // Otherwise, redirect the user to /signin page

    <Route
      {...rest}
      render={
        loading
          ? (props) => <Loading />
          : (props) =>
              !isAuthenticated || user.name !== 'admin' ? (
                <Redirect to='/404' />
              ) : (
                <Component {...props} />
              )
      }
    />
  )
}

export default PrivateAdminRoute
