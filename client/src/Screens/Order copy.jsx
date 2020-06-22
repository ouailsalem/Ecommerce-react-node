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
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import {
  SupervisedUserCircle,
  ArrowBack,
  ShoppingCart,
} from '@material-ui/icons/'
import { mainFont } from '../customize/font'
import { useDispatch, useSelector } from 'react-redux'
import { setAlert } from '../redux/actions/alert'
import { addOrder } from '../redux/actions/order'
import { Loading } from './Loading'
import { useEffect } from 'react'
import { getProduct } from '../redux/actions/product'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    fontFamily: mainFont,
  },
  card: {
    maxWidth: 345,
  },
  image: {
    backgroundImage: 'url(./couple-bag.jpeg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: '10px',
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
  formControl: {
    width: '100%', // Fix IE 11 issue.
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
  gridFlex: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cover: {
    height: 151,
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
    window.scrollTo(0, 0)

    dispatch(getProduct(match.params.productId))
  }, [dispatch, match.params.productId])
  const { loading } = useSelector((state) => state.product)
  const { product } = useSelector((state) => state.product)
  const { quantity, name, phoneNumber, address, dayra } = formData

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(
      addOrder(
        product.id,
        product.name,
        quantity,
        name,
        phoneNumber,
        address,
        String(wilaya),
        dayra,
        match.params.refer
      )
    )
  }

  //form
  const [wilaya, setWilaya] = useState('')

  const rendered = loading ? (
    <Loading />
  ) : (
    <Grid container style={{ marginTop: '30px' }}>
      <Grid item md={2} xs={0}></Grid>

      <Grid
        alignItems={'center'}
        alignContent={'center'}
        item
        md={8}
        xs={12}
        component={Paper}
        elevation={6}
        container
      >
        <Grid item md={6} xs={12} container className={classes.gridFlex}>
          <Typography className={classes.text} component='h1' variant='h5'>
            طلب منتج
          </Typography>
          <Avatar className={classes.avatar}>
            <ShoppingCart className={classes.icon} />
          </Avatar>
        </Grid>
        <Grid item md={6} xs={12} className={classes.gridFlex}>
          <Card className={classes.card}>
            <CardContent>
              <Typography component='h5' variant='h5'>
                {product.name}
              </Typography>
              <Typography variant='subtitle1' color='textSecondary'>
                {product.price} دج
              </Typography>
            </CardContent>
            <CardMedia image={product.mainPicture} className={classes.cover} />
          </Card>
        </Grid>
        <Grid item md={12} xs={12}>
          <div className={classes.paper}>
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
                variant='filled'
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
                variant='filled'
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
                variant='filled'
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
              <FormControl className={classes.formControl}>
                <InputLabel id='demo-simple-select-label'>الولايـة</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={wilaya}
                  onChange={(e) => setWilaya(e.target.value)}
                >
                  <MenuItem value={1}>أدرار</MenuItem>
                  <MenuItem value={2}>الشلف</MenuItem>
                  <MenuItem value={3}>الأغواط</MenuItem>
                  <MenuItem value={4}> أم البواقي</MenuItem>
                  <MenuItem value={5}>باتنة</MenuItem>
                  <MenuItem value={6}>بجاية</MenuItem>
                  <MenuItem value={7}>بسكرة</MenuItem>
                  <MenuItem value={8}>بشار</MenuItem>
                  <MenuItem value={9}>البليدة</MenuItem>
                  <MenuItem value={10}>البويرة</MenuItem>
                  <MenuItem value={11}>تمنراست</MenuItem>
                  <MenuItem value={12}>تبسة</MenuItem>
                  <MenuItem value={13}>تلمسان</MenuItem>
                  <MenuItem value={14}>تيارت</MenuItem>
                  <MenuItem value={15}>تيزي وزو</MenuItem>
                  <MenuItem value={16}>الجزائر</MenuItem>
                  <MenuItem value={17}>الجلفة</MenuItem>
                  <MenuItem value={18}>جيجل</MenuItem>
                  <MenuItem value={19}>سطيف</MenuItem>
                  <MenuItem value={20}>سعيدة</MenuItem>
                  <MenuItem value={21}>سكيكدة</MenuItem>
                  <MenuItem value={22}>سيدي بلعباس</MenuItem>
                  <MenuItem value={23}>عنابة</MenuItem>
                  <MenuItem value={24}>قالمة</MenuItem>
                  <MenuItem value={25}>قسنطينة</MenuItem>
                  <MenuItem value={26}>المدية</MenuItem>
                  <MenuItem value={27}>مستغانم</MenuItem>
                  <MenuItem value={28}>المسيلة</MenuItem>
                  <MenuItem value={29}>معسكر</MenuItem>
                  <MenuItem value={30}>ورقلة</MenuItem>
                  <MenuItem value={31}>وهران</MenuItem>
                  <MenuItem value={32}>البيض</MenuItem>
                  <MenuItem value={33}>إليزي</MenuItem>
                  <MenuItem value={34}>برج بوعريريج</MenuItem>
                  <MenuItem value={35}>بومرداس</MenuItem>
                  <MenuItem value={36}>الطارف</MenuItem>
                  <MenuItem value={37}>تندوف</MenuItem>
                  <MenuItem value={38}>تسمسيلت</MenuItem>
                  <MenuItem value={39}>الوادي</MenuItem>
                  <MenuItem value={40}>خنشلة</MenuItem>
                  <MenuItem value={41}>سوق أهراس</MenuItem>
                  <MenuItem value={42}>تيبازة</MenuItem>
                  <MenuItem value={43}>ميلة</MenuItem>
                  <MenuItem value={44}>عين الدفلى</MenuItem>
                  <MenuItem value={45}>النعامة</MenuItem>
                  <MenuItem value={46}>عين تموشنت</MenuItem>
                  <MenuItem value={47}>غرداية</MenuItem>
                  <MenuItem value={48}>غليزان</MenuItem>
                </Select>
              </FormControl>
              <TextField
                variant='filled'
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
                variant='filled'
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
      </Grid>
      <Grid item md={2} xs={0}></Grid>
    </Grid>
  )
  return rendered
}
