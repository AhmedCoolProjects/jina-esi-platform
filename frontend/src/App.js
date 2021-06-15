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

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "dark",
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
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <Router>
          <ScrollToTop>
            <Switch>
              <Route path="/module" exact>
                <ModuleP />
              </Route>
              <Route path="/pchat" exact>
                <PersonalChatP />
              </Route>
              <Route path="/profile" exact>
                <ProfileP />
              </Route>
              <Route path="/post" exact>
                <PostP />
              </Route>
              <Route path="/my_posts" exact>
                <MyPostsP />
              </Route>
              <Route path="/" exact>
                {true ? <LoginP /> : <DashboardP />}
              </Route>
              <Redirect to="/" />
            </Switch>
          </ScrollToTop>
          <FooterC />
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
