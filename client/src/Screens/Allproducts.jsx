import React, { Fragment } from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import { Product } from '../components/Product'
import { useState, useEffect } from 'react'
import { getProducts } from '../redux/actions/products'
import { useDispatch, useSelector } from 'react-redux'
import { Loading } from '../Screens/Loading'
import { resetOrder } from '../redux/actions/order'

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height,
  }
}

export const Allproducts = () => {
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
      paddingLeft:'2%', 
      paddingRight:'2%',
      marginTop: '5%',
      justifyContent: 'center',
      paddingBottom:60,
      minHeight:"80vh"

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
  useEffect(() => {
    dispatch(resetOrder())
    window.scrollTo(0, 0)
    dispatch(getProducts())
  }, [dispatch])
  const rendered = loading ? (
    <Loading />
  ) : (
    <div className={classes.root}>
      <Grid className={classes.container} container spacing={3}>
        {products.map((product) => (
            <Product
              key={product.id}
              id={product.id}
              name={product.name}
              imageUrl={product.mainPicture}
              available={product.available}
              smallDescription={product.smallDescription}
              price={product.price}
            />
            
          
        ))}
      </Grid>
    </div>
  )
  return rendered
}
