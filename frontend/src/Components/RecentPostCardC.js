import React from "react";
import "../styles/recentpostcardc.css";
import { Divider, CardActionArea, Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import moment from "moment";

export default function RecentPostCardC({ post }) {
  return (
    <Grid
      style={{
        marginTop: 32,
        marginBottom: 32,
      }}
      item>
      <Link
        to={`/post/${post._id}`}
        style={{ color: "inherit", textDecoration: "none" }}>
        <CardActionArea>
          <div className="recent_post_card_c_container">
            <img
              src={post.image}
              alt={post.title}
              className="recent_post_card_c_image"
            />
            <div className="recent_post_card_c_infos">
              <Typography variant="h5" className="recent_post_card_c_title">
                {post.title}
              </Typography>
              <Divider />
              <Typography
                style={{ textAlign: "right" }}
                variant="subtitle1"
                color="textSecondary">
                By: {post.writer_email}
              </Typography>
              <Typography
                style={{
                  padding: 20,
                }}
                variant="subtitle1"
                component="h3"
                paragraph>
                <p className="recent_post_card_c_content">{post.content}</p>
              </Typography>
              <Typography
                style={{ textAlign: "right" }}
                variant="subtitle1"
                color="textSecondary">
                {moment(post.createdAt).fromNow()}
              </Typography>
            </div>
          </div>
        </CardActionArea>
      </Link>
    </Grid>
  );
}
