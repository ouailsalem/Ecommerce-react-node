import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles'
import { mainFont } from '../customize/font'
import { Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}

export function Alerts() {
  const alerts = useSelector((state) => state.alert)

  const renderedAlerts =
    alerts !== null && alerts.length > 0 ? (
      alerts.map((alert) => {
        return (
          <div key={alert.id}>
            <Snackbar open={alert.open} autoHideDuration={5000}>
              <Alert severity={alert.alertType}>
                <Typography>{alert.msg}</Typography>
              </Alert>
            </Snackbar>
          </div>
        )
      })
    ) : (
      <Snackbar open={false} autoHideDuration={5000}>
        <Alert severity={'success'}>
          <Typography>{'no alert'}</Typography>
        </Alert>
      </Snackbar>
    )
  return renderedAlerts
}
