import React, { useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
//Redux
import { useDispatch, useSelector } from 'react-redux'
//Redux Actions
import { getUser } from '../redux/actions/user'
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
import { updateUser } from '../redux/actions/adminUser'

export const AdminMembersUpdate = ({ match, props }) => {
  /*----------------------------------------- Redux -------------------------------------------*/
  const dispatch = useDispatch()
  const { posted, loadingUser } = useSelector((state) => state.adminUser)
  const { user, loading } = useSelector((state) => state.user)
  useEffect(() => {
    dispatch(getUser(match.params.userId))
  }, [dispatch, match.params.userId])
  /*----------------------------------------- use Formik -------------------------------------------*/

  /*--------------------- Initial Values ---------------------------*/
  const validationSchema = Yup.object({
    name: Yup.string()
      .required('هذا الحقل إجباري')
      .max(255, 'أدخل اسمًا مقبولا'),
    email: Yup.string().email('أدخل إيميل صحيح').required('هذا الحقل إجباري'),
    money: Yup.number().required('هذا الحقل إجباري'),
  })

  /*---------------------------------------------------------------*/

  /*----------------------------------------- Styling -------------------------------------------*/

  const classes = useStyles()

  /*----------------------------------------- React hooks -------------------------------------------*/
  const { notFound } = useSelector((state) => state.notFound)
  if (notFound) {
    return <Redirect to='/admin/members' />
  }
  if (posted) {
    return <Redirect to='/admin/members' />
  }

  const rendered =
    loadingUser || loading ? (
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
                تعديل بيانات العضو
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

            <Grid item xs={12}>
              <div className={classes.paper}>
                {/*-----------------------------------------Form Start ---------------------------------------*/}
                <Formik
                  validationSchema={validationSchema}
                  onSubmit={(values) => dispatch(updateUser(values))}
                  initialValues={{
                    userId: match.params.userId,
                    name: user.name,
                    email: user.email,
                    money: user.description,
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
                      <InputLabel style={{ fontSize: 15 }}>الاسم</InputLabel>
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
                    {/*-----------------------------------------email -------------------------------------------*/}

                    <FormControl className={classes.formControl}>
                      <InputLabel style={{ fontSize: 15 }}>
                        البريد الإلكتروني
                      </InputLabel>
                      <Field
                        component={TextField}
                        name='email'
                        variant='filled'
                        margin='normal'
                        fullWidth
                        id='email'
                        required
                      />
                      <ErrorMessage name='email' />
                    </FormControl>

                    {/*-----------------------------------------money ---------------------------------------*/}
                    <FormControl className={classes.formControl}>
                      <InputLabel style={{ fontSize: 15 }}>الأرباح</InputLabel>

                      <Field
                        component={TextField}
                        name='money'
                        autoComplete='false'
                        variant='filled'
                        margin='normal'
                        fullWidth
                        type='number'
                        id='money'
                        required
                      />
                      <ErrorMessage name='money' />
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
