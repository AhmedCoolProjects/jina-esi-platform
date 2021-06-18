import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Divider,
  Avatar,
  CardActionArea,
} from "@material-ui/core";
import { MeetingRoomOutlined } from "@material-ui/icons";
import TopNavbarC from "../Components/TopNavbarC";
import PostCommentDrawerC from "../Components/PostCommentDrawerC";
import PostCardC from "../Components/PostCardC";
import JinaEPDataService from "../Axios/jinaesiplatform";
import { useParams } from "react-router-dom";

function ModuleP() {
  const [isOpen, setIsOpen] = useState(false);
  const { module_name } = useParams();
  const [modulePostsList, setModulePostsList] = useState([]);
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsOpen(open);
  };
  useEffect(() => {
    retrieveModulePosts();
  }, []);
  useEffect(() => {
    retrieveModulePosts();
  }, [module_name]);
  const retrieveModulePosts = () => {
    JinaEPDataService.getAllModulePosts(module_name)
      .then((response) => {
        setModulePostsList(response.data.postsList);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div>
      <Container maxWidth="lg">
        <TopNavbarC />
        {/* Prof and Courses */}
        <Typography
          style={{ textAlign: "center", marginBottom: 24 }}
          variant="h4"
          color="textSecondary">
          {module_name}
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
              <Typography
                style={{
                  width: "100%",
                  alignItems: "flex-start",
                }}
                variant="h5"
                color="textSecondary">
                Professor
              </Typography>
              <Avatar
                style={{
                  width: 200,
                  height: 200,
                }}
                alt="Prof Image"
                src="https://www.gettyimages.fr/gi-resources/images/500px/983794168.jpg"
              />
              <table style={{ width: "100%", marginTop: 24, padding: 12 }}>
                <tr>
                  <td>
                    <Typography style={{ marginRight: 8 }} variant="h6">
                      Full Name
                    </Typography>
                  </td>
                  <td>
                    <Typography variant="h5" color="textSecondary">
                      Mr. Ahmed Bargady
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
                      ahmed.bargady@esi.ac.ma
                    </Typography>
                  </td>
                </tr>
              </table>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={7}>
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
                <Typography variant="h6">Courses:</Typography>
                <Typography variant="h6">12 documents</Typography>
              </CardActionArea>
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
                <Typography variant="h6">TP & TD:</Typography>
                <Typography variant="h6">12</Typography>
              </CardActionArea>
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
                <Typography variant="h6">Exams:</Typography>
                <Typography variant="h6">12 documents</Typography>
              </CardActionArea>
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
                onClick={() => setIsOpen(true)}
                style={{
                  padding: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}>
                <Typography variant="h6">Open Collective Room:</Typography>
                <MeetingRoomOutlined />
              </CardActionArea>
            </Paper>
          </Grid>
        </Grid>
        {/* Module Posts */}
        <Typography
          style={{ textAlign: "center", marginBottom: 24 }}
          variant="h4"
          color="textSecondary">
          Posts
        </Typography>
        <Grid container spacing={3}>
          {modulePostsList.map((modulePost) => (
            <PostCardC key={modulePost._id} post={modulePost} />
          ))}
        </Grid>
      </Container>
      <PostCommentDrawerC isOpen={isOpen} toggleDrawer={toggleDrawer} />
    </div>
  );
}

export default ModuleP;
