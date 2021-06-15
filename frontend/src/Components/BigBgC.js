import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Link, Grid, Typography, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  mainFeaturedCard: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    height: 550,
    backgroundImage:
      "url(https://www.lifeismorocco.com/wp-content/uploads/2019/10/Kabana-Marrakech-rooftop-restaurant-bar-@LIFEismorocco_cover.jpg)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.3)",
  },
  mainFeaturedCardContent: {
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
}));

export default function BigBgC(props) {
  const classes = useStyles();
  const { post } = props;

  return (
    <Paper
      className={classes.mainFeaturedCard}
      style={{ backgroundImage: `url(${post.image})` }}>
      {
        <img
          style={{ display: "none" }}
          src={post.image}
          alt={post.imageText}
        />
      }
      <div className={classes.overlay} />
      <Grid container>
        <Grid item md={6}>
          <div className={classes.mainFeaturedCardContent}>
            <Typography
              component="h1"
              variant="h2"
              color="inherit"
              gutterBottom>
              {post.title}
            </Typography>
            <Typography
              style={{ marginLeft: 15 }}
              variant="h5"
              color="inherit"
              paragraph>
              {post.description}
            </Typography>
            <Typography
              style={{ marginLeft: 15 }}
              variant="h5"
              color="inherit"
              paragraph>
              {post.description2}
            </Typography>
            <Link
              style={{ marginLeft: 15, fontSize: 20, fontWeight: "700" }}
              variant="subtitle1"
              href="#">
              {post.linkText}
            </Link>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}

BigBgC.propTypes = {
  post: PropTypes.object,
};
