import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link, Typography } from "@material-ui/core";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link
        target="blank_"
        color="inherit"
        href="https://www.linkedin.com/in/bargady-ahmed-082b30177">
        Jina Cool Projects
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(6),
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
}));
function FooterC() {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Typography
        color="textSecondary"
        variant="h6"
        align="center"
        gutterBottom>
        Created By:
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="textSecondary"
        component="p">
        Ahmed BARGADY
      </Typography>
      <Copyright />
    </footer>
  );
}

export default FooterC;
