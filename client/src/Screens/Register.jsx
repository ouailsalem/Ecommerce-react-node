import React, { useState } from 'react'
import {
  IconButton,
  Avatar,
  Typography,
  Paper,
  Grid,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  makeStyles,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import {
  SupervisedUserCircle,
  ArrowBack,
  AlternateEmailTwoTone,
} from '@material-ui/icons/'
import { mainFont } from '../customize/font'
import Axios from 'axios'
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
function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}
////////////////////////////////////////
export const Register = () => {
  const classes = useStyles()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [nameError, setNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  const { name, email, password } = formData
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  const onSubmit = (e) => {
    e.preventDefault()
    if (formData.name.trim().length < 3) {
      setNameError(true)
    } else {
      setNameError(false)
    }
    if (!validateEmail(email)) {
      setEmailError(true)
    } else {
      setEmailError(false)
    }
    if (formData.password.trim().length < 6) {
      setPasswordError(true)
    } else {
      setPasswordError(false)
    }
    if (nameError || emailError || passwordError) {
      console.log('hey')
    } else {
      Axios.post('/users/register', {
        name,
        email,
        password,
      })
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log('err' + error)
          console.log(error.message)
        })
    }
  }
  return (
    <Grid container component='main' className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />

      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <SupervisedUserCircle className={classes.icon} />
          </Avatar>
          <Typography className={classes.text} component='h1' variant='h5'>
            التسجيل
          </Typography>
          <form
            className={classes.form}
            onSubmit={onSubmit}
            noValidate
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              id='name'
              label={
                <Typography alignRight className={classes.text}>
                  اسم المتسخدم
                </Typography>
              }
              name='name'
              autoComplete='username'
              autoFocus
              value={name}
              error={nameError}
              helperText={
                nameError ? 'name should be longer than 3 characters' : ''
              }
              onChange={(e) => onChange(e)}
            />
            <TextField
              error={emailError}
              helperText={emailError ? 'please enter a valid email' : ''}
              variant='outlined'
              margin='normal'
              fullWidth
              id='email'
              label={
                <Typography alignRight className={classes.text}>
                  البريد الإلكتروني
                </Typography>
              }
              name='email'
              autoComplete='email'
              autoFocus
              value={email}
              onChange={(e) => onChange(e)}
            />
            <TextField
              error={passwordError}
              helperText={
                passwordError ? 'password shoulda be at least 5 characters' : ''
              }
              variant='outlined'
              margin='normal'
              fullWidth
              name='password'
              label={
                <Typography alignRight className={classes.text}>
                  كلمة المرور
                </Typography>
              }
              type='password'
              id='password'
              autoComplete='current-password'
              value={password}
              onChange={(e) => onChange(e)}
            />

            <Button
              type='submit'
              variant='contained'
              size='large'
              className={classes.submit}
            >
              تسجيل
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to='/' variant='body2'>
                  <IconButton>
                    <ArrowBack />
                  </IconButton>
                </Link>
                <Typography className={classes.text} component='span'>
                  رجوع
                </Typography>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  )
}
