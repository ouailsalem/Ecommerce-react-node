import React, { Fragment, useState } from 'react'
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
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import CloseIcon from '@material-ui/icons/Close'
import ImageGallery from 'react-image-gallery'
import Rating from '@material-ui/lab/Rating'
import { Send } from '@material-ui/icons/'
import { Link, NavLink, Redirect } from 'react-router-dom'
import ReactPlayer from 'react-player'
import { setAlert } from '../redux/actions/alert'
export const SingleProduct = ({ match }) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [rating, setRating] = useState(4)
  const [review, setReview] = useState('')
  const [fullScreen, setFullScreen] = useState(false)
  const [fullScreenImage, setFullScreenImage] = useState("")
  const { notFound } = useSelector((state) => state.notFound)
  const state = useSelector((state) => state.reviews)

  const onSubmit = (e) => {
    e.preventDefault()
    let productId = match.params.productId
    if (!review || review.trim() === '') {
      dispatch(setAlert('التعليق لايمكن أن يكون فارغًا', 'warning', true))
    } else if (review.length < 10 || review.length > 500) {
      dispatch(
        setAlert('يجب أن يحتوي التعليق على 10 حروف على الأقل', 'warning', true)
      )
    } else {
      dispatch(addReview({ rating, review, productId }))
      setReview('')
    }
  }
  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(getProduct(match.params.productId))
    dispatch(getReviews(match.params.productId))
  }, [dispatch, match.params.productId])

  const { loading } = useSelector((state) => state.product)
  const { product } = useSelector((state) => state.product)
  const { pictures } = useSelector((state) => state.product)
  const { isAuthenticated } = useSelector((state) => state.auth)

  if (notFound) {
    return <Redirect to='/404' />
  }
  let rendered = loading ? (
    <Loading />
  ) : (
    <div className={classes.container}>
      <Grid container spacing={3}>
        <Grid className={classes.root} item lg={6} xs={12}>
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
          <div className={classes.videoContainer}>
            <ImageGallery
              lazyLoad={true}
              showPlayButton={false}
              showFullscreenButton={false}
              thumbnailPosition={'bottom'}
              items={pictures}
              onErrorImageURL={
                'https://www.wellesleysocietyofartists.org/wp-content/uploads/2015/11/image-not-found.jpg'
              }
              onClick={(e) => {
                setFullScreenImage(e.target.src)
                setFullScreen(true)
              }}
            />
          </div>
        </Grid>

        <Grid item className={classes.root2} lg={6} xs={12}>
          <div className={classes.videoContainer}>
            <ReactPlayer
              width='100%'
              url={product.videoLink}
            />
          </div>
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

        <Grid className={classes.root} item xs={12}>
          {!isAuthenticated ? (
            <p>
              قم
              <NavLink to='/register'> بالتسجيل </NavLink>
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
                    alignItems={'flex-start'}
                    container
                    key={review.id}
                  >
                    <Typography variant={'caption'}>
                      {'★'.repeat(review.rating) +
                        '☆'.repeat(5 - review.rating)}{' '}
                      | {review.name}
                    </Typography>
                    <Typography align='right' variant={'caption'}>
                      {review.review}
                    </Typography>

                    <Typography color={'textSecondary'} variant={'caption'}>
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
      <div>
        <Dialog
          open={fullScreen}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <CloseIcon
            onClick={() => {
              setFullScreen(false)
            }}
          />
          <DialogContent>
            <img src={fullScreenImage} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
  return rendered
}

const useStyles = makeStyles({
  root: {
    direction: 'rtl',
    padding: '0px !important',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  root2: {
    direction: 'rtl',
    padding: '0px !important',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  videoContainer: {
    width: '100%',
    minWidth: '300px',
    maxWidth: '600px',
    padding: 4,
    margin: 10,
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
    direction: 'rtl',
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
