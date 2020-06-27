import React, { useEffect} from 'react'
import {
  makeStyles,
  Grid,
  Button,
  Typography,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import { ShoppingCart} from '@material-ui/icons/'

export const Header = () => {
  const classes = useStyles()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
      <Grid
        container
        className={classes.hero}
        xs={12}
        item
        direction='column'
        justify='center'
        alignItems='center'
      >
        <Typography
          style={{
            color: 'white',
            zIndex: '2',
          }}
          variant='h2'
          gutterBottom
        >
          متجري
        </Typography>
        <Typography
          variant='h5'
          align='center'
          paragraph
          style={{
            color: 'white',
            zIndex: '2',
          }}
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
        <Button
          component={Link}
          color='primary'
          to='/affiliate'
          variant='contained'
          size='small'
          style={{
            zIndex: '2',
          }}
        >
          تسويق المنتجات
        </Button>
        <div className={classes.overlay}></div>
      </Grid>
  )
}

//styling
const useStyles = makeStyles((theme) => ({
  hero: {
    background: 'url(/hero.jpg) no-repeat 50% 50%',
    backgroundBlendMode: 'lighten',
    width: '100%',
    height: '100%',
    margin: 'auto',
    backgroundSize: 'cover',
    minHeight: '95vh',
    position: 'relative',
  },
  overlay: {
    background: 'black',
    backgroundBlendMode: 'lighten',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
    opacity: '70%',
    margin: 'auto',
    backgroundSize: 'cover',
    minHeight: '95vh',
    position: 'absolute',
    pointerEvents: 'none',
    zIndex: '1',
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
