import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Avatar,
  CardActionArea,
} from "@material-ui/core";
import { MeetingRoomOutlined } from "@material-ui/icons";
import TopNavbarC from "../Components/TopNavbarC";
import ModuleChatRoomC from "../Components/ModuleChatRoomC";
import PostCardC from "../Components/PostCardC";
import JinaEPDataService from "../Axios/jinaesiplatform";
import { useParams, useLocation, Link } from "react-router-dom";

function ModuleP() {
  const [isOpen, setIsOpen] = useState(false);
  const { module_id } = useParams();
  const { moduleData } = useLocation();
  const [modulePostsList, setModulePostsList] = useState([]);
  const [moduleProf, setModuleProf] = useState(null);
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsOpen(open);
  };
  // get prof,
  useEffect(() => {
    async function retrieveModuleProf() {
      await JinaEPDataService.getModuleProf(moduleData.profId)
        .then((response) => {
          setModuleProf(response.data[0]);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    retrieveModuleProf();
  }, [moduleData.profId]);
  // get posts of the module
  useEffect(() => {
    async function retrieveModulePosts() {
      await JinaEPDataService.getModulePosts(module_id)
        .then((response) => {
          setModulePostsList(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    retrieveModulePosts();
  }, [module_id]);

  return (
    <div>
      <Container maxWidth="lg">
        <TopNavbarC />
        {/* Prof and Courses */}
        <Typography
          style={{ textAlign: "center", marginBottom: 24 }}
          variant="h4"
          color="textSecondary">
          {moduleData.module_name}
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
                src={moduleProf && moduleProf.image}
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
                      {moduleProf &&
                        `Mr/s. ${moduleProf.first_name} ${moduleProf.last_name}`}
                    </Typography>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Typography style={{ marginRight: 8 }} variant="h6">
                      Email
                    </Typography>
                  </td>
                  <td>
                    <Typography variant="h5" color="textSecondary">
                      {moduleProf && moduleProf.email}
                    </Typography>
                  </td>
                </tr>
              </table>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={7}>
            <Link
              to={`/docs/${module_id}`}
              style={{ color: "inherit", textDecoration: "none" }}>
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
            </Link>
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
          {`Posts (${modulePostsList?.length})`}
        </Typography>
        <Grid container spacing={3}>
          {modulePostsList &&
            modulePostsList.map((modulePost) => (
              <PostCardC key={modulePost._id} post={modulePost} />
            ))}
        </Grid>
      </Container>
      <ModuleChatRoomC
        isOpen={isOpen}
        toggleDrawer={toggleDrawer}
        module_id={module_id}
      />
    </div>
  );
}

export default ModuleP;
