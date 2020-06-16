import React from 'react'
import {
  makeStyles,
  Grid,
  Button,
  Typography,
  IconButton,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import { mainFont } from '../customize/font'
import { ShoppingCart, ArrowDownward } from '@material-ui/icons/'

export const Header = () => {
  const classes = useStyles()

  return (
    <Grid container spacing={3} style={{ minHeight: 700, height: '70vh' }}>
      <Grid
        md={6}
        xs={12}
        container
        item
        direction='column'
        justify='center'
        alignItems='center'
      >
        <img src='/bug.png' className={classes.curvyLines} alt='curvy lines' />
        {/* <Storefront className={classes.icon} /> */}
      </Grid>
      <Grid
        md={6}
        xs={12}
        container
        item
        direction='column'
        justify='center'
        alignItems='center'
      >
        <Typography className={classes.text} variant='h2' gutterBottom>
          متجري
        </Typography>
        <Typography
          className={classes.text}
          variant='h5'
          align='center'
          paragraph
        >
          منتجات عاليـة الجودة مع توصيل لـ48 ولايـة
        </Typography>

        <Button
          component={Link}
          to='/products'
          variant='contained'
          size='large'
          className={classes.heroButtons}
          startIcon={<ShoppingCart />}
        >
          تسوق الآن
        </Button>

        <Typography
          className={classes.text}
          variant='h6'
          color='textSecondary'
          paragraph
        >
          معلومات أكثـر
        </Typography>
        <IconButton aria-label='delete' component={Link} to='/features'>
          <ArrowDownward fontSize='inherit' />
        </IconButton>
      </Grid>
    </Grid>
  )
}

//styling
const useStyles = makeStyles((theme) => ({
  icon: {
    fontSize: 250,

    '&:hover': {
      color: '#FFCC33',
    },
  },

  heroButtons: {
    fontSize: 23,
    fontFamily: mainFont,
    width: '70%',
    backgroundColor: '#FFCC33',
    '&:hover': {
      color: '#FFCC33',
      backgroundColor: '#222222',
      boxShadow: 'none',
    },
  },
  text: {
    fontFamily: mainFont,
  },
  curvyLines: {
    height: 300,
  },
  noLink: {
    textDecoration: 'none',
  },
}))
