import React, { useState, Fragment } from "react";
import {
  Container,
  Grid,
  Typography,
  MenuItem,
  Select,
  Button,
  FormControl,
  InputLabel,
  Input,
} from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
import PostCardC from "../Components/PostCardC";
import DropzoneAreaC from "../Components/DropzoneAreaC";
import TopNavbarC from "../Components/TopNavbarC";
import "../styles/mypostsp.css";

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
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const ModuleTitles = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];
const posts = [post1, post2, post1, post1, post2, post1, post2];
function MyPostsP() {
  const [moduleSelect, setModuleSelect] = useState("");

  return (
    <Fragment>
      <Container max-width="lg">
        <TopNavbarC />
        {/* write a post */}
        <Typography
          style={{ textAlign: "center", marginBottom: 24 }}
          variant="h4"
          color="textSecondary">
          Create a Posts
        </Typography>
        <Container max-width="md">
          <div className="mypostsp_title_checkbox_container">
            <input
              type="text"
              id="post_title"
              placeholder="Post Title"
              className="mypostsp_input_title"
            />
            <FormControl
              style={{
                width: 120,
              }}>
              <InputLabel id="select-module">Module</InputLabel>
              <Select
                labelId="select-module"
                id="demo-mutiple-name"
                value={moduleSelect}
                onChange={(e) => setModuleSelect(e.target.value)}
                input={<Input />}
                MenuProps={MenuProps}>
                {ModuleTitles.map((title) => (
                  <MenuItem key={title} value={title}>
                    {title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <DropzoneAreaC />
          <textarea
            className="mypostsp_textarea"
            rows={15}
            placeholder="Post Body"
          />
          <div className="mypostsp_button_container">
            <Button
              variant="contained"
              color="default"
              endIcon={<CloudUpload />}>
              Publish
            </Button>
          </div>
        </Container>

        {/* my posts */}
        <Typography
          style={{ textAlign: "center", marginBottom: 24 }}
          variant="h4"
          color="textSecondary">
          My Posts
        </Typography>
        <Grid container spacing={3}>
          {posts.map((item, index) => (
            <PostCardC key={index} post={item} />
          ))}
        </Grid>
      </Container>
    </Fragment>
  );
}

export default MyPostsP;
