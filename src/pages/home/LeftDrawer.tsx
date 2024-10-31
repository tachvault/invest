"use client"

// Importing the core React library
import * as React from "react";
// Importing the React hook for managing component state
import { useState } from "react";
// Imports Material-UI provided utility to make styled components
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
// Imports Material-UI component for creating a versatile layout container
import Box from "@mui/material/Box";
// Imports the Material-UI component for the drawer
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HomeContent from "@/components/DrawerContent/HomeContent";
import PortfoliosContent from "@/components/DrawerContent/PortfoliosContent";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Logout from "@mui/icons-material/Logout";
import Image from "next/image";
import Head from 'next/head'
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const drawerWidth = 230;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const Header = styled("div")(({ theme }) => ({
  backgroundColor: "#fff",
  padding: "10px",
  display: "flex",
  justifyContent: "flex-end",
  borderBottom: "1.1px solid #dcdcde",
  marginBottom: "30px",
  width: "100%",
}));

const closedMixin = (theme: Theme, open: boolean): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,

  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: 0,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  padding: 0,
  margin: 0,
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function LeftDrawer() {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [name, setName] = useState('');

  const [open, setOpen] = React.useState(true);
  const [selectedContent, setSelectedContent] = useState("Home");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const router = useRouter();
  
  const {tab} = router.query;
  React.useEffect(()=>{
    console.log('tah', tab);
    if(tab){
      handleContentChange(tab ==='Portfolios' ? 'Portfolios' : 'Home')
    }
  }, [tab])

  const handleContentChange = (content) => {
    setSelectedContent(content);
    console.log(content, 'content');
    router.push({pathname: router.pathname, query: { ...router.query, tab: content === 'Portfolios' ? 'Portfolios' : 'Home' } })
  };
  const handleCloseMenu = () => {};
  const {currentUser} = useSelector((state)=>state.auth);
  var firstName = currentUser.firstName
  React.useEffect(()=>{
    if (typeof window !== 'undefined'){
      firstName = localStorage.getItem('firstname');
      setName(firstName);
    }
    console.log(firstName, 'firstName')
  }, [])
 
  return (
    <Box sx={{ display: "flex", width: '100%', padding: '0px 60px 0px 0px ' }}>
       <Head>
        <title>TachVault Inc. - High performance real-time pricing engine for derivative products</title>
        <meta name="description" content="High performance real-time pricing engine for derivative products" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/faviconTechVault.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
        <link href="https://fonts.googleapis.com/css2?family=Pathway+Gothic+One&display=swap" rel="stylesheet"/>
      </Head>
      <Drawer variant="permanent" open={open}>
        <IconButton
          color="#1e1e1e"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          sx={{
            backgroundColor: "#1e1e1e !important",
            borderRadius: "0px",
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon sx={{ color: "#fff", background: "#1e1e1e" }} />
        </IconButton>

        {false ? (
          <DrawerHeader sx={{ background: "#1e1e1e" }}>
            <IconButton onClick={handleDrawerClose} sx={{ color: "#FFFFFF" }}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
        ) : (
          <></>
        )}

        <List sx={{ backgroundColor: "#1e1e1e", height: "900px" }}>
          {["Home", "Portfolios"].map((text, index) => (
            <ListItem
              key={text}
              disablePadding
              sx={{
                display: "block",
                backgroundColor:
                  text === selectedContent ? "#1f2f42" : "#1e1e1e",
              }}
              onClick={() => handleContentChange(text)}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  color: text === selectedContent ? "#FFFFFF" : "#FFFFFF",
                  backgroundColor:
                    text === selectedContent ? "#1f2f42" : "transparent",
                  borderLeft:
                    text === selectedContent
                      ? "4px solid #0077cf"
                      : "4px solid transparent",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 1 : "auto",
                    justifyContent: "center",
                    color: "#FFFFFF",
                  }}
                >
                  {index % 2 === 0 ? <HomeOutlinedIcon /> : <WorkOutlineIcon />}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={{
                    opacity: open ? 1 : 0,
                    color: text === selectedContent ? "#FFFFFF" : "#FFFFFF",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box
        sx={{
          flex: 1,
          transition: "width 0.3s",
          width: open ? `calc(100% - ${drawerWidth}px)` : "100%", // Adjust the width
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image src="/tachVaultlogo.png" alt="logo" width={100} height={50} style={{margin: '0px auto 0px 20px'}}/>
          <b style={{color: 'grey'}}>Invest with confidence</b>
          <div style={{margin:'auto 0px auto auto '}}>
            <IconButton onClick={handleClick} size="small">
              <Avatar sx={{ width: 32, height: 32 }}>{name ? name?.charAt(0).toUpperCase() : ''} </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={()=>{localStorage.setItem('isLoggedIn', false);localStorage.removeItem('auth_token'); window.location.assign('/auth/login');handleClose()}}>
                <ListItemIcon >
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </div>
         
        </div>
        <Header />
        <div>
          <div style={{ marginLeft: "50px" }}>
            {selectedContent === "Home" && <HomeContent />}
            {selectedContent === "Portfolios" && <PortfoliosContent />}
          </div>
        </div>
      </Box>
    </Box>
  );
}
