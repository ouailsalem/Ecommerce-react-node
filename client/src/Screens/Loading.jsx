import React from 'react'
import { Grid, CircularProgress } from '@material-ui/core'

export const Loading = () => {
  return (
    <Grid
      position={'relative'}
      xs={12}
      container
      item
      justify='center'
      alignItems='center'
      style={{ minHeight: 750, height: '70vh' }}
    >
      <CircularProgress color='secondary' />
    </Grid>
  )
}
