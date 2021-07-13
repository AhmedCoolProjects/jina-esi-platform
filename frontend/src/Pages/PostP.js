import React, { useState, useEffect } from "react";
import { Container, Typography, Divider, Fab } from "@material-ui/core";
import TopNavbarC from "../Components/TopNavbarC";
import { RateReviewOutlined } from "@material-ui/icons";
import PostCommentDrawerC from "../Components/PostCommentDrawerC";
import { useParams } from "react-router-dom";
import JinaEPDataService from "../Axios/jinaesiplatform";
import moment from "moment";

function PostP() {
  const { _id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [post, setPost] = useState(null);
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
    async function retrievePost() {
      await JinaEPDataService.getPostById(_id)
        .then((response) => {
          setPost(response.data[0]);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    retrievePost();
  }, [_id]);

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
            {post?.title}
          </Typography>
          <Divider />
          <Typography
            style={{ textAlign: "right" }}
            variant="subtitle1"
            color="textSecondary">
            By: {post?.writer_email}
          </Typography>
          <img
            src={post?.image}
            alt={post?.title}
            style={{
              width: "100%",
              objectFit: "contain",
            }}
          />
          <Typography style={{ marginTop: 12 }} variant="h5" gutterBottom>
            {post?.content}
          </Typography>
          <Typography
            style={{ textAlign: "right" }}
            variant="subtitle1"
            color="textSecondary">
            {moment(post?.createdAt).fromNow()}
          </Typography>
        </Container>
      </Container>
      <PostCommentDrawerC
        post_id={_id}
        isOpen={isOpen}
        toggleDrawer={toggleDrawer}
      />
    </div>
  );
}

export default PostP;
