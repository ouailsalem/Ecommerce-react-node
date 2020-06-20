import React, { useRef, Fragment } from 'react'
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
import { useEffect } from 'react'
import { getProduct } from '../redux/actions/product'
import { useDispatch, useSelector } from 'react-redux'
import { setAlert } from '../redux/actions/alert'
import { addReview } from '../redux/actions/review'
import { getReviews } from '../redux/actions/review'
import { Loading } from '../Screens/Loading'
import { mainFont } from '../customize/font'
import ImageGallery from 'react-image-gallery'
import Rating from '@material-ui/lab/Rating'
import { Send } from '@material-ui/icons/'
import { Link, NavLink } from 'react-router-dom'
export const SingleProduct = ({ match }) => {
  const classes = useStyles()
  const [rating, setRating] = React.useState(4)
  const [review, setReview] = React.useState('')
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProduct(match.params.productId))

    dispatch(getReviews(match.params.productId))
  }, [])

  const onSubmit = (e) => {
    e.preventDefault()
    let productId = match.params.productId
    dispatch(addReview({ rating, review, productId }))
    setReview('')
  }
  const { loading } = useSelector((state) => state.product)
  const { product } = useSelector((state) => state.product)
  const { pictures } = useSelector((state) => state.product)
  const { isAuthenticated } = useSelector((state) => state.auth)

  const state = useSelector((state) => state.reviews)
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
            lazyLoad={true}
            showPlayButton={false}
            thumbnailPosition={'bottom'}
            items={pictures}
            showFullscreenButton={false}
            useBrowserFullscreen={false}
          />
          <Typography className={classes.text}>
            <Button className={classes.button}>اطلب هذا المنتج</Button>
          </Typography>
        </Grid>
        <hr />

        <Grid className={classes.root} item xs={12}>
          {!isAuthenticated ? (
            <p className={classes.text4}>
              قم
              <NavLink
                activeStyle={'none'}
                className={classes.text4}
                to='/register'
              >
                {' '}
                بالتسجيل{' '}
              </NavLink>
              لإضافة تعليق
            </p>
          ) : (
            <Fragment>
              <div className={classes.commentbox}>
                <p className={classes.text4}>أضف تعليق</p>
                <TextField
                  multiline={true}
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  id='review'
                  name='review'
                  autoComplete='email'
                  value={review}
                  onChange={(e) => {
                    setReview(e.target.value)
                  }}
                  autoFocus
                  dir='rtl'
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
                    onClick={onSubmit}
                  >
                    <Send />
                  </Button>
                </div>
                <div>
                  <Rating
                    name='simple-controlled'
                    value={rating}
                    onChange={(event, newValue) => {
                      setRating(newValue)
                    }}
                  />
                </div>
              </div>
            </Fragment>
          )}

          {state.loadingR ? (
            <Loading height={'100px'} minHeight={'100px'} />
          ) : (
            <Fragment>
              {state.reviews.map((review) => {
                return (
                  <Grid className={classes.reviews} item xs={12}>
                    <Typography className={classes.text3}>
                      {'★'.repeat(review.rating) +
                        '☆'.repeat(5 - review.rating)}{' '}
                      | {review.name}
                    </Typography>
                    <Typography className={classes.text3}>
                      {review.review}
                    </Typography>
                    <Typography variant={'overline'}>
                      {review.time.slice(0, 10) +
                        '|' +
                        review.time.slice(11, 16)}
                    </Typography>
                  </Grid>
                )
              })}
            </Fragment>
          )}
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
    justifyContent: 'center',
  },
  reviews: {
    width: '100%',
    minWidth: '300px',
    maxWidth: '600px',
    margin: '10px',
    border: 1,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#AAAAAA',
    borderRadius: 4,
    padding: 4,
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
    textDecoration: 'none',
    color: '#777777',
  },
  text2: {
    fontFamily: mainFont,
    direction: 'rtl',
    padding: '20px',
    maxWidth: '600px',
  },
  text3: {
    fontFamily: mainFont,
    direction: 'rtl',
    maxWidth: '600px',
  },
  commentbox: {
    fontFamily: mainFont,
    width: '100%',
    minWidth: '300px',
    maxWidth: '600px',
    margin: '2px',
    padding: '1px',
    borderRadius: 4,
  },
})
