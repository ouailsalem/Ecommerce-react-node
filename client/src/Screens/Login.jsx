import React, { useState, useEffect } from 'react'
import {
  IconButton,
  Avatar,
  Typography,
  Paper,
  Grid,
  Button,
  CssBaseline,
  TextField,
  makeStyles,
} from '@material-ui/core'
import { Link, Redirect } from 'react-router-dom'
import { Lock, ArrowBack } from '@material-ui/icons/'
import { mainFont } from '../customize/font'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/actions/auth'
import { setAlert } from '../redux/actions/alert'
import { Loading } from '../Screens/Loading'
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    fontFamily: mainFont,
  },
  image: {
    backgroundImage: 'url(./couple-bag.jpeg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#FFCC33',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },

  submit: {
    fontSize: 23,
    fontFamily: mainFont,
    width: '70%',
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#FFCC33',
    '&:hover': {
      color: '#FFCC33',
      backgroundColor: '#222222',
      boxShadow: 'none',
    },
  },

  text: {
    fontFamily: mainFont,
    textDecoration: 'none',
  },
  icon: {
    color: '#222222',
  },
}))

export const Login = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const dispatch = useDispatch()
  const classes = useStyles()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { email, password } = formData
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  const onSubmit = (e) => {
    e.preventDefault()
    if (email !== '' && password !== '') {
      dispatch(login({ email, password }))
    } else {
      dispatch(setAlert('الخانات لا يمكن أن تكون فارغـة', 'warning', true))
    }
  }
  const { isAuthenticated, loading } = useSelector((state) => state.auth)
  if (isAuthenticated) {
    return <Redirect to='/' />
  }

  const rendered = loading ? (
    <Loading />
  ) : (
    <Grid container component='main' className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <Lock className={classes.icon} />
          </Avatar>
          <Typography className={classes.text} component='h1' variant='h5'>
            تسجيل الدخول
          </Typography>
          <form
            className={classes.form}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            onSubmit={onSubmit}
          >
            <TextField
              variant='filled'
              margin='normal'
              fullWidth
              id='email'
              label={
                <Typography className={classes.text}>
                  البريد الإلكتروني
                </Typography>
              }
              value={email}
              name='email'
              autoComplete='email'
              autoFocus
              onChange={(e) => onChange(e)}
            />
            <TextField
              variant='filled'
              margin='normal'
              fullWidth
              name='password'
              label={
                <Typography className={classes.text}>كلمة المرور</Typography>
              }
              value={password}
              type='password'
              id='password'
              autoComplete='current-password'
              onChange={(e) => onChange(e)}
            />

            <Button
              type='submit'
              variant='contained'
              size='large'
              className={classes.submit}
            >
              دخول
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to='/' variant='body2'>
                  <IconButton className={classes.menuButton}>
                    <ArrowBack />
                  </IconButton>
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
    </Grid>
  )
  return rendered
}
