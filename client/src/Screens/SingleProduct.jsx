import React from 'react'
import {
  Grid,
  makeStyles,
  Typography,
  Button,
  Divider,
  Paper,
  TextField,
  Box,
  IconButton,
} from '@material-ui/core'
import { useState, useEffect } from 'react'
import { getProduct } from '../redux/actions/product'
import { useDispatch, useSelector } from 'react-redux'
import { setAlert } from '../redux/actions/alert'
import { Loading } from '../Screens/Loading'
import { mainFont } from '../customize/font'
import { Link } from 'react-router-dom'
import ImageGallery from 'react-image-gallery'
import Rating from '@material-ui/lab/Rating'
import { Send } from '@material-ui/icons/'

export const SingleProduct = ({ match }) => {
  const classes = useStyles()
  const [value, setValue] = React.useState(2)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProduct(match.params.productId))
  }, [])

  const { loading } = useSelector((state) => state.product)
  const { product } = useSelector((state) => state.product)
  const { pictures } = useSelector((state) => state.product)

  let rendered = loading ? (
    <Loading />
  ) : (
    <div className={classes.container}>
      <Grid
        className={{ justifyContent: 'center', margin: 50 }}
        container
        spacing={3}
      >
        <Grid className={classes.root} item md={6} xs={12}>
          <Typography variant={'h5'} className={classes.text0}>
            {product.name}
          </Typography>
          <Typography variant={'p'} className={classes.text2}>
            {product.description}
          </Typography>
          <Divider />
          <Typography variant={'button'} className={classes.text0}>
            السعـــر : {product.price} دج
          </Typography>
        </Grid>
        <Grid item className={classes.root} md={6} xs={12}>
          <ImageGallery
            flickThreshold={true}
            lazyLoad={true}
            showPlayButton={false}
            thumbnailPosition={'bottom'}
            items={pictures}
          />
          <Typography className={classes.text}>
            <Button className={classes.button}>اطلب هذا المنتج</Button>
          </Typography>
        </Grid>
        <hr />

        <Grid className={classes.root} item xs={12}>
          <div className={classes.commentbox}>
            <p className={classes.text4}>أضف تعليق</p>
            <TextField
              multiline={true}
              variant='outlined'
              margin='normal'
              fullWidth
              id='email'
              name='email'
              autoComplete='email'
              autoFocus
            />
          </div>
          <div
            component='div'
            mb={3}
            borderColor='transparent'
            className={classes.row}
          >
            <div>
              <Button
                edge='start'
                className={classes.buttonsmall}
                aria-controls='simple-menu-cart'
                aria-haspopup='true'
                onClick={() => {
                  console.log('clicked')
                }}
              >
                <Send />
              </Button>
            </div>
            <div>
              <Rating
                name='simple-controlled'
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue)
                }}
              />
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  )
  return rendered
}

const useStyles = makeStyles({
  root: {
    padding: '0px !important',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  row: {
    padding: '0px !important',
    maxWidth: 600,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    padding: '5%',
    paddingTop: '1%',
    minHeight: '80vh',
    margin: '10px',
  },

  button: {
    fontSize: 23,
    fontFamily: mainFont,
    width: '100%',
    minWidth: '300px',
    maxWidth: '600px',
    alignItems: 'center',
    backgroundColor: '#FFCC33',
    '&:hover': {
      color: '#FFCC33',
      backgroundColor: '#222222',
      boxShadow: 'none',
    },
  },
  buttonsmall: {
    fontSize: 18,
    fontFamily: mainFont,
    width: 100,
    backgroundColor: '#FFCC33',
    transform: 'rotateY(180deg)',
    '&:hover': {
      color: '#FFCC33',
      backgroundColor: '#222222',
      boxShadow: 'none',
    },
  },
  text0: {
    marginTop: 12,
    fontFamily: mainFont,
    width: '100%',
    minWidth: '300px',
    maxWidth: '600px',
    alignItems: 'center',
    backgroundColor: '#FFCC33',
    textAlign: 'center',
    margin: '10px',
    borderRadius: 4,
  },
  text: {
    fontFamily: mainFont,
    textAlign: 'center',
    padding: '20px',
  },
  text4: {
    fontFamily: mainFont,
    textAlign: 'center',
    margin: 0,
    padding: 0,
  },
  text2: {
    fontFamily: mainFont,
    direction: 'rtl',
    padding: '20px',
    maxWidth: '600px',
  },

  commentbox: {
    fontFamily: mainFont,
    width: '100%',
    minWidth: '300px',
    maxWidth: '600px',
    margin: '10px',
    borderRadius: 4,
  },
})
