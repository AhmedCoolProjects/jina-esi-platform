import React, { useState } from "react";
import firebaseAuth from "../firebase/firebase";
import {
  Container,
  Grid,
  Paper,
  CardActionArea,
  Typography,
} from "@material-ui/core";
import { ExitToAppOutlined } from "@material-ui/icons";
import {
  ErrorPasswordDialog,
  UNFDialog,
  ToManyRequestsDialog,
  ResetPasswordDialog,
} from "../Components/LoginDialogsC";
import team_solid from "../assets/team_solid.svg";
import esi_logo from "../assets/esi_logo.jpg";

function LoginP() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const [openResetDialog, setOpenResetDialog] = useState(false);
  const [openTooManyRequests, setOpenTooManyRequests] = useState(false);
  const [openUNFDialog, setOpenUNFDialog] = useState(false);
  const handleLoginFct = () => {
    firebaseAuth
      .signInWithEmailAndPassword(userEmail, userPassword)
      .then((user) => {
        console.log("user", user);
      })
      .catch((err) => {
        console.log(err);
        if (err.code === "auth/user-not-found") {
          console.log(err.message);
          setOpenUNFDialog(true);
        } else if (err.code === "auth/wrong-password") {
          console.log(err.message);
          setOpenErrorDialog(true);
        } else if (err.code === "auth/too-many-requests") {
          console.log(err.message);
          setOpenTooManyRequests(true);
        }
      });
  };
  // const addAllToFirebase = () => {
  //   for (var i = 0; i < mydata.length; i++) {
  //     var email = mydata[i].Email;
  //     firebaseAuth
  //       .createUserWithEmailAndPassword(email, "pass100")
  //       .then((userCredential) => {
  //         const user = userCredential.user;
  //         console.log(user.email, i);
  //       })
  //       .catch((error) => {
  //         const errorCode = error.code;
  //         const errorMessage = error.message;
  //       });
  //   }
  // };
  return (
    <Container className="loginp_container" maxWidth="lg">
      <div className="loginp_header">
        <img
          src={esi_logo}
          alt="esi_logo"
          style={{
            height: "100%",
            objectFit: "contain",
          }}
        />
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
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              type="email"
              id="user_email_id"
              placeholder="name..@esi.ac.ma"
              className="loginp_input"
              required
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
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              type="password"
              id="user_password_id"
              placeholder="password"
              className="loginp_input"
              required
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
              onClick={handleLoginFct}
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
      {/* dialog for password error */}
      <ErrorPasswordDialog
        handleCloseDialog={() => setOpenErrorDialog(false)}
        openDialog={openErrorDialog}
        openTheResetPasswordDialog={() => setOpenResetDialog(true)}
      />
      {/* dialog for user not found */}
      <UNFDialog
        handleCloseDialog={() => setOpenUNFDialog(false)}
        openDialog={openUNFDialog}
        openContactUs={() => setOpenUNFDialog(false)}
      />
      {/* dialog for reset password */}
      <ResetPasswordDialog
        openDialog={openResetDialog}
        handleCloseDialog={() => setOpenResetDialog(false)}
      />
      {/* dialog for many requests */}
      <ToManyRequestsDialog
        handleCloseDialog={() => setOpenTooManyRequests(false)}
        openDialog={openTooManyRequests}
        openContactUs={() => setOpenTooManyRequests(false)}
      />
    </Container>
  );
}

export default LoginP;
