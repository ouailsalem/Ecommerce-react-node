import React, { Fragment } from 'react'
import {
  Grid,
  makeStyles,
  Typography,
  Button,
  Divider,
  TextField,
} from '@material-ui/core'
import { useEffect } from 'react'
import { getProduct } from '../redux/actions/product'
import { useDispatch, useSelector } from 'react-redux'
import { addReview } from '../redux/actions/review'
import { getReviews } from '../redux/actions/review'
import { Loading } from '../Screens/Loading'
import ImageGallery from 'react-image-gallery'
import Rating from '@material-ui/lab/Rating'
import { Send } from '@material-ui/icons/'
import { Link, NavLink } from 'react-router-dom'
import { setAlert } from '../redux/actions/alert'
export const SingleProduct = ({ match }) => {
  const classes = useStyles()
  const [rating, setRating] = React.useState(4)
  const [review, setReview] = React.useState('')
  const dispatch = useDispatch()
  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(getProduct(match.params.productId))

    dispatch(getReviews(match.params.productId))
  }, [dispatch, match.params.productId])

  const onSubmit = (e) => {
    e.preventDefault()
    let productId = match.params.productId
    if (!review || review.trim() === '') {
      dispatch(setAlert('التعليق لايمكن أن يكون فارغًا', 'warning', true))
    } else if (review.length < 10) {
      dispatch(
        setAlert('يجب أن يحتوي التعليق على 10 حروف على الأقل', 'warning', true)
      )
    } else {
      dispatch(addReview({ rating, review, productId }))
      setReview('')
    }
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
        container
        spacing={3}
      >
        <Grid className={classes.root} item md={6} xs={12}>
          <Typography variant={'h5'} className={classes.text0}>
            {product.name}
          </Typography>
          <Typography variant={'body1'} className={classes.description}>
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
          <Typography className={classes.text0}>
            <Button
              component={Link}
              to={`/order/${match.params.productId}/none`}
              className={classes.button}
            >
              اطلب هذا المنتج
            </Button>
          </Typography>
        </Grid>
        <hr />

        <Grid className={classes.root} item xs={12}>
          {!isAuthenticated ? (
            <p>
              قم
              <NavLink
               
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
                <p>أضف تعليق</p>
                <TextField
                  disabled={state.loadingR}
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
                  <Rating
                    name='simple-controlled'
                    value={rating}
                    onChange={(event, newValue) => {
                      setRating(newValue)
                    }}
                  />
                </div>
                <div>
                  <Button
                    edge='start'
                    className={classes.buttonsmall}
                    aria-controls='simple-menu-cart'
                    aria-haspopup='true'
                    onClick={onSubmit}
                    disabled={state.loadingR}
                    size={'small'}
                  >
                    <Send />
                  </Button>
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
                  <Grid
                    direction={'column'}
                    className={classes.reviews}
                    container
                    key={review.id}
                  >
                    <Typography variant={'subtitle1'}>
                      {'★'.repeat(review.rating) +
                        '☆'.repeat(5 - review.rating)}{' '}
                      | {review.name}
                    </Typography>
                    <Typography variant={'subtitle1'}>
                      {review.review}
                    </Typography>
                    <br />
                    <Typography color={'textSecondary'} variant={'subtitle1'}>
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
    width: '100%',
    minWidth: '300px',
    maxWidth: '600px',
    alignItems: 'center',
    backgroundColor: '#FFCC33',
    textAlign: 'center',
    margin: '10px',
    borderRadius: 4,
  },
  description: {
    width: '100%',
    minWidth: '300px',
    maxWidth: '600px',
    margin: '10px',
  },

  commentbox: {
    width: '100%',
    minWidth: '300px',
    maxWidth: '600px',
    margin: '2px',
    padding: '1px',
    borderRadius: 4,
  },
})
