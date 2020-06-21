import React, { useState } from 'react'
import {
  IconButton,
  Avatar,
  Typography,
  Paper,
  Grid,
  Button,
  TextField,
  makeStyles,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import { SupervisedUserCircle, ArrowBack } from '@material-ui/icons/'
import { mainFont } from '../customize/font'
import { useDispatch, useSelector } from 'react-redux'
import { setAlert } from '../redux/actions/alert'
import { Loading } from './Loading'
import { useEffect } from 'react'
import { getProduct } from '../redux/actions/product'
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

export const Order = ({ history, match }) => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    quantity: '',
    name: '',
    phoneNumber: '',
    address: '',
    wilaya: '',
    dayra: '',
  })

  const classes = useStyles()
  useEffect(() => {
    dispatch(getProduct(match.params.productId))
  }, [dispatch, match.params.productId])
  const { loading } = useSelector((state) => state.product)
  const { product } = useSelector((state) => state.product)
  const { quantity, name, phoneNumber, address, wilaya, dayra } = formData

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
  }

  const rendered = loading ? (
    <Loading />
  ) : (
    <Grid item xs={12} component={Paper} elevation={6} square>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <SupervisedUserCircle className={classes.icon} />
        </Avatar>
        <Typography className={classes.text} component='h1' variant='h5'>
          طلب منتج
        </Typography>
        <Typography className={classes.text} component='h1' variant='h5'>
          {product.mainImage}
          {product.name}
          {product.price}
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
            dir='rtl'
            variant='filled'
            margin='normal'
            fullWidth
            id='quantity'
            label={
              <Typography component={'span'} className={classes.text}>
                الكميـة
              </Typography>
            }
            name='quantity'
            value={quantity}
            onChange={(e) => onChange(e)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            fullWidth
            id='name'
            label={
              <Typography component={'span'} className={classes.text}>
                الاسم و اللقب
              </Typography>
            }
            name='name'
            value={name}
            onChange={(e) => onChange(e)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            fullWidth
            id='phoneNumber'
            label={
              <Typography component={'span'} className={classes.text}>
                رقم الهاتف
              </Typography>
            }
            name='phoneNumber'
            value={phoneNumber}
            onChange={(e) => onChange(e)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            fullWidth
            id='address'
            label={
              <Typography component={'span'} className={classes.text}>
                العنوان
              </Typography>
            }
            name='address'
            value={address}
            onChange={(e) => onChange(e)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            fullWidth
            id='wilaya'
            label={
              <Typography component={'span'} className={classes.text}>
                الولاية
              </Typography>
            }
            name='wilayawilaya'
            value={wilaya}
            onChange={(e) => onChange(e)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            fullWidth
            id='dayra'
            label={
              <Typography component={'span'} className={classes.text}>
                الدائرة
              </Typography>
            }
            name='dayra'
            value={dayra}
            onChange={(e) => onChange(e)}
          />
          <Button
            type='submit'
            variant='contained'
            size='large'
            className={classes.submit}
          >
            أطلب
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
  )
  return rendered
}
