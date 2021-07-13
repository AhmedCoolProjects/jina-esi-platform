import React, { useEffect, useMemo } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
  withRouter,
} from "react-router-dom";
import { useMediaQuery, CssBaseline } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import DashboardP from "./Pages/DashboardP";
import LoginP from "./Pages/LoginP";
import ModuleP from "./Pages/ModuleP";
import PersonalChatP from "./Pages/PersonalChatP";
import ProfileP from "./Pages/ProfileP";
import MyPostsP from "./Pages/MyPostsP";
import DocsP from "./Pages/DocsP";
import DocPdfP from "./Pages/DocPdfP";
import PostP from "./Pages/PostP";
import FooterC from "./Components/FooterC";
import "./base.css";
import firebaseAuth, { storage } from "./firebase/firebase";
import { yellow } from "@material-ui/core/colors";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./Redux/User";
import jinaesiplatform from "./Axios/jinaesiplatform";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "dark",
          secondary: yellow,
          primary: yellow,
        },
      }),
    [prefersDarkMode]
  );
  function _ScrollToTop(props) {
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
    return props.children;
  }
  const ScrollToTop = withRouter(_ScrollToTop);

  useEffect(() => {
    if (user !== null) return;
    const getIfUserLogedIn = () => {
      firebaseAuth.onAuthStateChanged((userAuth) => {
        if (userAuth) {
          storage
            .ref("users-images")
            .child(`${userAuth.email}.png`)
            .getDownloadURL()
            .then(async (url) => {
              await jinaesiplatform
                .getUserByEmail(userAuth.email)
                .then((response) => {
                  const _user = {
                    email: userAuth.email,
                    first_name: response.data[0].first_name,
                    last_name: response.data[0].last_name,
                    image: url,
                    _id: response.data[0]._id,
                  };
                  dispatch(login(_user));
                })
                .catch((e) => {
                  console.log(e);
                });
            });
        } else {
          dispatch(logout());
        }
      });
    };
    getIfUserLogedIn();
  }, [user, dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <Router>
          <ScrollToTop>
            {user === null ? (
              <Switch>
                <Route path="/" exact>
                  <LoginP />
                  <FooterC />
                </Route>
                <Redirect to="/" />
              </Switch>
            ) : (
              <Switch>
                <Route path="/module/:module_id" exact>
                  <ModuleP />
                  <FooterC />
                </Route>
                <Route path="/pchat" exact>
                  <PersonalChatP />
                </Route>
                <Route path="/profile" exact>
                  <ProfileP />
                  <FooterC />
                </Route>
                <Route path="/post/:_id" exact>
                  <PostP />
                  <FooterC />
                </Route>
                <Route path="/docs/:module_id" exact>
                  <DocsP />
                  <FooterC />
                </Route>
                <Route path="/document/:pdf_link" exact>
                  <DocPdfP />
                </Route>
                <Route path="/my_posts" exact>
                  <MyPostsP />
                  <FooterC />
                </Route>
                <Route path="/" exact>
                  <DashboardP />
                  <FooterC />
                </Route>
                <Redirect to="/" />
              </Switch>
            )}
          </ScrollToTop>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
