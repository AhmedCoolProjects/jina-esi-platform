import React, { useState, useEffect, Fragment } from "react";
import {
  Divider,
  Typography,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
} from "@material-ui/core";
import { Telegram } from "@material-ui/icons";
import "../styles/postcommentdrawerc.css";
import JinaEPDataService from "../Axios/jinaesiplatform";
import PostCommentC from "./PostCommentC";
import { useSelector } from "react-redux";
import { selectUser } from "../Redux/User";
import nopostcomment from "../assets/nopostcomment.svg";

export default function PostCommentDrawerC({ isOpen, toggleDrawer, post_id }) {
  const user = useSelector(selectUser);
  const [postComments, setPostComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  useEffect(() => {
    const intervalID = setInterval(() => {
      retrievePostComments();
    }, 1000);
    return () => clearInterval(intervalID);
  }, []);
  const retrievePostComments = () => {
    JinaEPDataService.getAllComments(post_id)
      .then((response) => {
        setPostComments(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleSendComment = () => {
    var data = {
      post_id: post_id,
      content: commentContent,
      sender_email: user.email,
      date: Date.now(),
    };
    JinaEPDataService.addComment(data)
      .then((response) => {
        setCommentContent("");
        retrievePostComments();
      })
      .catch((e) => console.log(e));
  };
  return (
    <div>
      <Fragment>
        <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
          <div className="postcommentdrawerc_list_root">
            <Typography variant="h6" gutterBottom>
              {`${postComments.length} Comments`}
            </Typography>
            <Divider />
            <div className="postcommentdrawerc_list_comments">
              {postComments.length === 0 ? (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}>
                  <img
                    src={nopostcomment}
                    alt="no_post_comment"
                    style={{
                      width: 250,
                      objectFit: "containt",
                    }}
                  />
                </div>
              ) : (
                postComments.map((comment) => (
                  <PostCommentC
                    key={comment._id}
                    user_email={user.email}
                    comment={comment}
                  />
                ))
              )}
            </div>
            <Input
              style={{
                marginTop: 16,
                width: "100%",
              }}
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="Add Comment.."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handleSendComment}>
                    <Telegram />
                  </IconButton>
                </InputAdornment>
              }
            />
          </div>
        </Drawer>
      </Fragment>
    </div>
  );
}
