import React from 'react'
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  makeStyles,
  Grid,
  Paper,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useSelector } from 'redux'
import { useDispatch } from 'react-redux'
import { setAlert } from '../redux/actions/alert'
const useStyles = makeStyles({
  media: {
    width: 150,
    height: 150,
    backgroundSize: 'contain',
    backgroundPosition: 'flex-end',
  },

  button: {
    marginBottom: '5px',
    marginTop: '5px',
    fontSize: 15,
    backgroundColor: '#FFCC33',
    '&:hover': {
      color: '#FFCC33',
      backgroundColor: '#222222',
      boxShadow: 'none',
    },
  },
})

export const AffProduct = (props) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const referLink = `${window.location.origin}/order/${props.id}/${props.userName}`
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referLink)
    dispatch(setAlert('تم النسخ للحافظة','success',true))
  }

  return (
    <Grid item lg={3} md={4} sm={6} xs={12}>
      <Paper elevation={4}>
        <Card>
          <CardContent
            style={{
              display: 'flex',
              minWidth: '300px',
              alignContent: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div>
                <Typography variant='body1'>{props.name}</Typography>
                <Typography variant='body2' color='textSecondary' component='p'>
                  {props.price} دج
                </Typography>
              </div>
              <Button
                component={Link}
                to={`/products/${props.id}`}
                className={classes.button}
                size='small'
              >
                تصفح المنتج
              </Button>
              <Button
                className={classes.button}
                size='small'
                onClick={copyToClipboard}
              >
                انسخ رابط المشاركة
              </Button>
            </div>
            <CardMedia className={classes.media} image={props.imageUrl} />
          </CardContent>
        </Card>
      </Paper>
    </Grid>
  )
}
