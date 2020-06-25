import React, { Fragment } from 'react'
import { Grid } from '@material-ui/core'
import { Header } from './Header'
import { Explaining } from './Explaining'

export const Landing = () => {
  return (
    <Fragment>
      <Header />
      <Explaining />
    </Fragment>
  )
}
