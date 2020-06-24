import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
//Redux
import { useDispatch, useSelector } from 'react-redux'
//Redux Actions
import { setAlert } from '../redux/actions/alert'
import { addOrder, resetOrder } from '../redux/actions/order'
import { getProduct } from '../redux/actions/product'
// Material UI components
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
  Card,
  CardContent,
  CardMedia,
  Container,
} from '@material-ui/core'
// Material UI Icons
import { ArrowBack, ShoppingCart } from '@material-ui/icons/'
// Components
import { Loading } from './Loading'
// Formik
import { useFormik } from 'formik'
import * as Yup from 'yup'

export const Order = ({ match }) => {
  /*----------------------------------------- use Formik -------------------------------------------*/
  /*--------------------- Initial Values ---------------------------*/

  const initialValues = {
    quantity: 1,
    name: '',
    phoneNumber: '',
    wilaya: 0,
    dayra: '',
    address: '',
  }
  const { user } = useSelector((state) => state.auth)
  /*--------------------- Submit Action- ---------------------------*/
  const onSubmit = ({
    quantity,
    name,
    phoneNumber,
    address,
    wilaya,
    dayra,
  }) => {
    dispatch(
      addOrder(
        product.id,
        product.name,
        quantity,
        name,
        phoneNumber,
        address,
        wilaya,
        dayra,
        match.params.refer,
        user ? user.id : 'guest'
      )
    )
  }
  /*--------------------- Initial Values ---------------------------*/
  const validationSchema = Yup.object({
    quantity: Yup.number(),
    name: Yup.string().max(255, 'أدخل اسمًا مقبولا'),
    phoneNumber: Yup.string().required('هذا الحقل إجباري'),
    wilaya: Yup.number().min(1, 'اختر ولايـتك'),
    dayra: Yup.string().required('هذا الحقل إجباري'),
    address: Yup.string().max(255, 'ادخل عنوانا مقبولا'),
  })

  /*---------------------------------------------------------------*/
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  })
  /*----------------------------------------- Redux -------------------------------------------*/

  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.product)
  const { product } = useSelector((state) => state.product)
  const { posting, posted } = useSelector((state) => state.order)
  /*----------------------------------------- Styling -------------------------------------------*/

  const classes = useStyles()

  /*----------------------------------------- React hooks -------------------------------------------*/

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(getProduct(match.params.productId))
  }, [dispatch, match.params.productId])

  if (posted) {
    return <Redirect to='/products' />
  }

  const rendered = loading ? (
    <Loading />
  ) : (
    <Container maxWidth='md'>
      <Grid container style={{ marginTop: '30px' }}>
        <Grid item md={2} xs={false}></Grid>

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
          {/*----------------------------------------- Order Header -------------------------------------------*/}

          <Grid item md={6} xs={12} container className={classes.gridFlex}>
            <Typography className={classes.text} component='h1' variant='h5'>
              طلب منتج
            </Typography>
            <Avatar className={classes.avatar}>
              <ShoppingCart className={classes.icon} />
            </Avatar>
          </Grid>

          {/*-----------------------------------------Product Info ---------------------------------------*/}

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
              <CardMedia
                image={product.mainPicture}
                className={classes.cover}
              />
            </Card>
          </Grid>

          {/*-----------------------------------------Form -------------------------------------------------*/}

          <Grid item md={12} xs={12}>
            <div className={classes.paper}>
              {/*-----------------------------------------Form Start ---------------------------------------*/}
              {posting ? (
                <Loading />
              ) : (
                <form
                  className={classes.form}
                  onSubmit={formik.handleSubmit}
                  noValidate
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  {/*-----------------------------------------quantity ---------------------------------------*/}
                  <FormControl className={classes.formControl}>
                    <InputLabel>الكميـة</InputLabel>

                    <TextField
                      {...formik.getFieldProps('quantity')}
                      dir='rtl'
                      variant='filled'
                      margin='normal'
                      fullWidth
                      id='quantity'
                      type='number'
                      inputProps={{ min: '0', max: '10', step: '1' }}
                      name='quantity'
                    />
                  </FormControl>
                  {/*-----------------------------------------name -------------------------------------------*/}
                  <FormControl className={classes.formControl}>
                    <InputLabel>الاسم و اللقب</InputLabel>

                    <TextField
                      name='name'
                      {...formik.getFieldProps('name')}
                      variant='filled'
                      margin='normal'
                      fullWidth
                      id='name'
                    />
                  </FormControl>
                  {/*-----------------------------------------phoneNumber ---------------------------------------*/}

                  <FormControl className={classes.formControl}>
                    <InputLabel>رقم الهاتف</InputLabel>
                    <TextField
                      name='phoneNumber'
                      {...formik.getFieldProps('phoneNumber')}
                      variant='filled'
                      margin='normal'
                      fullWidth
                      id='phoneNumber'
                      type='tel'
                      required
                      error={
                        formik.touched.phoneNumber && formik.errors.phoneNumber
                          ? true
                          : false
                      }
                    />
                    {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                      <Typography component={'span'} className={classes.error}>
                        {formik.errors.phoneNumber}
                      </Typography>
                    ) : null}
                  </FormControl>
                  <hr />
                  {/*-----------------------------------------Wilaya ---------------------------------------*/}
                  <FormControl
                    className={classes.formControl}
                    error={
                      formik.touched.wilaya && formik.errors.wilaya
                        ? true
                        : false
                    }
                  >
                    <InputLabel disableAnimation={true}>الولايـة</InputLabel>

                    <Select
                      required
                      name='wilaya'
                      {...formik.getFieldProps('wilaya')}
                    >
                      <MenuItem value={0}>اختر ولايـتك</MenuItem>
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
                    {formik.touched.wilaya && formik.errors.wilaya ? (
                      <Typography component={'span'} className={classes.error}>
                        {formik.errors.wilaya}
                      </Typography>
                    ) : null}
                  </FormControl>
                  {/*-----------------------------------------Dayra ---------------------------------------*/}
                  <FormControl className={classes.formControl}>
                    <InputLabel>الدائرة</InputLabel>

                    <TextField
                      name='dayra'
                      {...formik.getFieldProps('dayra')}
                      autoComplete='false'
                      variant='filled'
                      margin='normal'
                      fullWidth
                      id='dayra'
                      required
                      error={
                        formik.touched.dayra && formik.errors.dayra
                          ? true
                          : false
                      }
                    />
                    {formik.touched.dayra && formik.errors.dayra ? (
                      <Typography component={'span'} className={classes.error}>
                        {formik.errors.dayra}
                      </Typography>
                    ) : null}
                  </FormControl>
                  {/*-----------------------------------------address ---------------------------------------*/}
                  <FormControl className={classes.formControl}>
                    <InputLabel>العنوان</InputLabel>

                    <TextField
                      {...formik.getFieldProps('address')}
                      name='address'
                      autoComplete='false'
                      variant='filled'
                      margin='normal'
                      fullWidth
                      id='address'
                    />
                  </FormControl>
                  {/*--------------------------------------- Submit Button -----------------------------------*/}
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
              )}
              {/*-----------------------------------------FORM END ---------------------------------------*/}
            </div>
          </Grid>
        </Grid>
        <Grid item md={2} xs={false}></Grid>
      </Grid>
    </Container>
  )

  return rendered
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  card: {
    maxWidth: 345,
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
    marginTop: 10,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '80%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '60%',
    },
  },
  submit: {
    fontSize: 23,
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
    textDecoration: 'none',
  },
  error: {
    fontSize: 13,
    color: 'red',
    textAlign: 'left',
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
    height: 200,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
  },
}))
