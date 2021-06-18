import React, { useState, Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../Redux/User";
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
import JinaEPDataService from "../Axios/jinaesiplatform";
import DropzoneAreaC from "../Components/DropzoneAreaC";
import TopNavbarC from "../Components/TopNavbarC";
import "../styles/mypostsp.css";
import { storage } from "../firebase/firebase";

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
const modules_names = [
  { title: "UNIMARC" },
  { title: "SGBD: SQL" },
  { title: "Micro-économie" },
  { title: "Comptabilité générale" },
  { title: "TEC 2" },
  { title: "Réseaux informatiques" },
  { title: "Analyse documentaire" },
  { title: "Management" },
];
function MyPostsP() {
  const user = useSelector(selectUser);
  const [postModule, setPostModule] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [myPostsList, setMyPostsList] = useState([]);
  const [progress, setProgress] = useState("");
  const [postImage, setPostImage] = useState(null);
  const handlePublishPost = () => {
    const postImageName = `${Date.now()}-${postImage.name}`;
    const uploadTask = storage
      .ref(`posts-images/${postImageName}`)
      .put(postImage);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress logic
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (err) => {
        console.log(err);
      },
      () => {
        storage
          .ref("posts-images")
          .child(`${postImageName}`)
          .getDownloadURL()
          .then((url) => {
            var data = {
              writer_email: user.email,
              title: postTitle,
              content: postContent,
              date: Date.now(),
              module_name: postModule,
              image: url,
            };
            JinaEPDataService.addPost(data)
              .then((response) => {
                setPostContent("");
                setPostTitle("");
                setPostImage(null);
                setPostModule("");
                retrieveMyPosts();
              })
              .catch((e) => console.log(e));
          });
      }
    );
  };
  const setFilesFct = (files) => {
    setPostImage(files[0]);
  };

  useEffect(() => {
    retrieveMyPosts();
  }, []);
  const retrieveMyPosts = () => {
    JinaEPDataService.getPostByEmail(user.email)
      .then((response) => {
        setMyPostsList(response.data.postsList);
      })
      .catch((e) => {
        console.log(e);
      });
  };

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
              value={postTitle}
              id="post_title"
              onChange={(e) => setPostTitle(e.target.value)}
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
                value={postModule}
                onChange={(e) => setPostModule(e.target.value)}
                input={<Input />}
                MenuProps={MenuProps}>
                {modules_names.map((moduleName) => (
                  <MenuItem key={moduleName.title} value={moduleName.title}>
                    {moduleName.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <DropzoneAreaC setFilesFct={setFilesFct} />

          <textarea
            className="mypostsp_textarea"
            rows={15}
            value={postContent}
            placeholder="Post Body"
            onChange={(e) => setPostContent(e.target.value)}
          />
          <div className="mypostsp_button_container">
            <Button
              variant="contained"
              onClick={handlePublishPost}
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
          {myPostsList.map((myPost) => (
            <PostCardC key={myPost._id} post={myPost} />
          ))}
        </Grid>
      </Container>
    </Fragment>
  );
}

export default MyPostsP;
