import React, { useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
//Redux
import { useDispatch, useSelector } from 'react-redux'
//Redux Actions
import { getOrder } from '../redux/actions/order'
import { updateOrder } from '../redux/actions/adminOrder'

// Material UI components
import {
  IconButton,
  Typography,
  Paper,
  Grid,
  Button,
  makeStyles,
  Select,
  FormControl,
  InputLabel,
  Container,
} from '@material-ui/core'
// Material UI Icons
import { ArrowBack } from '@material-ui/icons/'
// Components
import { Loading } from '../Screens/Loading'
// Formik
import { Form, Field, Formik, ErrorMessage } from 'formik'
import { TextField } from 'material-ui-formik-components/TextField'

import * as Yup from 'yup'

export const AdminOrdersUpdate = ({ match, props }) => {
  /*----------------------------------------- Redux -------------------------------------------*/
  const { loading, order } = useSelector((state) => state.order)
  const { loadingOr, posted } = useSelector((state) => state.adminOrder)
  console.log(match)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getOrder(match.params.orderId))
  }, [])

  /*--------------------- Validation Schema ---------------------------*/
  const validationSchema = Yup.object({
    product: Yup.string(),
    quantity: Yup.string(),
    name: Yup.string(),
    phoneNumber: Yup.string().required('هذا الحقل إجباري'),
    address: Yup.string(),
    wilaya: Yup.number().required('هذا الحقل إجباري'),
    dayra: Yup.string(),
    status: Yup.string(),
    refer: Yup.string(),
  })

  /*---------------------------------------------------------------*/

  /*----------------------------------------- Styling -------------------------------------------*/

  const classes = useStyles()

  /*----------------------------------------- React hooks -------------------------------------------*/
  if (posted) {
    return <Redirect to='/admin/orders' />
  }

  const rendered =
    loading || loadingOr ? (
      <Loading />
    ) : (
      <Container maxWidth='lg'>
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
                إضافة منتج
              </Typography>
            </Grid>
            <Grid item container justify={'flex-end'} md={6} xs={12}>
              <Link
                to='/admin/orders'
                variant='body2'
                style={{ marginLeft: 30 }}
              >
                <IconButton>
                  <ArrowBack />
                </IconButton>
                <Typography className={classes.text} component='span'>
                  رجوع
                </Typography>
              </Link>
            </Grid>

            {/*-----------------------------------------Form -------------------------------------------------*/}

            <Grid item xs={12}>
              <div className={classes.paper}>
                {/*-----------------------------------------Form Start ---------------------------------------*/}
                <Formik
                  validationSchema={validationSchema}
                  onSubmit={(values) => {
                    dispatch(
                      updateOrder(
                        values.product,
                        values.quantity,
                        values.name,
                        values.phoneNumber,
                        values.address,
                        values.wilaya,
                        values.dayra,
                        match.params.orderId
                      )
                    )
                  }}
                  initialValues={{
                    product: order.product,
                    quantity: order.quantity,
                    name: order.name,
                    phoneNumber: order.phoneNumber,
                    address: order.address,
                    wilaya: order.wilaya,
                    dayra: order.dayra,
                    // product: "order.product",
                    // quantity:2,
                    // name: "order.name",
                    // phoneNumber: "order.phoneNumber",
                    // address: "order.address",
                    // wilaya: "order.wilaya",
                    // dayra: "order.dayra",
                    // status: "order.status",
                    // refer: "order.refer",
                  }}
                >
                  <Form
                    className={classes.form}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    {/*----------------------------------------- name ---------------------------------------*/}

                    <FormControl className={classes.formControl}>
                      <InputLabel style={{ fontSize: 15 }}>
                        اسم المنتج
                      </InputLabel>
                      <Field
                        component={TextField}
                        name='product'
                        variant='filled'
                        margin='normal'
                        fullWidth
                        id='product'
                        required
                      />
                      <ErrorMessage name='product' />
                    </FormControl>
                    {/*----------------------------------------- quantity ---------------------------------------*/}

                    <FormControl className={classes.formControl}>
                      <InputLabel style={{ fontSize: 15 }}>quantity</InputLabel>
                      <Field
                        component={TextField}
                        name='quantity'
                        variant='filled'
                        margin='normal'
                        fullWidth
                        id='quantity'
                        type='number'
                        required
                      />
                      <ErrorMessage name='quantity' />
                    </FormControl>
                    {/*----------------------------------------- name ---------------------------------------*/}

                    <FormControl className={classes.formControl}>
                      <InputLabel style={{ fontSize: 15 }}>name</InputLabel>
                      <Field
                        component={TextField}
                        name='name'
                        variant='filled'
                        margin='normal'
                        fullWidth
                        id='name'
                        required
                      />
                      <ErrorMessage name='name' />
                    </FormControl>
                    {/*----------------------------------------- phoneNumber ---------------------------------------*/}

                    <FormControl className={classes.formControl}>
                      <InputLabel style={{ fontSize: 15 }}>
                        phoneNumber
                      </InputLabel>
                      <Field
                        component={TextField}
                        name='phoneNumber'
                        variant='filled'
                        margin='normal'
                        fullWidth
                        id='phoneNumber'
                        required
                      />
                      <ErrorMessage name='phoneNumber' />
                    </FormControl>
                    {/*----------------------------------------- address ---------------------------------------*/}

                    <FormControl className={classes.formControl}>
                      <InputLabel style={{ fontSize: 15 }}>address</InputLabel>
                      <Field
                        component={TextField}
                        name='address'
                        variant='filled'
                        margin='normal'
                        fullWidth
                        id='address'
                        required
                      />
                      <ErrorMessage name='address' />
                    </FormControl>
                    {/*----------------------------------------- wilaya ---------------------------------------*/}

                    <FormControl className={classes.formControl}>
                      <InputLabel style={{ fontSize: 15 }}>wilaya</InputLabel>
                      <Field
                        component={TextField}
                        name='wilaya'
                        variant='filled'
                        margin='normal'
                        fullWidth
                        id='wilaya'
                        required
                      />
                      <ErrorMessage name='wilaya' />
                    </FormControl>
                    {/*----------------------------------------- dayra ---------------------------------------*/}

                    <FormControl className={classes.formControl}>
                      <InputLabel style={{ fontSize: 15 }}>dayra</InputLabel>
                      <Field
                        component={TextField}
                        name='dayra'
                        variant='filled'
                        margin='normal'
                        fullWidth
                        id='dayra'
                        required
                      />
                      <ErrorMessage name='dayra' />
                    </FormControl>
                    {/*----------------------------------------- status ---------------------------------------*/}

                    {/*----------------------------------------- refer ---------------------------------------*/}

                    {/*--------------------------------------- Submit Button -----------------------------------*/}
                    <Button
                      type='submit'
                      variant='contained'
                      size='large'
                      className={classes.submit}
                    >
                      حفظ التعديلات
                    </Button>
                  </Form>
                </Formik>
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
    width: '100%',
    marginTop: 10,
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
