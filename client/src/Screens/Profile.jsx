import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import {
  SupervisedUserCircle,
  CalendarToday,
  Money,
  Email,
  LocationCity,
  MyLocation,
} from '@material-ui/icons/'

import { useEffect } from 'react'
import { getProfile } from '../redux/actions/profile'
import { Loading } from './Loading'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '10px',
    display: 'flex',
    minHeight: '75vh',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
  },
  text1: {
    textAlign: 'right',
    marginLeft: '10px',
    fontSize: '16px ',

    [theme.breakpoints.down('xs')]: {
      width: 120,
      fontSize: '14px ',
    },
    [theme.breakpoints.up('sm')]: {
      width: 150,
      fontSize: '16px ',
    },
    [theme.breakpoints.up('lg')]: {
      width: 160,
      fontSize: '16px ',
    },
  },
  text2: {
    textAlign: 'right',
    fontSize: '16px ',
    [theme.breakpoints.down('xs')]: {
      width: 120,
      fontSize: '14px ',
    },
    [theme.breakpoints.up('sm')]: {
      width: 150,
      fontSize: '16px ',
    },
    [theme.breakpoints.up('lg')]: {
      width: 160,
      fontSize: '16px ',
    },
    backgroundColor: '#222222',
    color: '#fff',
  },
}))

export function Profile() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { user, loading } = useSelector((state) => state.auth)
  const profile = useSelector((state) => state.profile)
  useEffect(() => {
    dispatch(getProfile())
  }, [dispatch])

  console.log(profile)
  const rendered =
    loading || profile.loading ? (
      <Loading />
    ) : (
      <div className={classes.root}>
        <SupervisedUserCircle />
        <Typography>معلومات حسابـي</Typography>
        <List component='nav' aria-label='main mailbox folders'>
          <ListItem button>
            <ListItemIcon>
              <SupervisedUserCircle />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography className={classes.text1}>اسم المستخدم</Typography>
              }
            />
            <ListItemText
              primary={
                <Typography className={classes.text2}>{user.name}</Typography>
              }
            />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Email />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography className={classes.text1}>
                  البريد الإلكتروني
                </Typography>
              }
            />
            <ListItemText
              primary={
                <Typography className={classes.text2}>{user.email}</Typography>
              }
            />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <LocationCity />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography className={classes.text1}>الولاية</Typography>
              }
            />
            <ListItemText
              primary={
                <Typography className={classes.text2}>
                  {profile.profile.wilaya === ''
                    ? 'غير معرف'
                    : profile.profile.wilaya}
                </Typography>
              }
            />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <MyLocation />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography className={classes.text1}>الدائرة</Typography>
              }
            />
            <ListItemText
              primary={
                <Typography className={classes.text2}>
                  {profile.profile.dayra === ''
                    ? 'غير معرف'
                    : profile.profile.dayra}
                </Typography>
              }
            />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <CalendarToday />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography className={classes.text1}>تاريخ التسجيل</Typography>
              }
            />
            <ListItemText
              primary={
                <Typography className={classes.text2}>
                  {user.time.slice(0, 10) + ' | ' + user.time.slice(11, 16)}
                </Typography>
              }
            />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Money />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography className={classes.text1}>أرباحـي</Typography>
              }
            />
            <ListItemText
              primary={
                <Typography className={classes.text2}>
                  {user.money ? 'دج' + user.money : '0 دج'}
                </Typography>
              }
            />
          </ListItem>
          <Button variant='outlined' color='primary'>
            تعديل البيانات
          </Button>
          <Button variant='outlined' color='primary'>
            سحب الأربـاح
          </Button>
        </List>
      </div>
    )
  return rendered
}
