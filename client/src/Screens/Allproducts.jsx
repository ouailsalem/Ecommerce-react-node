import React from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import { Product } from '../components/Product'
import { useState, useEffect } from 'react'
import { getProducts } from '../redux/actions/products'
import { useDispatch, useSelector } from 'react-redux'
import { setAlert } from '../redux/actions/alert'
import { Loading } from '../Screens/Loading'

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
      flexGrow: 1,
      paddingLeft: windowDimensions.width < 700 ? ' 2%' : '10%',
      paddingRight: windowDimensions.width < 700 ? ' 2%' : '10%',
      marginTop: '5%',
      justifyContent: 'center',
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
    dispatch(getProducts())
    console.log(products)
  }, [])
  const rendered = loading ? (
    <Loading />
  ) : (
    <div className={classes.root}>
      <Grid className={classes.container} container spacing={3}>
        {products.map((product) => (
          <Product
            key={product.id}
            name={product.name}
            imageUrl={product.pictures}
            available={product.available}
            description={product.description}
            price={product.price}
          />
        ))}
      </Grid>
    </div>
  )
  return rendered
}
/*
  <Grid xs={6} sm={3} container spacing={3} classes={classes.cardGrid}>
     <Product />
     <Product />
      <Product />
  </Grid> */
