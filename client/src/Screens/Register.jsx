import React, { useState, useEffect } from 'react'
import {
  IconButton,
  Avatar,
  Typography,
  Paper,
  Grid,
  Button,
  makeStyles,
  FormControl,
  InputLabel,
} from '@material-ui/core'
import { Link, Redirect } from 'react-router-dom'
import { SupervisedUserCircle, ArrowBack } from '@material-ui/icons/'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../redux/actions/auth'
import { Loading } from './Loading'
import { Form, Field, Formik, ErrorMessage } from 'formik'
import { TextField } from 'material-ui-formik-components/TextField'
import * as Yup from 'yup'

export const Register = ({ history }) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const dispatch = useDispatch()
  const classes = useStyles()

  const { isAuthenticated, loading } = useSelector((state) => state.auth)
  /*--------------------- Initial Values ---------------------------*/

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('هذا الحقل إجباري')
      .min(3, 'اسم المستخدم يجب أن يحتوي على 3 حروف على الأقل')
      .max(35, 'أدخل اسمًا مقبولا')
    email: Yup.string()
      .email('صيغة البريد الإلكتروني غير صحيحة')
      .required('هذا الحقل إجباري'),
    password: Yup.string()
      .min(6, 'الرجاء ادخال كلمة سر تحتوي على ستة حروف على الأقل')
      .required('هذا الحقل إجباري'),
  })

  if (isAuthenticated) {
    return <Redirect to='/profile' />
  }

  const rendered = loading ? (
    <Loading />
  ) : (
    <Grid container component='main' className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />

      <Grid
        container
        item
        justify='center'
        alignItems='center'
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
      >
        <Avatar className={classes.avatar}>
          <SupervisedUserCircle className={classes.icon} />
        </Avatar>
        <Typography component='h1' variant='h5'>
          التسجيل
        </Typography>
        <Formik
          validationSchema={validationSchema}
          onSubmit={(values) => dispatch(register(values))}
          initialValues={{
            name: '',
            email: '',
            money: '',
          }}
        >
          <Form className={classes.form}>
            {/*-----------------------------------------name ---------------------------------------*/}

            <FormControl className={classes.formControl}>
              <InputLabel
                style={{
                  fontSize: 15,
                }}
              >
                الاسم
              </InputLabel>
              <Field
                component={TextField}
                name='name'
                variant='filled'
                margin='normal'
                fullWidth
                id='name'
                required
              />
            </FormControl>
            {/*-----------------------------------------email -------------------------------------------*/}

            <FormControl className={classes.formControl}>
              <InputLabel
                style={{
                  fontSize: 15,
                }}
              >
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
            </FormControl>

            {/*-----------------------------------------money ---------------------------------------*/}
            <FormControl className={classes.formControl}>
              <InputLabel
                style={{
                  fontSize: 15,
                }}
              >
                كلمة المرور
              </InputLabel>

              <Field
                component={TextField}
                name='password'
                autoComplete='false'
                variant='filled'
                margin='normal'
                fullWidth
                id='password'
                required
              />
            </FormControl>

            {/*--------------------------------------- Submit Button -----------------------------------*/}
            <Button
              type='submit'
              variant='contained'
              size='large'
              className={classes.submit}
            >
              تسجيل
            </Button>
          </Form>
        </Formik>
      </Grid>
    </Grid>
  )
  return rendered
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '70vh',
  },
  image: {
    backgroundImage: 'url(./couple-bag.jpeg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
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
    width: '90%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center",
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
