import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
  DialogTitle,
} from "@material-ui/core";
import firebaseAuth from "../firebase/firebase";
import errorPasswordImage from "../assets/didnt_find_user_email.svg";
import userNotFoundImage from "../assets/user_email_doesnt_exist.svg";
import emailVerificationSentImage from "../assets/sent_verification_user_email.svg";
import TooManyRequestsImage from "../assets/too_many_requests.svg";

export function ErrorPasswordDialog({
  handleCloseDialog,
  openDialog,
  openTheResetPasswordDialog,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleCloseDialog();
    openTheResetPasswordDialog();
  };
  return (
    <Dialog
      open={openDialog}
      onClose={handleCloseDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">
        {"Forgot Your Password?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          The password is invalid or the user does not have a password. If it is
          your first time, you should reset your password to make your own, you
          ll get a verification email in your esi email box where you can create
          your own password, then login.
        </DialogContentText>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            backgroundColor: "rgba(255,255,255,0.7)",
            marginTop: 8,
          }}>
          <img
            src={errorPasswordImage}
            alt="user_not_found"
            style={{
              height: 200,
              objectFit: "contain",
            }}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" autoFocus>
          Reset Password
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export function UNFDialog({ handleCloseDialog, openDialog, openContactUs }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleCloseDialog();
    openContactUs();
  };
  return (
    <Dialog
      open={openDialog}
      onClose={handleCloseDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{"User Not Found"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          There is no user record corresponding to this identifier. The user may
          have been deleted.
        </DialogContentText>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            backgroundColor: "rgba(255,255,255,0.7)",
            marginTop: 8,
          }}>
          <img
            src={userNotFoundImage}
            alt="user_not_found"
            style={{
              height: 200,
              objectFit: "contain",
            }}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" autoFocus>
          Contact Us
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export function ToManyRequestsDialog({
  handleCloseDialog,
  openDialog,
  openContactUs,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleCloseDialog();
    openContactUs();
  };
  return (
    <Dialog
      open={openDialog}
      onClose={handleCloseDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">
        {"Too Many Requests ;("}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Access to this account has been temporarily disabled due to many
          failed login attempts. You can immediately restore it by resetting
          your password or you can try again later.
        </DialogContentText>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            backgroundColor: "rgba(255,255,255,0.7)",
            marginTop: 8,
          }}>
          <img
            src={TooManyRequestsImage}
            alt="user_not_found"
            style={{
              height: 200,
              objectFit: "contain",
            }}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" autoFocus>
          Contact Us
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export function ResetPasswordDialog({ openDialog, handleCloseDialog }) {
  const [userEmail, setUserEmail] = useState("");
  const resetPasswordFct = (e) => {
    e.preventDefault();
    firebaseAuth
      .sendPasswordResetEmail(userEmail)
      .then(alert("Email Verification Sent"))
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Dialog
      open={openDialog}
      onClose={handleCloseDialog}
      aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Reset Your Password</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You ll recieve link verification in your ESI email box, then you can
          change your password.
        </DialogContentText>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            backgroundColor: "rgba(255,255,255,0.7)",
            marginTop: 8,
            marginBottom: 8,
          }}>
          <img
            src={emailVerificationSentImage}
            alt="user_not_found"
            style={{
              height: 200,
              objectFit: "contain",
            }}
          />
        </div>
        <TextField
          autoFocus
          margin="dense"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          id="email"
          label="ESI Email Address"
          type="email"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={resetPasswordFct} color="primary">
          Get Verification Password
        </Button>
      </DialogActions>
    </Dialog>
  );
}
