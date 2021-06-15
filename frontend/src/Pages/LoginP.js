import React from "react";
import {
  Container,
  Grid,
  Paper,
  CardActionArea,
  Typography,
} from "@material-ui/core";
import { ExitToAppOutlined } from "@material-ui/icons";
import team_solid from "../assets/team_solid.svg";

function LoginP() {
  return (
    <Container className="loginp_container" maxWidth="lg">
      <div className="loginp_header">
        <img src="" alt="logo_esi" />
        <Typography variant="h3">Login Page</Typography>
      </div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={6}>
          <img
            src={team_solid}
            alt="login_image"
            style={{
              width: "100%",
              objectFit: "contain",
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Paper
            style={{
              padding: 0,
              marginBottom: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
            elevation={4}>
            <input
              type="email"
              id="user_email_id"
              placeholder="name..@esi.ac.ma"
              className="loginp_input"
            />
          </Paper>
          <Paper
            style={{
              padding: 0,
              marginBottom: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
            elevation={4}>
            <input
              type="password"
              id="user_password_id"
              placeholder="password"
              className="loginp_input"
            />
          </Paper>
          <Paper
            style={{
              padding: 0,
              marginBottom: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
            elevation={4}>
            <CardActionArea
              style={{
                padding: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
              }}>
              <Typography variant="h6">Login</Typography>
              <ExitToAppOutlined />
            </CardActionArea>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default LoginP;
