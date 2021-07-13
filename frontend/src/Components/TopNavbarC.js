import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import {
  Button,
  IconButton,
  Typography,
  Toolbar,
  Menu,
  MenuItem,
  ListItemIcon,
  Fade,
} from "@material-ui/core";
import {
  AccountCircleOutlined,
  FavoriteBorderOutlined,
  BookOutlined,
  ChatBubbleOutlineOutlined,
  ExitToAppOutlined,
} from "@material-ui/icons";
import "../styles/topnavbarc.css";
import firebaseAuth from "../firebase/firebase";
import JinaEPDataService from "../Axios/jinaesiplatform";

const menuContents = [
  {
    title: "My Profile",
    link: "/profile",
    icon: <AccountCircleOutlined fontSize="small" />,
  },
  {
    title: "My Posts",
    link: "/my_posts",
    icon: <BookOutlined fontSize="small" />,
  },
  {
    title: "My Favorites",
    link: "/my_favorites",
    icon: <FavoriteBorderOutlined fontSize="small" />,
  },
  {
    title: "Personal Chat",
    link: "/pchat",
    icon: <ChatBubbleOutlineOutlined fontSize="small" />,
  },
];

export default function TopNavbarC() {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [sections, setSections] = useState([]);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const handleLogoutFct = () => {
    handleMobileMenuClose();
    firebaseAuth.signOut();
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const renderMobileMenu = (
    <Menu
      id="fade-menu"
      anchorEl={mobileMoreAnchorEl}
      keepMounted
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      TransitionComponent={Fade}>
      {menuContents.map((item) => (
        <Link
          key={item.title}
          to={item.link}
          style={{ color: "inherit", textDecoration: "none" }}>
          <MenuItem onClick={handleMobileMenuClose}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            {item.title}
          </MenuItem>
        </Link>
      ))}
      <MenuItem onClick={handleLogoutFct}>
        <ListItemIcon>
          <ExitToAppOutlined fontSize="small" />
        </ListItemIcon>
        Log Out
      </MenuItem>
    </Menu>
  );
  useEffect(() => {
    async function getAllModules() {
      await JinaEPDataService.getAllModules().then((res) => {
        setSections(res.data);
      });
    }
    getAllModules();
  }, []);
  return (
    <Fragment>
      <Toolbar className="first_toolbar_disktop">
        <Button size="small">about</Button>
        <Typography
          variant="h5"
          color="inherit"
          align="center"
          style={{
            flex: 1,
          }}>
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            Jina ESI Platform
          </Link>
        </Typography>
        <IconButton
          aria-controls="fade-menu"
          aria-haspopup="true"
          onClick={handleMobileMenuOpen}>
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
      {renderMobileMenu}
      <Toolbar className="first_toolbar_mobile">
        <Typography
          variant="h5"
          color="inherit"
          align="center"
          style={{
            flex: 1,
          }}>
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            Jina ESI Platform
          </Link>
        </Typography>
        <IconButton
          aria-controls="fade-menu"
          aria-haspopup="true"
          onClick={handleMobileMenuOpen}>
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
      <Toolbar component="nav" variant="dense" className="second_toolbar">
        {sections &&
          sections.map((section) => (
            <Link
              style={{ color: "inherit", textDecoration: "none" }}
              key={section._id}
              className="toolbar_link"
              to={{
                pathname: `/module/${section._id}`,
                moduleData: {
                  module_name: section.name,
                  profId: section.profId,
                },
              }}>
              {section.name}
            </Link>
          ))}
      </Toolbar>
    </Fragment>
  );
}
