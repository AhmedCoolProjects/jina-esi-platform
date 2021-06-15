import React from "react";
import "../styles/recentpostcardc.css";
import { Divider, CardActionArea, Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function RecentPostCardC({ post }) {
  return (
    <Grid
      style={{
        marginTop: 32,
        marginBottom: 32,
      }}
      item>
      <Link to="/post" style={{ color: "inherit", textDecoration: "none" }}>
        <CardActionArea className="recent_post_card_c_cardactionarea">
          <div className="recent_post_card_c_container">
            <img
              src={post.image}
              alt={post.title}
              className="recent_post_card_c_image"
            />
            <div className="recent_post_card_c_infos">
              <Typography variant="h5">{post.title}</Typography>
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
