import React from "react";
import {
  Container,
  Paper,
  Grid,
  Divider,
  Typography,
  CardActionArea,
} from "@material-ui/core";
import { ExitToAppOutlined } from "@material-ui/icons";
import TopNavbarC from "../Components/TopNavbarC";
import ProfileAvatarC from "../Components/ProfileAvatarC";
import { useSelector } from "react-redux";
import { selectUser } from "../Redux/User";
import firebaseAuth from "../firebase/firebase";

function ProfileP() {
  const user = useSelector(selectUser);
  const handleLogoutFct = () => {
    firebaseAuth.signOut();
  };
  return (
    <div>
      <Container maxWidth="lg">
        <TopNavbarC />
        <main>
          <Typography
            style={{ textAlign: "center", marginBottom: 24 }}
            variant="h4"
            color="textSecondary">
            My Profile
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={5}>
              <Paper
                style={{
                  padding: 12,
                  marginBottom: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                  position: "relative",
                }}
                elevation={4}>
                <ProfileAvatarC user_image="https://www.gettyimages.fr/gi-resources/images/500px/983794168.jpg" />
                <table style={{ width: "100%", marginTop: 24, padding: 12 }}>
                  <tr>
                    <td>
                      <Typography variant="h6">First Name</Typography>
                    </td>
                    <td>
                      <Typography variant="h5" color="textSecondary">
                        Ahmed
                      </Typography>
                    </td>
                  </tr>
                  <Divider style={{ marginBottom: 12 }} />
                  <tr>
                    <td>
                      <Typography style={{ marginRight: 8 }} variant="h6">
                        Last Name
                      </Typography>
                    </td>
                    <td>
                      <Typography variant="h5" color="textSecondary">
                        Bargady
                      </Typography>
                    </td>
                  </tr>
                  <Divider style={{ marginBottom: 12 }} />
                  <tr>
                    <td>
                      <Typography style={{ marginRight: 8 }} variant="h6">
                        Email
                      </Typography>
                    </td>
                    <td>
                      <Typography variant="h5" color="textSecondary">
                        {user.email}
                      </Typography>
                    </td>
                  </tr>
                </table>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={7}>
              <Paper
                style={{
                  padding: 12,
                  marginBottom: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
                elevation={4}>
                <Typography variant="h6">My Posts:</Typography>
                <Typography variant="h6">12 posts</Typography>
              </Paper>
              <Paper
                style={{
                  padding: 12,
                  marginBottom: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
                elevation={4}>
                <Typography variant="h6">My Favorites:</Typography>
                <Typography variant="h6">12 posts</Typography>
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
                  onClick={handleLogoutFct}
                  style={{
                    padding: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}>
                  <Typography variant="h6">Logout</Typography>
                  <ExitToAppOutlined />
                </CardActionArea>
              </Paper>
            </Grid>
          </Grid>
        </main>
      </Container>
    </div>
  );
}

export default ProfileP;
