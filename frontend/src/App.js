import React, { useEffect } from "react";
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
  const theme = React.useMemo(
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
  const defaultUserImage =
    "https://firebasestorage.googleapis.com/v0/b/jinaesiplatform.appspot.com/o/users-images%2Fyanni.png?alt=media&token=83c29b5b-18e9-49db-9331-acea6fe4d239";
  const ScrollToTop = withRouter(_ScrollToTop);
  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        storage
          .ref("users-images")
          .child(`${userAuth.email}.png`)
          .getDownloadURL()
          .then(onResolve, onReject);
        function onResolve(url) {
          getFromMDB(url);
        }
        function onReject(error) {
          console.log(error.message);
          getFromMDB(null);
        }
        const getFromMDB = (url) => {
          jinaesiplatform
            .getAllUsers(userAuth.email)
            .then((response) => {
              const _user = {
                email: userAuth.email,
                first_name: response.data.usersList[0]?.first_name,
                last_name: response.data.usersList[0]?.last_name,
                image: url ? url : defaultUserImage,
              };
              console.log("_user", _user);
              dispatch(login(_user));
            })
            .catch((e) => {
              console.log(e);
            });
        };
      } else {
        dispatch(logout());
        console.log("userAuth null");
      }
    });
    return unsubscribe;
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <Router>
          <ScrollToTop>
            {user ? (
              <Switch>
                <Route path="/module/:module_name" exact>
                  <ModuleP />
                </Route>
                <Route path="/pchat" exact>
                  <PersonalChatP />
                </Route>
                <Route path="/profile" exact>
                  <ProfileP />
                </Route>
                <Route path="/post/:_id" exact>
                  <PostP />
                </Route>
                <Route path="/my_posts" exact>
                  <MyPostsP />
                </Route>
                <Route path="/" exact>
                  <DashboardP />
                </Route>
                <Redirect to="/" />
              </Switch>
            ) : (
              <Switch>
                <Route path="/" exact>
                  <LoginP />
                </Route>
                <Redirect to="/" />
              </Switch>
            )}
          </ScrollToTop>
          <FooterC />
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
