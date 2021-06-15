import React, { useState } from "react";
import { Container, Typography, Divider, Fab } from "@material-ui/core";
import TopNavbarC from "../Components/TopNavbarC";
import { RateReviewOutlined } from "@material-ui/icons";
import PostCommentDrawerC from "../Components/PostCommentDrawerC";

const post1 = {
  title: "Le Management",
  image:
    "https://img.daf-mag.fr/Img/BREVE/2020/6/350655/Asset-Management-Comment-adapter-new-normal--T.jpg",
  owner: "Ahmed Bargady",
  date: "26/03/2021 3:08 am",
  description: (
    <p>
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

function PostP() {
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
        <Fab
          onClick={() => setIsOpen(true)}
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 20,
            backgroundColor: "#ffffffb4",
          }}>
          <RateReviewOutlined
            style={{
              fontSize: 28,
            }}
            color="primary"
          />
        </Fab>
        <Container maxWidth="md">
          <Typography variant="h6" gutterBottom>
            {post1.title}
          </Typography>
          <Divider />
          <Typography
            style={{ textAlign: "right" }}
            variant="subtitle1"
            color="textSecondary">
            By: {post1.owner}
          </Typography>
          <img
            src={post1.image}
            alt={post1.title}
            style={{
              width: "100%",
              objectFit: "contain",
            }}
          />
          <Typography style={{ marginTop: 12 }} variant="h5" gutterBottom>
            {post1.description}
          </Typography>
          <Typography
            style={{ textAlign: "right" }}
            variant="subtitle1"
            color="textSecondary">
            {post1.date}
          </Typography>
        </Container>
      </Container>
      <PostCommentDrawerC isOpen={isOpen} toggleDrawer={toggleDrawer} />
    </div>
  );
}

export default PostP;
