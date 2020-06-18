import React from 'react'
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  makeStyles,
  CardActionArea,
  Grid,
  Paper,
} from '@material-ui/core'
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
})

export const Product = (props) => {
  const classes = useStyles()
  return (
    <Grid item lg={3} md={4} sm={6} xs={12}>
      <Paper elevation={5}>
        <Card>
          <CardActionArea className={classes.root}>
            <CardMedia
              className={classes.media}
              image={props.imageUrl}
              title='Contemplative Reptile'
            />
            <CardContent>
              <Typography
                dir='rtl'
                gutterBottom
                component='h4'
                className={classes.text}
              >
                {props.name}
              </Typography>
              <Typography
                dir='rtl'
                variant='body2'
                component='p'
                className={classes.text}
              >
                {props.description}
              </Typography>
              <Typography
                dir='rtl'
                variant='body2'
                color='textSecondary'
                component='p'
                className={classes.text}
              >
                {props.price} دج
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions className={classes.buttonContainer}>
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
      </Paper>
    </Grid>
  )
}
