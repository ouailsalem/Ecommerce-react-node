import React from 'react'
import { Typography, Link, makeStyles } from '@material-ui/core'

export const Footer = () => {
  const classes = useStyles()

  return (
    <footer className={classes.footer}>
      <Typography variant='h6' align='center' gutterBottom>
        Footer
      </Typography>
      <Typography
        variant='subtitle1'
        align='center'
        color='textSecondary'
        component='p'
      >
        Something here to give the footer a purpose!
      </Typography>
      <Typography variant='body2' color='textSecondary' align='center'>
        'Copyright © '
        <Link color='inherit' href='https://material-ui.com/'>
          Your Website
        </Link>
        {new Date().getFullYear()}
      </Typography>
    </footer>
  )
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: '#222222',
    marginTop: '5%',
    padding: theme.spacing(6),
  },
}))
