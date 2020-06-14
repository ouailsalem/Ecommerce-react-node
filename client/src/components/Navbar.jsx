import React from 'react'
import { useScrollTrigger, Fab, Zoom } from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import { RealNavBar } from './RealNavBar'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 5,
  },
}))
const scrollToRef = () => window.scrollTo(0, 0)

export function Navbar(props) {
  function ScrollTop(props) {
    const { children, window } = props
    const classes = useStyles()

    const trigger = useScrollTrigger({
      target: window ? window() : undefined,
      disableHysteresis: true,
      threshold: 100,
    })

    const handleClick = () => {
      scrollToRef()
    }

    return (
      <Zoom in={trigger}>
        <div onClick={handleClick} role='presentation' className={classes.root}>
          {children}
        </div>
      </Zoom>
    )
  }
  return (
    <React.Fragment>
      <RealNavBar />
      <ScrollTop {...props}>
        <Fab color='secondary' size='small' aria-label='scroll back to top'>
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  )
}
