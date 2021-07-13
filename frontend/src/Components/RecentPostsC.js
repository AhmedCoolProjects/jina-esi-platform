import React from "react";
import RecentPostCardC from "../Components/RecentPostCardC";
import { Divider, Typography, Grid } from "@material-ui/core";

export default function RecentPostsC({ posts }) {
  return (
    <Grid item xs={12} md={8}>
      <Typography variant="h6" gutterBottom>
        Recent Posts
      </Typography>
      <Divider />
      {posts &&
        posts.map((post) => <RecentPostCardC post={post} key={post._id} />)}
    </Grid>
  );
}
