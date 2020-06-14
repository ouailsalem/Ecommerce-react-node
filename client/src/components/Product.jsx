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
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: 'auto',
  },
  media: {
    height: 350,
  },
  button: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
})

export const Product = () => {
  const classes = useStyles()
  return (
    <Grid item lg={3} md={4} sm={6} xs={12}>
      <Paper>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image='https://cdn.pocket-lint.com/r/s/970x/assets/images/149387-smartwatches-review-fossil-gen-5-smartwatch-review-image12-7npt61zeui-jpg.webp'
              title='Contemplative Reptile'
            />
            <CardContent>
              <Typography dir='rtl' gutterBottom variant='h5' component='h2'>
                ساعـة إيطاليـة
              </Typography>
              <Typography
                dir='rtl'
                variant='body2'
                color='textSecondary'
                component='p'
              >
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button className={classes.button} size='small' color='primary'>
              Learn More
            </Button>
          </CardActions>
        </Card>
      </Paper>
    </Grid>
  )
}
