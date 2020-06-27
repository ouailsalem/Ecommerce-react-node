import React, { useState, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import CloseIcon from '@material-ui/icons/Close'
import { Link } from 'react-router-dom'
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
import { resetProfile } from '../redux/actions/profile'
import { Loading } from './Loading'
import { loadUser } from '../redux/actions/auth'
export function Profile() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { user, loading } = useSelector((state) => state.auth)
  const { profile, loadingProfile } = useSelector((state) => state.profile)
  const [fullScreen, setFullScreen] = useState(false)

  useEffect(() => {
    dispatch(resetProfile())
    dispatch(getProfile())
  }, [])

  return (
    <Fragment>
      {loadingProfile || loading ? (<Loading />) :
        (<div className={classes.root}>
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
                    {profile.wilaya === '' ? 'غير معرف' : profile.wilaya}
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
                    {profile.dayra === '' ? 'غير معرف' : profile.dayra}
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
            <div className={classes.buttonContainer}>
              <Button
                component={Link}
                to={`/profile/update`}
                variant='outlined'
                color='primary'
              >
                تعديل البيانات
          </Button>
              <Button
                onClick={() => setFullScreen(true)}
                variant='outlined'
                color='primary'
              >
                سحب الأربـاح
          </Button>
            </div>
          </List>
          <div>
            <Dialog
              open={fullScreen}
              aria-labelledby='alert-dialog-title'
              aria-describedby='alert-dialog-description'
            >
              <CloseIcon
                onClick={() => {
                  setFullScreen(false)
                }}
              />
              <DialogContent>
                <Typography>
                  لسحب  أرباحك و ضمان خصوصيتك قم بنسخ المعلومات  و إرسالها إلى حسابي
            </Typography>
                <Typography>https://www.facebook.com/WaHeB.3abdeLLi</Typography>
                <Typography>أو على الإيميل</Typography>
                <Typography>wahab@gmail.com</Typography>
                <Typography style={{ color: "#222222", backgroundColor: "#FFCC33", textDecoration: "underline" }}>المعلومات</Typography>
                <Typography>الاسم : {user.name}</Typography>
                <Typography>الايميل : {user.email}</Typography>
                <Typography>الأرباح : {user.money}</Typography>
                <Typography>الرقم الخاص بالمستخدم : {user.id}</Typography>
              </DialogContent>
            </Dialog>
          </div>
        </div>)}
    </Fragment>)
}


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
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text1: {
    textAlign: 'right',
    marginLeft: '10px',
    fontSize: '16px ',

    [theme.breakpoints.down('xs')]: {
      width: 120,
      fontSize: '16x ',
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
  },
}))
