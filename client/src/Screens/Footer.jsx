import React from 'react'
import { Typography, Link, makeStyles, Grid } from '@material-ui/core'
import Facebook from '@material-ui/icons/Facebook'
import WhatsApp from '@material-ui/icons/WhatsApp'
import Call from '@material-ui/icons/Call'
import Email from '@material-ui/icons/Email'
export const Footer = () => {

  return (
    <footer>
      <section className='section-top'>
        <Grid container justify='center' spacing={5}>
          <Facebook style={{ marginLeft: '10px' }} />
          <WhatsApp style={{ marginLeft: '10px' }} />
          <Call style={{ marginLeft: '10px' }} />
          <Email style={{ marginLeft: '10px' }} />
        </Grid>
      </section>
      <section className='section-bottom'>
        <Typography>جميع الحقوق محفوظة</Typography>
      </section>
    </footer>
  )
}


