import React, { Fragment } from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import { Product } from '../components/Product'
import { useState, useEffect } from 'react'
import { getProduct } from '../redux/actions/product'
import { useDispatch, useSelector } from 'react-redux'
import { setAlert } from '../redux/actions/alert'
import { Loading } from '../Screens/Loading'
import { mainFont } from '../customize/font'
import { Link } from 'react-router-dom'
const useStyles = makeStyles({
  root: {
    maxWidth: 250,
    height: 350,
    margin: 'auto',
  },
  media: {
    height: 250,
  },
  buttonContainer: {
    justifyContent: 'center',
  },
  button: {
    fontSize: 23,
    fontFamily: mainFont,
    width: '70%',
    alignItems: 'center',
    backgroundColor: '#FFCC33',
    '&:hover': {
      color: '#FFCC33',
      backgroundColor: '#222222',
      boxShadow: 'none',
    },
  },
  text: {
    fontFamily: mainFont,
    textAlign: 'center',
  },
  grid: {
    backgroundColor: 'red',
    width: '100%',
    height: '100%',
  },
  grid2: {
    backgroundColor: 'blue',
    width: '100%',
    height: '100%',
  },
  grid3: {
    backgroundColor: 'green',
    width: '100%',
    height: '100%',
  },
})

export const SingleProduct = ({ match }) => {
  const classes = useStyles()

  const dispatch = useDispatch()
  const { product, loading } = useSelector((state) => state.product)
  useEffect(() => {
    dispatch(getProduct(match.params.productId))
    console.log(product)
  }, [dispatch])

  return (
    <Grid container spacing={3}>
      <Grid className={classes.grid} item md={6} xs={12}>
        slider
      </Grid>
      <Grid className={classes.grid2} item md={6} xs={12}>
        infos
      </Grid>
      <Grid className={classes.grid3} item xs={12}>
        reviews && add review
      </Grid>
    </Grid>
  )
}
