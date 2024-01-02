import { styled } from "@mui/material";

export const StyledWrapper = styled("div")(() => ({
    margin: '0px',
    display: 'flex',
    justifyContent: 'space-between',
    minHeight: '82vh'
}));

export const NavWrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',

    alignItems: 'left',
}));

export const StyledLeftDrawerWrapper = styled("div")(() => ({
    width: '18%',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#2896fc',
    minHeight: '82vh',
    background: '#FFFFFF',
}))



const example = () => {
    
}

export default example;