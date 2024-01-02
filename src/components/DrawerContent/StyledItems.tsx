import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';


export const Search = styled('div')(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    paddingTop: '50px',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        width: 'auto',
    },
}));


export const StyledTitle = styled('h1')(() => ({
    fontSize: '32px',
    fontWeight: 600,
    color: '#1e1e1e',
    marginBottom: '5px',
    width: '100%'
}));

export const HomeCardBotton = styled('div')(() => ({
    marginTop: '30px',
    backgroundColor: '#f2f2f2',
    padding: '20px 10px 20px 10px'
}));


export const StyledPriceText = styled('div')(({ color = '#1e1e1e' }) => ({
    color: color,
    textAlign: "end"
}));


export const PortfolioSectionHeader = styled('div')(() => ({
    backgroundColor: '#f2f2f2'
}))

export const TopPortfolioSection = styled('div')(() => ({
}));


export const CenterFlexDiv = styled('div')(({ display = 'flex' }) => ({
    display: display,
    justifyContent: 'center',
    alignItems: 'center'
}))


export const StyledHeading = styled('h1')(({ paddingTop = '30px', paddingBottom = '10px' }) => ({
    fontWeight: 600,
    fontSize: '16px',
    color: '#5E5E5E',
    paddingTop: paddingTop,
    paddingBottom: paddingBottom
}));

export const HomeRightSectionContainer = styled('div')(() => ({
    padding: '15px 20px'
}));

export const FlexCards = styled('div')(() => ({
    display: 'flex',
    justifyContent: 'space-between'
}))

export const HoldingsDetailContainer = styled('div')(() => ({
    marginTop: "80px"
}))

export const HoldingsDetailWrapper = styled('div')(() => ({
    background: "#F5F5F5",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
}))

export const PortfolioNameText = styled('p')(() => ({
    fontSize: 14,
    backgroundColor: "#F2F2F2",
    padding: "2px 8px",
    borderRadius: "6px",
}))

export const EmptyPortfolioText = styled('div')(({ marginTop = '100px' }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: marginTop,
}))

export const StyledStockNumbers = styled('div')(() => ({
    fontSize: '13px',
    marginBottom: '15px',
    color: '#5E5E5E'
}));

export const StyledHoldingsDetailWrapper = styled('div')(() => ({
    display: "flex",
    flexDirection: "column",
    color: "#1e1e1e",
    textAlign: "end",
}));

export const StyledName = styled('h1')(({ fontWeight = '600' }) => ({
    fontSize: '16px',
    padding: '0px 10px',
    color: '1E1E1E',
    fontWeight: fontWeight,
}));

export const IconContainer = styled('div')(() => ({
    backgroundColor: '#f2f2f2',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '5px'
}));

export const PortfolioNameContainer = styled('div')(({justify='space-between'}) => ({
    display: 'flex',
    width: '100%',
    justifyContent: justify
}));

export const HomeFlexCards = styled('div')(({ theme }) => ({
    paddingTop: '40px',
    paddingLeft: '60px',
    width: '70%',
    paddingRight: '40px'
}));

export const HomeRightSection = styled('div')(({ theme }) => ({
    marginLeft: '16px',
    border: '1px solid #ccc',
    marginTop: '40px',
    width: '350px',
    borderRadius: '6px',
    minHeight: '100%'
}));

export const StyledText = styled('p')(() => ({
    fontSize: '16px',
    color: '1e1e1e',
    fontWeight: 600,
    marginTop: '0px !important'
}));

export const StyledHelp = styled('p')(() => ({
    fontSize: '14px',
    color: '5e5e5e',
    marginTop: '0px !important',
}));

export const PortfolioHeaderButton = styled('div')(({ backgroundColor = '#333333', color = '#fff', border = '1px solid #333333' }) => ({
    cursor: 'pointer',
    backgroundColor: backgroundColor,
    color: color,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '16px',
    padding: '8px 13px',
    borderRadius: '6px',
    marginRight: '10px',
    border: border

}));

export const CreateButton = styled('div')(() => ({
    cursor: 'pointer',
    color: '#1f55a5'
}));


export const PortfolioSectionHeaderContainer = styled('div')(() => ({
    padding: "16px"
}));

export const StockListFormContainer = styled('div')(() => ({
    border: "1px solid #ccc",
    width: "98%",
    flexDirection: "column",
    display: "flex",
    justifyContent: "space-between",
    background: "#F5F5F5",
    padding: "8px 5px 0px 5px",
    margin: "5px 0px",
    maxHeight:'500px',
    overflow: 'scroll'
}));

export const StockListFormWrapper = styled('div')(() => ({
    display: "flex",
    justifyContent: "space-between",
    height: "20px",
}));


export const AddTransactionFormContainer = styled('div')(() => ({
    padding: "10px",
    textAlign: "left"
}));

export const AddAnotherTransactionButton = styled('div')(() => ({
    marginTop: "10px",
    borderRadius: "6px"
}));

export const TransactionDiv = styled('div')(() => ({
    display: "flex",
    justifyContent: "space-between",
    marginTop: "2px",
    height: "20px",
}));

export const ModalButtonContainer = styled('div')(() => ({
    bottom: '20px',
    position: 'absolute',
    display: 'flex',
    justifyContent: 'space-between',
    width: '92%'
}));


export const StyledModal = styled('div')(() => ({
    padding: "20px",
    border: "1px solid #ccc"
}));

export const HoldingPriceText = styled('p')(() => ({
    color: '#1E1E1E',
    marginTop: '0px'
}));

export const HoldingPriceTextTwo = styled('p')(() => ({
    color: '#00741D',
    fontWeight: 700,
    marginTop: '0px'
}));


export const Label = styled('p')(({ theme }) => ({
    marignTop: '50px !important',
    marginBottom: '10px',
    fontSize: '14px',
    fontWeight: 600,
}));

export const StyledInput = styled('input')(() => ({
    border: 'none',
    borderBottom: '1px solid #1e1e1e !important',
    backgroundColor: '#e5e5e5',
    height: '30px',
    width: '100%',
    marginBottom: '10px'
}));

export const FlexDiv = styled('div')(({ justifyContent = "space-between", alignItems = 'center' }) => ({
    display: 'flex',
    alignItems: alignItems,
    justifyContent: justifyContent,
}))


export const SearchDiv = styled('div')(() => ({
    borderRadius: "50px",
    width: "95%",
    paddingLeft: "60px"
}))


export const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

export const FlexItems = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-betweeen',
}))

export const PortfolioListContainer = styled('div')(() => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '10px'
}));

export const SearchInput = styled('input')(() => ({
    color: '#5E5E5E',
    width: '100%',
    fontSize: '16px',
    backgroundColor: '#E5E5E5',
    border: 'none',

    '&:focus': {
        outline: 'none',
    },
}));

export const SearchInputWrapper = styled('div')(() => ({
    backgroundColor: '#E5E5E5',
    borderRadius: '24px',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    padding: '5px'
}));

export const CreateStyleText = styled('p')(() => ({
    color: '#006fba',
    fontSize: '16px',
    cursor: 'pointer'
}));


export const DivWrapper = styled('div')(() => ({
    display: "flex",
    justifyContent: "center",
    flexDirection: 'column',
    margin: 'auto'
}));

export const PortfolioDivWrapper = styled('div')(({ backgroundColor = '#fff', border = '1px solid #ccc', padding = '15px 50px' }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '800px',
    border: border,
    padding: padding,
    borderRadius: '6px',
    backgroundColor: backgroundColor,
}));

export const StyledButton = styled('div')(() => ({
    backgroundColor: '#0077cf',
    padding: '4px 16px',
    color: '#fff',
    borderRadius: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 400,
    cursor: 'pointer',
    border: '1px solid #0077cf'
}));

export const PorfolioStyledButton = styled('div')(() => ({
    backgroundColor: '#fff',
    padding: '4px 16px',
    color: '#5E5E5E',
    borderRadius: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 400,
    cursor: 'pointer',
    border: '1px solid #5E5E5E',
    marginBottom: '5px'
}));

export const StyledButtonTwo = styled('div')(() => ({
    padding: '4px 16px',
    color: '#1e1e1e',
    borderRadius: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 400,
    cursor: 'pointer !important',
    border: '1px solid #1e1e1e',

}));



export const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        borderRadius: '20px',
        width: '100%',
        border: '0.1px solid #E5E5E5',
        background: '#E5E5E5',
        [theme.breakpoints.up('md')]: {
            width: '1100px',
        },
    },
}));




export const FundsWrapper = styled('div')(() => {
    return {
        display: 'flex',
        width: '100%',
        margin: '10px 0px',
        overflow: 'scroll',
        height: '350px',
        boxShadow: '5px 10px 15px -3px rgba(0,0,0,0.1)',
        border: '1px solid #F2F2F2',
        flexDirection: 'column'
    }
})

export const FundsComponent = styled('div')(() => {
    return {
        display: 'flex',
        height: '35px',
        padding: '0px 10px',
        flexDirection: 'column'

    }
})