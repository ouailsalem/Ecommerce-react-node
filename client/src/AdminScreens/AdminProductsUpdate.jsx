import React, { useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
//Redux
import { useDispatch, useSelector } from 'react-redux'
//Redux Actions
import { getProduct } from '../redux/actions/product'
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
import { Form, Field, Formik ,ErrorMessage } from 'formik'
import { TextField } from 'material-ui-formik-components/TextField'

import * as Yup from 'yup'
import { updateProduct } from '../redux/actions/adminProduct'

export const AdminProductsUpdate = ({ match, props }) => {
  /*----------------------------------------- Redux -------------------------------------------*/
  const dispatch = useDispatch()
  const { posted, loadingPr } = useSelector((state) => state.adminProduct)
  const { loading, product, pictures } = useSelector((state) => state.product)
  useEffect(() => {
    dispatch(getProduct(match.params.productId))
  }, [])
  /*----------------------------------------- use Formik -------------------------------------------*/
  /*--------------------- Initial Values ---------------------------*/

  /*--------------------- Submit Action- ---------------------------*/

  /*--------------------- Initial Values ---------------------------*/
  const validationSchema = Yup.object({
    name: Yup.string()
      .required('هذا الحقل إجباري')
      .max(255, 'أدخل اسمًا مقبولا'),
    smallDescription: Yup.string()
      .required('هذا الحقل إجباري')
      .max(255, 'الوصف طويل جدًا'),
    description: Yup.string()
      .required('هذا الحقل إجباري')
      .required('هذا الحقل إجباري'),
    price: Yup.number().required('هذا الحقل إجباري'),
    mainPicture: Yup.string().max(255).required('هذا الحقل إجباري'),
    picture1: Yup.string(),
    picture2: Yup.string(),
    picture3: Yup.string(),
    picture4: Yup.string(),
    picture5: Yup.string(),
  })

  /*---------------------------------------------------------------*/

  /*----------------------------------------- Styling -------------------------------------------*/

  const classes = useStyles()

  /*----------------------------------------- React hooks -------------------------------------------*/

  if (posted) {
    return <Redirect to='/admin/products' />
  }

  const rendered =
    loadingPr || loading ? (
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
                إضافة منتج
              </Typography>
            </Grid>

            {/*-----------------------------------------Form -------------------------------------------------*/}

            <Grid item md={12} xs={12}>
              <div className={classes.paper}>
                {/*-----------------------------------------Form Start ---------------------------------------*/}
                <Formik
                  validationSchema={validationSchema}
                  onSubmit={(values) => dispatch(updateProduct(values))}
                  initialValues={{
                    productId: match.params.productId,
                    name: product.name,
                    smallDescription: product.smallDescription,
                    description: product.description,
                    price: product.price,
                    mainPicture: product.mainPicture,
                    picture1: pictures[1],
                    picture2: pictures[2],
                    picture3: pictures[3],
                    picture4: pictures[4],
                    picture5: pictures[5],
                    available: true,
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
                    {/*-----------------------------------------name ---------------------------------------*/}

                    <FormControl className={classes.formControl}>
                      <InputLabel style={{ fontSize: 15 }}>
                        اسم المنتج
                      </InputLabel>
                      <Field
                        component={TextField}
                        name='name'
                        variant='filled'
                        margin='normal'
                        fullWidth
                        id='name'
                        type='tel'
                        required
                      />
                      <ErrorMessage name='name' />
                    </FormControl>
                    {/*-----------------------------------------smallDescription -------------------------------------------*/}

                    <FormControl className={classes.formControl}>
                      <InputLabel style={{ fontSize: 15 }}>
                        وصف قصير للمنتج
                      </InputLabel>
                      <Field
                        component={TextField}
                        name='smallDescription'
                        variant='filled'
                        margin='normal'
                        fullWidth
                        id='smallDescription'
                        type='tel'
                        required
                      />
                      <ErrorMessage name='smallDescription' />
                    </FormControl>
                    {/*-----------------------------------------Description ---------------------------------------*/}

                    <FormControl className={classes.formControl}>
                      <InputLabel style={{ fontSize: 15 }}>
                        وصف المنتج
                      </InputLabel>
                      <Field
                        component={TextField}
                        multiline
                        rows={4}
                        name='description'
                        variant='filled'
                        margin='normal'
                        fullWidth
                        id='description'
                        type='tel'
                        required
                      />
                      <ErrorMessage name='description' />
                    </FormControl>
                    {/*-----------------------------------------Price ---------------------------------------*/}

                    <FormControl className={classes.formControl}>
                      <InputLabel style={{ fontSize: 15 }}>السعر</InputLabel>
                      <Field
                        component={TextField}
                        name='price'
                        variant='filled'
                        margin='normal'
                        fullWidth
                        id='price'
                        type='tel'
                        required
                      />
                      <ErrorMessage name='price' />
                    </FormControl>
                    {/*-----------------------------------------mainPicture ---------------------------------------*/}
                    <FormControl className={classes.formControl}>
                      <InputLabel style={{ fontSize: 15 }}>
                        الصورة الأساسيـة
                      </InputLabel>

                      <Field
                        component={TextField}
                        name='mainPicture'
                        autoComplete='false'
                        variant='filled'
                        margin='normal'
                        fullWidth
                        id='mainPicture'
                        required
                      />
                      <ErrorMessage name='mainPicture' />
                    </FormControl>
                    {/*-----------------------------------------Pictures ---------------------------------------*/}
                    <FormControl className={classes.formControl}>
                      <InputLabel style={{ fontSize: 15 }}>
                        صورة إضافية 1
                      </InputLabel>

                      <Field
                        component={TextField}
                        name='picture1'
                        autoComplete='false'
                        variant='filled'
                        margin='normal'
                        fullWidth
                        id='picture1'
                      />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                      <InputLabel style={{ fontSize: 15 }}>
                        صورة إضافية 2
                      </InputLabel>

                      <Field
                        component={TextField}
                        name='picture2'
                        autoComplete='false'
                        variant='filled'
                        margin='normal'
                        fullWidth
                        id='picture2'
                      />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                      <InputLabel style={{ fontSize: 15 }}>
                        صورة إضافية 3
                      </InputLabel>

                      <Field
                        component={TextField}
                        name='picture3'
                        autoComplete='false'
                        variant='filled'
                        margin='normal'
                        fullWidth
                        id='picture3'
                      />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                      <InputLabel style={{ fontSize: 15 }}>
                        صورة إضافية 4
                      </InputLabel>

                      <Field
                        component={TextField}
                        name='picture4'
                        autoComplete='false'
                        variant='filled'
                        margin='normal'
                        fullWidth
                        id='picture4'
                      />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                      <InputLabel style={{ fontSize: 15 }}>
                        صورة إضافية 5
                      </InputLabel>

                      <Field
                        component={TextField}
                        name='picture5'
                        autoComplete='false'
                        variant='filled'
                        margin='normal'
                        fullWidth
                        id='picture5'
                      />
                    </FormControl>

                    {/*--------------------------------------- Submit Button -----------------------------------*/}
                    <Button
                      type='submit'
                      variant='contained'
                      size='large'
                      className={classes.submit}
                    >
                      أضف المنتج
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
