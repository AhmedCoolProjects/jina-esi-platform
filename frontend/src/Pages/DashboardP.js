import React, { Fragment, useState, useEffect } from "react";
import { Container, Grid } from "@material-ui/core";
import BigBgC from "../Components/BigBgC";
import TopNavbarC from "../Components/TopNavbarC";
import RecentPostsC from "../Components/RecentPostsC";
import JinaEPDataService from "../Axios/jinaesiplatform";

const bigBgC = {
  title: "Study With Love",
  description: "Get Everything You Need In One Place.",
  description2:
    "you can find all old/new documents and links available all the time on this platform",
  image: "https://www.np6.com/wp-content/uploads/2017/03/Data-Science.jpg",
  imgText: "main image description",
  linkText: "Contact Us…",
};

export default function DashboardP() {
  const [recentPosts, setRecentPosts] = useState(null);
  useEffect(() => {
    const retrieveRecentPosts = () => {
      JinaEPDataService.getLastPosts()
        .then((res) => {
          setRecentPosts(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    retrieveRecentPosts();
  }, []);

  return (
    <Fragment>
      <Container maxWidth="lg">
        <TopNavbarC />
        <main>
          <BigBgC post={bigBgC} />
          <Grid container spacing={5} style={{ marginTop: 24 }}>
            <RecentPostsC posts={recentPosts} />
          </Grid>
        </main>
      </Container>
    </Fragment>
  );
}
