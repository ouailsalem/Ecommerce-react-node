import React from 'react'
import { Grid, CircularProgress } from '@material-ui/core'

export const Loading = ({ minHeight, height }) => {
  return (
    <Grid
      position={'relative'}
      xs={12}
      container
      item
      justify='center'
      alignItems='center'
      style={{ minHeight: minHeight || 750, height: height || '70vh' }}
    >
      <CircularProgress color='secondary' />
    </Grid>
  )
}
