import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'

import MenuIcon from '@material-ui/icons/Menu'
import ShoppingCart from '@material-ui/icons/ShoppingCart'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { dispatch, useSelector, useDispatch } from 'react-redux'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import { logout } from '../redux/actions/auth'
import { Link } from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  navLink: {
    fontSize: '20px',
    flexGrow: 1,
    marginLeft: 5,
    cursor: 'pointer',
    textDecoration: 'none',
    '&:visited': {
      color: 'white',
    },
  },
  home: {
    fontSize: '24px',
    flexGrow: 1,
    marginLeft: 5,
    cursor: 'pointer',
    textDecoration: 'none',
    '&:visited': {
      color: 'white',
    },
  },
}))

export function RealNavBar() {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const { isAuthenticated, loading } = useSelector((state) => state.auth)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h5' className={classes.home}>
          متجري
        </Typography>
        <IconButton
          aria-label='account of current user'
          aria-controls='menu-appbar'
          aria-haspopup='true'
          component={Link}
          to='/products'
          color='inherit'
        >
          <ShoppingCart />
        </IconButton>
        <div>
          {isAuthenticated ? (
            <Fragment>
              <IconButton
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleMenu}
                color='inherit'
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>حسابي</MenuItem>
                <MenuItem onClick={() => dispatch(logout())}>
                  تسجيل الخروج
                </MenuItem>
              </Menu>
            </Fragment>
          ) : (
            <Fragment>
              <Typography
                component={Link}
                to='/register'
                variant='span'
                className={classes.navLink}
              >
                {' '}
                تسجيل
              </Typography>
              <Typography
                component={Link}
                to='/login'
                variant='span'
                className={classes.navLink}
              >
                {' '}
                دخول
              </Typography>
            </Fragment>
          )}
        </div>
      </Toolbar>
    </AppBar>
  )
}
