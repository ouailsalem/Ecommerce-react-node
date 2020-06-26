import React, { Fragment } from 'react'
import { Grid, makeStyles, Container } from '@material-ui/core'
import { Product } from '../components/Product'
import { useEffect } from 'react'
import { getProducts } from '../redux/actions/products'
import { useDispatch, useSelector } from 'react-redux'
import { Loading } from '../Screens/Loading'
import { resetOrder } from '../redux/actions/order'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: '2%',
    paddingRight: '2%',
    marginTop: '5%',
    justifyContent: 'center',
    paddingBottom: 60,
    minHeight: '80vh',
    alignItems: 'center',
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

export const Allproducts = () => {
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
    <Container maxWidth='lg'>
      <Grid
        container
        spacing={'3'}
        xs={'12'}
        justify={'center'}
        alignItems={'center'}
        style={{ marginTop: '3%', marginBottom: '3%' }}
      >
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
    </Container>
  )
  return rendered
}
