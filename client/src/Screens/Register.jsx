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
  makeStyles,
} from '@material-ui/core'
import { Link, Redirect } from 'react-router-dom'
import { SupervisedUserCircle, ArrowBack } from '@material-ui/icons/'
import { mainFont } from '../customize/font'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../redux/actions/auth'
import { validateEmail } from '../utils/validateEmail'
import { setAlert } from '../redux/actions/alert'
import { Loading } from './Loading'
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
  error: {
    fontFamily: mainFont,
    fontSize: 15,
  },
  icon: {
    color: '#222222',
  },
}))

export const Register = () => {
  const dispatch = useDispatch()
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
  const onBlurName = () => {
    if (formData.name.trim().length < 3) {
      setNameError(true)
    } else {
      setNameError(false)
    }
  }
  const onBlurEmail = () => {
    if (!validateEmail(email)) {
      setEmailError(true)
    } else {
      setEmailError(false)
    }
  }
  const onBlurPassword = () => {
    if (formData.password.trim().length < 6) {
      setPasswordError(true)
    } else {
      setPasswordError(false)
    }
  }
  const onSubmit = (e) => {
    e.preventDefault()

    if (
      nameError === false &&
      emailError === false &&
      passwordError === false &&
      name !== '' &&
      email !== '' &&
      password !== ''
    ) {
      dispatch(register({ name, email, password }))
    } else {
      dispatch(setAlert('تأكد من أن معلوماتك صحيحة', 'warning', true))
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
              alignItems: 'center',
            }}
          >
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              id='name'
              onBlur={onBlurName}
              label={
                <Typography component={'span'} className={classes.text}>
                  اسم المتسخدم
                </Typography>
              }
              name='name'
              autoComplete='username'
              value={name}
              error={nameError}
              helperText={
                nameError ? (
                  <Typography component={'span'} className={classes.error}>
                    اسم المتسخدم يجب أن يحتوي على ثلاث حروف على الأقل
                  </Typography>
                ) : (
                  ''
                )
              }
              onChange={(e) => onChange(e)}
            />
            <TextField
              error={emailError}
              helperText={
                emailError ? (
                  <Typography component={'span'} className={classes.error}>
                    تأكد من أن بريدك الإلكتروني صحيح
                  </Typography>
                ) : (
                  ''
                )
              }
              variant='outlined'
              margin='normal'
              fullWidth
              id='email'
              label={
                <Typography component={'span'} className={classes.text}>
                  البريد الإلكتروني
                </Typography>
              }
              name='email'
              autoComplete='email'
              value={email}
              onBlur={onBlurEmail}
              onChange={(e) => onChange(e)}
            />
            <TextField
              error={passwordError}
              helperText={
                passwordError ? (
                  <Typography component={'span'} className={classes.error}>
                    كلمة المرور يجب أن تحتوي على ستة حروف على الأقل
                  </Typography>
                ) : (
                  ''
                )
              }
              variant='outlined'
              margin='normal'
              fullWidth
              name='password'
              label={
                <Typography component={'span'} className={classes.text}>
                  كلمة المرور
                </Typography>
              }
              type='password'
              id='password'
              autoComplete='current-password'
              value={password}
              onBlur={onBlurPassword}
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
  return rendered
}
