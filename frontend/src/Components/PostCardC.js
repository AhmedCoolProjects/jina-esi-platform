import React from "react";
import "../styles/postcardc.css";
import { Link } from "react-router-dom";
import { Divider, CardActionArea, Grid, Typography } from "@material-ui/core";
function PostCardC({ post }) {
  return (
    <Grid xs={12} sm={6} md={4} item>
      <Link to="/post" style={{ color: "inherit", textDecoration: "none" }}>
        <CardActionArea>
          <div className="postcardc_container">
            <img
              src={post.image}
              alt={post.title}
              className="postcardc_image"
            />
            <div className="postcardc_infos">
              <Typography noWrap variant="h5">
                {post.title}
              </Typography>
              <Divider />
              <Typography
                style={{ textAlign: "right" }}
                variant="subtitle1"
                color="textSecondary">
                By: {post.owner}
              </Typography>
              <Typography
                style={{
                  padding: 20,
                }}
                variant="subtitle1"
                paragraph>
                {post.description}
              </Typography>
              <Typography
                style={{ textAlign: "right" }}
                variant="subtitle1"
                color="textSecondary">
                {post.date}
              </Typography>
            </div>
          </div>
        </CardActionArea>
      </Link>
    </Grid>
  );
}

export default PostCardC;
