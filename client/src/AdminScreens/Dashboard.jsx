import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Grid, AppBar, Container } from '@material-ui/core';
import { Link } from 'react-router-dom';



function Tile({ title, color, link, history }) {
  const useStyles = makeStyles({
    root: {
      height: "200px",
      width: "80%",
      display: "flex",
      alignContent: "center",
      justifyContent: "center",
      backgroundColor: color
    },
  });
  const classes = useStyles()
  return (

    <Grid container item xs={12} md={6} justify="center" alignItems="center">
      <Card className={classes.root} component={Link} to={link}>
        <CardActionArea >
          <CardContent>
            <Typography style={{ color: "#fff" }} align="center" variant="h2">
              {title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid >

  )
}
export function Dashboard() {

  const buttons = [
    { id: "1", name: "المنتجات", color: "#363457", link: "/admin/products" },
    { id: "2", name: "الطلبات", color: "#C14953", link: "/admin/orders" },
    { id: "3", name: "الأعضاء", color: "#848FA5", link: "/admin/members" },
    { id: "4", name: "التعليقات", color: "#345995", link: "/admin/reviews" },

  ]
  return (
    <Container maxWidth="lg">
     
      <Grid container  style={{ height: "100vh" }} >
        {buttons.map(button => {
          return (<Tile title={button.name} link={button.link} color={button.color} key={button.id} />)
        })}
      </Grid >
    </Container>

  )
}