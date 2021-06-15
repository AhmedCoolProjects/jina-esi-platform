import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid } from "@material-ui/core";
import BigBgC from "../Components/BigBgC";
import TopNavbarC from "../Components/TopNavbarC";
import RecentPostsC from "../Components/RecentPostsC";

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));
const bigBgC = {
  title: "Study With Love",
  description: "Get Everything You Need In One Place.",
  description2:
    "you can find all old/new documents and links available all the time on this platform",
  image: "https://www.np6.com/wp-content/uploads/2017/03/Data-Science.jpg",
  imgText: "main image description",
  linkText: "Contact Us…",
};

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
const posts = [post1, post2, post1];

export default function DashboardP() {
  const classes = useStyles();

  return (
    <Fragment>
      <Container maxWidth="lg">
        <TopNavbarC />
        <main>
          <BigBgC post={bigBgC} />
          <Grid container spacing={5} className={classes.mainGrid}>
            <RecentPostsC posts={posts} />
          </Grid>
        </main>
      </Container>
    </Fragment>
  );
}
