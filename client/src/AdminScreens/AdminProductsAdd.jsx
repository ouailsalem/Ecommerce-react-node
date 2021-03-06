import React from 'react'
import { Link, Redirect } from 'react-router-dom'
//Redux
import { useDispatch, useSelector } from 'react-redux'
//Redux Actions
// Material UI components
import {
  IconButton,
  Typography,
  Paper,
  Grid,
  Button,
  TextField,
  makeStyles,
  FormControl,
  InputLabel,
  Container,
} from '@material-ui/core'
// Material UI Icons
import { ArrowBack } from '@material-ui/icons/'
// Components
import { Loading } from '../Screens/Loading'
// Formik
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { addProduct } from '../redux/actions/adminProduct'

export const AdminProductsAdd = ({ match }) => {
  /*----------------------------------------- Redux -------------------------------------------*/
  const dispatch = useDispatch()
  const { posted, loadingPr } = useSelector((state) => state.adminProduct)

  /*----------------------------------------- use Formik -------------------------------------------*/
  /*--------------------- Initial Values ---------------------------*/

  const initialValues = {
    name: '',
    smallDescription: '',
    description: '',
    price: 0,
    mainPicture: '',
    videoLink: '',
    picture1: '',
    picture2: '',
    picture3: '',
    picture4: '',
    picture5: '',
    available: true,
  }
  /*--------------------- Submit Action- ---------------------------*/
  const onSubmit = () => {
    dispatch(addProduct(formik.values))
  }
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
    price: Yup.string().required('هذا الحقل إجباري'),
    mainPicture: Yup.string().required('هذا الحقل إجباري'),
    videoLink: Yup.string(),
    picture1: Yup.string(),
    picture2: Yup.string(),
    picture3: Yup.string(),
    picture4: Yup.string(),
    picture5: Yup.string(),
  })

  /*---------------------------------------------------------------*/
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  })

  /*----------------------------------------- Styling -------------------------------------------*/

  const classes = useStyles()

  /*----------------------------------------- React hooks -------------------------------------------*/

  if (posted) {
    return <Redirect to='/admin/products' />
  }

  const rendered = loadingPr ? (
    <Loading />
  ) : (
    <Container maxWidth={'lg'}>
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
          {/*----------------------------------------- Add Product Header -------------------------------------------*/}

          <Grid item md={6} xs={12} container className={classes.gridFlex}>
            <Typography className={classes.text} component='h1' variant='h5'>
              إضافة منتج
            </Typography>
          </Grid>
          <Grid item container justify={'flex-end'} md={6} xs={12}>
            <Link
              to='/admin/products'
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

          <Grid item md={12} xs={12}>
            <div className={classes.paper}>
              {/*-----------------------------------------Form Start ---------------------------------------*/}

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
                {/*-----------------------------------------name ---------------------------------------*/}

                <FormControl className={classes.formControl}>
                  <InputLabel style={{ fontSize: 15 }}>اسم المنتج</InputLabel>
                  <TextField
                    name='name'
                    {...formik.getFieldProps('name')}
                    variant='filled'
                    margin='normal'
                    fullWidth
                    id='name'
                    type='tel'
                    error={
                      formik.touched.name && formik.errors.name ? true : false
                    }
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <Typography component={'span'} className={classes.error}>
                      {formik.errors.name}
                    </Typography>
                  ) : null}
                </FormControl>
                {/*-----------------------------------------smallDescription -------------------------------------------*/}

                <FormControl className={classes.formControl}>
                  <InputLabel style={{ fontSize: 15 }}>
                    وصف قصير للمنتج
                  </InputLabel>
                  <TextField
                    name='smallDescription'
                    {...formik.getFieldProps('smallDescription')}
                    variant='filled'
                    margin='normal'
                    fullWidth
                    id='smallDescription'
                    error={
                      formik.touched.smallDescription &&
                      formik.errors.smallDescription
                        ? true
                        : false
                    }
                  />
                  {formik.touched.smallDescription &&
                  formik.errors.smallDescription ? (
                    <Typography component={'span'} className={classes.error}>
                      {formik.errors.smallDescription}
                    </Typography>
                  ) : null}
                </FormControl>
                {/*-----------------------------------------Description ---------------------------------------*/}

                <FormControl className={classes.formControl}>
                  <InputLabel style={{ fontSize: 15 }}>وصف المنتج</InputLabel>
                  <TextField
                    multiline
                    rows={4}
                    name='description'
                    {...formik.getFieldProps('description')}
                    variant='filled'
                    margin='normal'
                    fullWidth
                    id='description'
                    error={
                      formik.touched.description && formik.errors.description
                        ? true
                        : false
                    }
                  />
                  {formik.touched.description && formik.errors.description ? (
                    <Typography component={'span'} className={classes.error}>
                      {formik.errors.description}
                    </Typography>
                  ) : null}
                </FormControl>
                {/*-----------------------------------------Description ---------------------------------------*/}

                <FormControl className={classes.formControl}>
                  <InputLabel style={{ fontSize: 15 }}>السعر</InputLabel>
                  <TextField
                  
                    name='price'
                    {...formik.getFieldProps('price')}
                    variant='filled'
                    margin='normal'
                    fullWidth
                    id='price'
                    error={
                      formik.touched.price && formik.errors.price ? true : false
                    }
                  />
                  {formik.touched.price && formik.errors.price ? (
                    <Typography component={'span'} className={classes.error}>
                      {formik.errors.price}
                    </Typography>
                  ) : null}
                </FormControl>
                {/*-----------------------------------------mainPicture ---------------------------------------*/}
                <FormControl className={classes.formControl}>
                  <InputLabel style={{ fontSize: 15 }}>
                    الصورة الأساسيـة
                  </InputLabel>

                  <TextField
                    name='mainPicture'
                    {...formik.getFieldProps('mainPicture')}
                    autoComplete='false'
                    variant='filled'
                    margin='normal'
                    fullWidth
                    id='mainPicture'
                    error={
                      formik.touched.mainPicture && formik.errors.mainPicture
                        ? true
                        : false
                    }
                  />
                  {formik.touched.mainPicture && formik.errors.mainPicture ? (
                    <Typography component={'span'} className={classes.error}>
                      {formik.errors.mainPicture}
                    </Typography>
                  ) : null}
                </FormControl>
                {/*-----------------------------------------videoLink ---------------------------------------*/}
                <FormControl className={classes.formControl}>
                  <InputLabel style={{ fontSize: 15 }}>
                    رابط الفيديو
                  </InputLabel>
                  <TextField
                    name='videoLink'
                    {...formik.getFieldProps('videoLink')}
                    autoComplete='false'
                    variant='filled'
                    margin='normal'
                    fullWidth
                    id='videoLink'
                    error={
                      formik.touched.videoLink && formik.errors.videoLink
                        ? true
                        : false
                    }
                  />
                  {formik.touched.videoLink && formik.errors.videoLink ? (
                    <Typography component={'span'} className={classes.error}>
                      {formik.errors.videoLink}
                    </Typography>
                  ) : null}
                </FormControl>
                {/*-----------------------------------------Pictures ---------------------------------------*/}
                <FormControl className={classes.formControl}>
                  <InputLabel style={{ fontSize: 15 }}>
                    صورة إضافية 1
                  </InputLabel>

                  <TextField
                    {...formik.getFieldProps('picture1')}
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

                  <TextField
                    {...formik.getFieldProps('picture2')}
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

                  <TextField
                    {...formik.getFieldProps('picture3')}
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

                  <TextField
                    {...formik.getFieldProps('picture4')}
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

                  <TextField
                    {...formik.getFieldProps('picture5')}
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
              </form>
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
    width: '100%',

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
