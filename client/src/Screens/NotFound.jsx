import React, { useEffect, Fragment } from 'react'
import { makeStyles, Grid, Button, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

import { notFoundReset } from '../redux/actions/notFound'
import { useDispatch } from 'react-redux'

export const NotFound = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(notFoundReset())
  }, [dispatch])
  return (
    <Fragment>
      <Grid
        container
        className={classes.hero}
        xs={12}
        item
        direction='column'
        justify='center'
        alignItems='center'
      >
        <Typography variant='h2' gutterBottom>
          4 0 4
        </Typography>
        <Typography variant='h5' align='center' paragraph>
          الصفحة غير موجودة
        </Typography>

        <Button
          component={Link}
          color='primary'
          to='/'
          variant='contained'
          size='small'
        >
          الرجوع للصفحة الرئيسيـة
        </Button>
      </Grid>
    </Fragment>
  )
}

//styling
const useStyles = makeStyles((theme) => ({
  hero: {
    width: '100%',
    height: '100%',
    margin: 'auto',
    backgroundSize: 'cover',
    minHeight: '95vh',
    position: 'relative',
  },

  icon: {
    fontSize: 250,

    '&:hover': {
      color: '#FFCC33',
    },
  },

  heroButtons: {
    fontSize: 23,
    width: '70%',
    backgroundColor: '#FFCC33',
    '&:hover': {
      color: '#FFCC33',
      backgroundColor: '#222222',
      boxShadow: 'none',
    },
    marginBottom: '10px',
    zIndex: '2',
  },
}))
