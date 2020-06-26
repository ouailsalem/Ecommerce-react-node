import React, { useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
//Redux
import { useDispatch, useSelector } from 'react-redux'

// Material UI components
import {
  IconButton,
  Typography,
  Paper,
  Grid,
  Button,
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
import { Form, Field, Formik, ErrorMessage } from 'formik'
import { TextField } from 'material-ui-formik-components/TextField'

import * as Yup from 'yup'
import { getProfile, updateProfile } from '../redux/actions/profile'

export const ProfileUpdate = () => {
  /*----------------------------------------- Redux -------------------------------------------*/

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProfile())
  }, [dispatch])

  const { profile, posted, loadingProfile } = useSelector(
    (state) => state.profile
  )

  /*--------------------- Validation Schema ---------------------------*/
  const validationSchema = Yup.object({
    phoneNumber: Yup.string(),
    address: Yup.string(),
    wilaya: Yup.number()
      .min(1, 'أدخل رقم ولاية صحيح بين 1 و 48')
      .max(48, 'أدخل رقم ولاية صحيح بين 1 و 48'),
  })

  /*----------------------------------------- Styling -------------------------------------------*/

  const classes = useStyles()

  /*----------------------------------------- React hooks -------------------------------------------*/

  if (posted) {
    return <Redirect to='/profile' />
  }

  const rendered = loadingProfile ? (
    <Loading />
  ) : (
    <Container maxWidth='lg'>
      <Grid container style={{ minHeight: '80vh' }}>
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
              تعديل المنتج
            </Typography>
          </Grid>
          <Grid item container justify={'flex-end'} md={6} xs={12}>
            <Link to='/profile' variant='body2' style={{ marginLeft: 30 }}>
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
                  dispatch(updateProfile(values))
                }}
                initialValues={{
                  phoneNumber: profile.phoneNumber,
                  wilaya: profile.wilaya,
                  dayra: profile.dayra,
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

                  {/*----------------------------------------- wilaya ---------------------------------------*/}

                  <FormControl className={classes.formControl}>
                    <InputLabel style={{ fontSize: 15 }}>
                      رقم الولاية
                    </InputLabel>
                    <Field
                      component={TextField}
                      name='wilaya'
                      variant='filled'
                      margin='normal'
                      fullWidth
                      id='wilaya'
                      required
                      type='number'
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
