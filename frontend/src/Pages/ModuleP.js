import React, { useState } from "react";
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

const post1 = {
  title: "Le Management",
  image:
    "https://img.daf-mag.fr/Img/BREVE/2020/6/350655/Asset-Management-Comment-adapter-new-normal--T.jpg",
  owner: "Ahmed Bargady",
  date: "26/03/2021 3:08 am",
  description: (
    <p className="post_description">
      Le management est la mise en œuvre des moyens humains et matériels d'une
      entreprise pour atteindre ses objectifs. Il correspond à l'idée de gestion
      et de pilotage1 appliquée à une entreprise ou une unité de celle-ci.
      Lorsqu'il concerne l'entreprise tout entière on peut généralement
      l'assimiler à la fonction de direction (la « fonction administrative » de
      H. Fayol). Le management est présenté ici dans sa version prédominante,
      d'autres formes existent en particulier dans les approches en gouvernance
      partagée. Le management consiste à2 : fixer des objectifs (stratégiques et
      opérationnels), choisir les moyens de les atteindre, mettre en œuvre ces
      moyens (recherche d'efficience), contrôler la mise en œuvre et les
      résultats obtenus, assurer une régulation à partir de ce contrôle
      (Gouvernance). Il comprend une dimension technique (principalement liée à
      la comptabilité analytique et aux méthodes de contrôle de gestion visant à
      optimiser les ressources) et une dimension humaine (liée à la nécessité
      d'obtenir la motivation et la coopération des membres composant
      l'organisation). Le management désigne aussi les responsables de la
      fonction managériale (à ses différents niveaux dans l'entreprise). Les
      différentes dimensions du management ont été théorisées à travers les
      théories des organisations.
    </p>
  ),
};
const post2 = {
  title: "La Métadonnée",
  image: "https://i.ytimg.com/vi/jyva44uHoR4/maxresdefault.jpg",
  owner: "Ahmed Bargady",
  date: "26/03/2021 3:15 am",
  description: (
    <p className="post_description">
      Une métadonnée (mot composé du préfixe grec meta, indiquant
      l'auto-référence ; le mot signifie donc proprement « donnée de/à propos de
      donnée ») est une donnée servant à définir ou décrire une autre donnée
      quel que soit son support (papier ou électronique). Un exemple type est
      d'associer à une donnée la date à laquelle elle a été produite ou
      enregistrée, ou à une photo les coordonnées GPS du lieu où elle a été
      prise. Les métadonnées sont à la base des techniques du Web sémantique.
      Elles sont définies dans le cadre du modèle Resource Description Framework
      (RDF).
    </p>
  ),
};

const posts = [post1, post2, post1, post1, post2, post1, post2];

function ModuleP() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsOpen(open);
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
          Module Name
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
          {posts.map((item, index) => (
            <PostCardC key={index} post={item} />
          ))}
        </Grid>
      </Container>
      <PostCommentDrawerC isOpen={isOpen} toggleDrawer={toggleDrawer} />
    </div>
  );
}

export default ModuleP;
