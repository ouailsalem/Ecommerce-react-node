import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { Link } from 'react-router-dom'

import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'

import {
  Home,
  InfoRounded,
  Storefront,
  Toc,
  Group,
  InsertComment,
  WebAsset,
} from '@material-ui/icons/'

const useStyles = makeStyles((theme) => ({
  drawerPaper: { width: 'inherit' },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
}))

export const AppDrawer = () => {
  const classes = useStyles()
  return (
    <Drawer
      style={{ width: '220px', direction: 'ltr' }}
      variant='persistent'
      anchor='left'
      open={true}
      classes={{ paper: classes.drawerPaper }}
    >
      <List>
        <Link to='/admin/' className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText
              style={{ textAlign: 'right' }}
              primary={'الرئيسيـة'}
            />
          </ListItem>
        </Link>
        <Link to='/admin/products' className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <Storefront />
            </ListItemIcon>
            <ListItemText style={{ textAlign: 'right' }} primary={'المنتجات'} />
          </ListItem>
        </Link>
        <Link to='/admin/orders' className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <Toc />
            </ListItemIcon>
            <ListItemText style={{ textAlign: 'right' }} primary={'الطلبات'} />
          </ListItem>
        </Link>
        <Link to='/admin/members' className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <Group />
            </ListItemIcon>
            <ListItemText style={{ textAlign: 'right' }} primary={'الأعضاء'} />
          </ListItem>
        </Link>
        <Link to='/admin/reviews' className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <InsertComment />
            </ListItemIcon>
            <ListItemText
              style={{ textAlign: 'right' }}
              primary={'التعليقات'}
            />
          </ListItem>
        </Link>
        <Link to='/' className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <WebAsset />
            </ListItemIcon>
            <ListItemText
              style={{ textAlign: 'right' }}
              primary={'معاينة الموقع'}
            />
          </ListItem>
        </Link>
      </List>
    </Drawer>
  )
}
