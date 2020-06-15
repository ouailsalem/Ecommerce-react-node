import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import { ShoppingCart, Person } from '@material-ui/icons/'
import { Menu, MenuItem } from '@material-ui/core'
import { mainFont } from '../customize/font'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
    color: '#FFCC33',
  },
  title: {
    flexGrow: 1,
  },
  text: {
    fontSize: 24,
    fontFamily: mainFont,
    cursor: 'pointer',
    color: '#fff',
  },
  tool: {
    paddingLeft: '3%',
    paddingRight: '3%',
  },
  navItemText: {
    fontSize: 22,
    fontFamily: mainFont,
    cursor: 'pointer',
    color: '#fff',
  },
  menuItem: {
    fontSize: 16,
    fontFamily: mainFont,
    cursor: 'pointer',
    color: '#000',
  },
  appBar: {
    backgroundColor: '#222222',
  },
}))
export const RealNavBar = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  //cart
  const [anchorElCart, setAnchorElCart] = React.useState(null)

  const handleClickCart = (event) => {
    setAnchorElCart(event.currentTarget)
  }

  const handleCloseCart = () => {
    setAnchorElCart(null)
  }
  const classes = useStyles()
  const isloggedin = false
  return (
    <AppBar ref={props.goback} className={classes.appBar} position={'sticky'}>
      <Toolbar className={classes.tool}>
        <Typography variant='h6' className={classes.title}>
          {!isloggedin ? (
            <Fragment>
              <IconButton
                edge='start'
                className={classes.menuButton}
                color='inherit'
                aria-label='menu'
                aria-controls='simple-menu'
                aria-haspopup='true'
                onClick={handleClick}
              >
                <Person />
              </IconButton>
              <Menu
                id='simple-menu'
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose} component={Link} to='/profile'>
                  <Typography className={classes.menuItem}>حسابي</Typography>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Typography className={classes.menuItem}>حسابي</Typography>
                </MenuItem>
              </Menu>
            </Fragment>
          ) : (
            <Fragment>
              <Button component={Link} to='/register'>
                <Typography className={classes.navItemText}>تسجيل</Typography>
              </Button>
              <Button component={Link} to='/login'>
                <Typography className={classes.navItemText}>دخول</Typography>
              </Button>
            </Fragment>
          )}
          <IconButton
            edge='start'
            className={classes.menuButton}
            aria-controls='simple-menu-cart'
            aria-haspopup='true'
            onClick={handleClickCart}
          >
            <ShoppingCart />
          </IconButton>
          <Menu
            id='simple-menu-cart'
            anchorEl={anchorElCart}
            keepMounted
            open={Boolean(anchorElCart)}
            onClose={handleCloseCart}
          >
            <MenuItem
              onClick={() => {
                console.log('cart')
              }}
            >
              السلة فارغــة
            </MenuItem>
          </Menu>
        </Typography>
        <Button
          color='inherit'
          component={Link}
          to='/'
          className={classes.text}
        >
          <Typography className={classes.navItemText}>متجري</Typography>
        </Button>
      </Toolbar>
    </AppBar>
  )
}
