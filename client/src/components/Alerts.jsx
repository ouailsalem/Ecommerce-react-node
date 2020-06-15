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

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  msg: {
    fontFamily: mainFont,
  },
}))

export function Alerts() {
  const classes = useStyles()
  const alerts = useSelector((state) => state.alert)

  const renderedAlerts =
    alerts !== null && alerts.length > 0 ? (
      alerts.map((alert) => {
        return (
          <div key={alert.id} className={classes.root}>
            <Snackbar open={alert.open} autoHideDuration={6000}>
              <Alert severity={alert.alertType}>
                <Typography className={classes.msg}>{alert.msg}</Typography>
              </Alert>
            </Snackbar>
          </div>
        )
      })
    ) : (
      <Snackbar open={false} autoHideDuration={6000}>
        <Alert severity={'success'}>
          <Typography className={classes.msg}>{'no alert'}</Typography>
        </Alert>
      </Snackbar>
    )
  return renderedAlerts
}
