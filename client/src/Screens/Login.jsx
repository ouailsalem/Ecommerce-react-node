import React from 'react'
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
import { Lock, ArrowBack } from '@material-ui/icons/'
import { mainFont } from '../customize/font'

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
  const classes = useStyles()

  return (
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
              required
              fullWidth
              id='email'
              label='EMAIL'
              name='email'
              autoComplete='email'
              autoFocus
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='PASSWORD'
              type='password'
              id='password'
              autoComplete='current-password'
            />

            <Button
              component={Link}
              to='/'
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
}
