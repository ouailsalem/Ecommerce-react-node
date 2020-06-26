import React from 'react'
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  makeStyles,
  Grid,
  Paper,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
const useStyles = makeStyles({
  media: {
    height: 250,
    backgroundSize: 'contain',
  },

  button: {
    margin: 'auto',
    fontSize: 23,
    width: '70%',
    alignItems: 'center',
    backgroundColor: '#FFCC33',
    '&:hover': {
      color: '#FFCC33',
      backgroundColor: '#222222',
      boxShadow: 'none',
    },
  },
})

export const Product = (props) => {
  const classes = useStyles()
  return (
    <Grid item md={4} sm={6} xs={12}>
      <Card
        elevation='8'
        style={{
          maxWidth: '400px',
          maxHeight: '400px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CardMedia className={classes.media} image={props.imageUrl} />
        <CardContent>
          <Typography style={{ textAlign: 'center' }} variant='h5'>
            {props.name}
          </Typography>
          <Typography
            style={{ textAlign: 'center' }}
            variant='h6'
            color='textSecondary'
            component='p'
          >
            {props.price} دج
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            className={classes.button}
            size='small'
            component={Link}
            to={`/products/${props.id}`}
          >
            معلومات أكثر
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}
