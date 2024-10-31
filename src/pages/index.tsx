import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getUser } from '@/store/authSlice';
import Search from "@/components/DrawerContent/SearchComponent";
import {SearchDiv} from "@/components/DrawerContent/StyledItems"
import { Avatar, Button, IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import { Logout } from '@mui/icons-material';
import Image from "next/image";
import Head from 'next/head'
import React from 'react';
import Box from "@mui/material/Box";
import {styled} from "@mui/material";
import { useRouter } from 'next/router';

const Header = styled("div")(({ theme }) => ({ // attributes for the header of the homepage
  backgroundColor: "#fff",
  padding: "10px",
  display: "flex",
  justifyContent: "flex-end",
  borderBottom: "1.1px solid #dcdcde",
  marginBottom: "30px",
  width: "100%",
}));
export default function Home() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showLogin, setShowLogin] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => { // (for me) used for fetching data or initiating subscriptions
    if(typeof window !== undefined){ // checks if user needs to login based on whether auth_token is in localStorage and if window exists
      setShowLogin(!localStorage.getItem('auth_token')) //if user needs to login, then showLogin sets to the true 
      if (localStorage.getItem('email')) {
        dispatch(getUser())
      }
    }
    if (typeof window !== 'undefined' && localStorage.getItem('auth_token')  && router.pathname !== '/auth/login') { // // ensuring correct authentication state by redirection to home page if auth_token is found in the "localStorage" and current router path isn't /auth/login
      router.push('/home/'); 
    }

  }, [])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); // ensuring whatever is being clicked is in the correct location
  };
  return ( 
  /* if nothing has been collected, rendering the page's main content area 
  or other parts of the document (within the body of Home) */
    <>
      <Head>  
        <title>TachVault Inc. - High performance real-time pricing engine for derivative products</title> 
        <meta name="description" content="High performance real-time pricing engine for derivative products" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/faviconTechVault.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Pathway+Gothic+One&display=swap" rel="stylesheet" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Teko:wght@300;400;600;700&display=swap"
        />
      </Head>
      <main> 
      <SearchDiv style={{padding: '10px 25px'}}>
      <Box
        sx={{
          flex: 1,
          transition: "width 0.3s",
          // width: open ? `calc(100% - ${250}px)` : "100%", // Adjust the width
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
            {showLogin ? <Button variant='outlined' onClick={()=>{router.push('/auth/login')}}>Login</Button> : <></>}
           
          </div>
         
        </div>
        <Header />
        {/* <div>
          <div style={{ marginLeft: "50px" }}>
            {selectedContent === "Home" && <HomeContent />}
            {selectedContent === "Portfolios" && <PortfoliosContent />}
          </div>
        </div> */}
      </Box>
        <Search />
      </SearchDiv>
      </main>
    </>
  )
}
