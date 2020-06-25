import React, { Fragment } from 'react'
import { Grid, makeStyles, Container } from '@material-ui/core'
import { useState, useEffect } from 'react'
import { getProducts } from '../redux/actions/products'
import { useDispatch, useSelector } from 'react-redux'
import { Loading } from '../Screens/Loading'
import { resetOrder } from '../redux/actions/order'
import { AffProduct } from '../components/AffProduct'

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height,
  }
}

export const Affiliate = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  )

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const useStyles = makeStyles((theme) => ({
    root: {
      paddingLeft: '2%',
      paddingRight: '2%',
      marginTop: '5%',
      justifyContent: 'center',
      paddingBottom: 60,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    container: {
      justifyContent: 'center',
    },
  }))

  const classes = useStyles()
  const dispatch = useDispatch()
  const { products, loading } = useSelector((state) => state.products)
  const auth = useSelector((state) => state.auth)
  useEffect(() => {
    dispatch(resetOrder())
    window.scrollTo(0, 0)
    dispatch(getProducts())
  }, [dispatch])
  const rendered =
    loading || auth.loading ? (
      <Loading />
    ) : (
      <Container maxWidth="lg">
        <div className={classes.root}>
          <Grid className={classes.container} container spacing={3}>
            {products.map((product) => (
              <Fragment>
                <AffProduct
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  imageUrl={product.mainPicture}
                  available={product.available}
                  smallDescription={product.smallDescription}
                  price={product.price}
                  userName={auth.user.name}
                />
              </Fragment>
            ))}
          </Grid>
        </div>
      </Container>
    )
  return rendered
}
