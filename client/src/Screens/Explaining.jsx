import React from 'react'
import Grid from '@material-ui/core/Grid'
import { Typography, makeStyles, InputLabel, TextField, FormControl, Button} from '@material-ui/core'

// Formik
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
  ArrowDownward,
  LocalShipping,
  Loyalty,
  AttachMoney,
} from '@material-ui/icons/'


const useStyles = makeStyles((theme) => ({
  icon: {
    [theme.breakpoints.down('xs')]: {
      fontSize: 150,
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: 170,
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: 200,
    },
    '&:hover': {
      color: '#FFCC33',
      boxShadow: 'none',
    },
  },
  root: {
    height: '100vh',
  },
  card: {
    maxWidth: 345,
  },

  form: {
    width: '90%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  formControl: {
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
    fontSize: 20,
    textAlign: 'left',
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#FFCC33',
    '&:hover': {
      color: '#FFCC33',
      backgroundColor: '#222222',
      boxShadow: 'none',
    },
  },

  error: {
    fontSize: 13,
    color: 'red',
    textAlign: 'left',
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

export const Explaining = () => {
  const classes = useStyles()
  /*--------------------- Initial Values ---------------------------*/

  const initialValues = {
    quantity: 1,
    name: '',
    phoneNumber: '',
    wilaya: 0,
    dayra: '',
    address: '',
  }
  /*--------------------- Submit Action- ---------------------------*/
  const onSubmit = () => {
   
  
  }
  /*--------------------- Initial Values ---------------------------*/
  const validationSchema = Yup.object({
    name: Yup.string()
      .required('هذا الحقل إجباري')
      .max(255, 'أدخل اسمًا مقبولا'),
    email: Yup.string()
      .required('هذا الحقل إجباري')
      .max(255, 'ادخل بريد إلكتروني صحيح'),
    question: Yup.string()
      .required('هذا الحقل إجباري')
      .min(20, 'الاستفسار يجب أن يحتوي على 20 حرف على الأقل')
      .max(255, 'ادخل عنوانا مقبولا'),
  })

  /*---------------------------------------------------------------*/
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  })
  /*-------------------------------- Redux-------------------------*/
  return (
    <Grid container spacing={2} >
      <Grid
        container
        item
        direction='column'
        alignItems='center'
        justify='center'
        xs={12}
      >
        <Typography variant='h6'>مميزات خدمتنا</Typography>
        <ArrowDownward />
      </Grid>
      <Grid container item>
        <Grid
          xs={12}
          sm={4}
          lg={4}
          item
          container
          direction='column'
          alignItems='center'
          justify='center'
        >
          <LocalShipping className={classes.icon} />
          <Typography align='center' variant='body1'>
            توصيل آمن و سريع لباب منزلك
          </Typography>
        </Grid>
        <Grid
          xs={12}
          sm={4}
          lg={4}
          item
          container
          direction='column'
          alignItems='center'
          justify='center'
        >
          <Loyalty className={classes.icon} />
          <Typography variant='body1'>منتوجات عاليـة الجودة</Typography>
        </Grid>
        <Grid
          xs={12}
          sm={4}
          lg={4}
          item
          container
          direction='column'
          alignItems='center'
          justify='center'
        >
          <AttachMoney className={classes.icon} />
          <Typography variant='body1'>الدفع عند الإستلام</Typography>
        </Grid>
      </Grid>
      <hr style={{  width: '50%' }} />

      <Grid
        container
        item
        direction='column'
        alignItems='center'
        justify='center'
        xs={12}
      >
        <Typography variant='h6'>لديك إستفسار؟</Typography>
        <ArrowDownward />

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
            <InputLabel>الاسم و اللقب</InputLabel>
            <TextField
              name='name'
              {...formik.getFieldProps('name')}
              variant='filled'
              margin='normal'
              fullWidth
              type='name'
              id='name'
              required
              error={formik.touched.name && formik.errors.name ? true : false}
            />
            {formik.touched.name && formik.errors.name ? (
              <Typography component={'span'} className={classes.error}>
                {formik.errors.name}
              </Typography>
            ) : null}
          </FormControl>
          {/*-----------------------------------------name -------------------------------------------*/}
          <FormControl className={classes.formControl}>
            <InputLabel>البريد الإلكتروني</InputLabel>
            <TextField
              name='email'
              {...formik.getFieldProps('email')}
              variant='filled'
              margin='normal'
              fullWidth
              type='email'
              id='email'
              required
              error={formik.touched.email && formik.errors.email ? true : false}
            />
            {formik.touched.email && formik.errors.email ? (
              <Typography component={'span'} className={classes.error}>
                {formik.errors.email}
              </Typography>
            ) : null}
          </FormControl>
          {/*-----------------------------------------phoneNumber ---------------------------------------*/}

          <FormControl className={classes.formControl}>
            <InputLabel>الإستفسـار</InputLabel>
            <TextField
              name='question'
              {...formik.getFieldProps('question')}
              variant='filled'
              margin='normal'
              fullWidth
              id='question'
              required
              error={
                formik.touched.question && formik.errors.question ? true : false
              }
            />
            {formik.touched.question && formik.errors.question ? (
              <Typography component={'span'} className={classes.error}>
                {formik.errors.question}
              </Typography>
            ) : null}
          </FormControl>
          {/*--------------------------------------- Submit Button -----------------------------------*/}
          <Button
            type='submit'
            variant='contained'
            size='small'
            className={classes.submit}
          >
            أرسل
          </Button>
        </form>
      </Grid>
    </Grid>
  )
}
