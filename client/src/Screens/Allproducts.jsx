import React from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import { Product } from '../components/Product'
import { useState, useEffect } from 'react'

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
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }))

  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Product />
        <Product />
        <Product />
        <Product />
      </Grid>
    </div>
  )
}
/*
  <Grid xs={6} sm={3} container spacing={3} classes={classes.cardGrid}>
     <Product />
     <Product />
      <Product />
  </Grid> */
