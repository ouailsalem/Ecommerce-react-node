import React from 'react'
import Grid from '@material-ui/core/Grid'
import { Typography, IconButton, makeStyles } from '@material-ui/core'

import {
  ArrowDownward,
  LocalShipping,
  Loyalty,
  AttachMoney,
} from '@material-ui/icons/'
import { mainFont } from '../customize/font'

const useStyles = makeStyles((theme) => ({
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 5),
  },
  image: {
    height: 200,
  },
  title: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },

  icon: {
    fontSize: 250,
    '&:hover': {
      color: '#FFCC33',
      boxShadow: 'none',
    },
  },

  text: {
    fontFamily: mainFont,
  },
  mainText: {
    color: '#FFCC33',
    fontFamily: mainFont,
    borderRadius: 50,
    backgroundColor: '#222222',
    fontSize: 40,
    padding: 10,
  },
}))

export const Explaining = () => {
  const classes = useStyles()

  return (
    <Grid className={classes.root} container spacing={3}>
      <Grid
        position={'relative'}
        xs={12}
        container
        item
        direction='column'
        justify='center'
        alignItems='center'
      >
        <Typography className={classes.mainText}>لماذا تختارنا</Typography>
        <IconButton aria-label='delete' size='large'>
          <ArrowDownward fontSize='inherit' />
        </IconButton>
      </Grid>
      <Grid
        xs={12}
        container
        item
        direction='row'
        justify='center'
        alignItems='center'
      >
        <div className={classes.item}>
          <LocalShipping className={classes.icon} />

          <Typography align='center' className={classes.text} variant='h5'>
            توصيل آمن و سريع لباب منزلك
          </Typography>
        </div>
        <div className={classes.item}>
          <Loyalty className={classes.icon} />

          <Typography align='center' className={classes.text} variant='h5'>
            منتوجات عاليـة الجودة
          </Typography>
        </div>
        <div className={classes.item}>
          <AttachMoney className={classes.icon} />
          <Typography align='center' className={classes.text} variant='h5'>
            الدفع عند الإستلام
          </Typography>
        </div>
      </Grid>
    </Grid>
  )
}
