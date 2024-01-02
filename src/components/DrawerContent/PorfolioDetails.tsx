import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import {
  StyledTitle,
  FlexItems,
  PorfolioStyledButton,
  PortfolioListContainer,
  PortfolioDivWrapper,
  PortfolioNameContainer,
  StyledName,
  StyledHeading,
  StyledPriceText,
  DivWrapper
} from "./StyledItems";
import AddIcon from "@mui/icons-material/Add";
import CreateStockAndFundForm from "./CreateStockAndFundForm";
import Divider from "@mui/material/Divider";
import Image from "next/image";
import HoldingTable from "@/components/DrawerContent/HoldingTable";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const StyledTab = styled(Tab)`
  color: #5e5e5e;
  font-size: 16px;
  font-weight: 500;
  text-transform: capitalize;
`;



function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

// Function to provide accessibility props for tabs
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

// PorfolioDetails component for displaying portfolio details
export default function PorfolioDetails({ portfolioId, data }) {
  console.log(portfolioId, data, 'id');
  const [value, setValue] = React.useState(0);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // Function to handle tab change
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // Find the selected portfolio using the provided `portfolioId`
  const selectedPortfolio = data.find(
    (portfolio) => {console.log(portfolio?.id === portfolioId) ; return portfolio?.id === portfolioId;}
  );
  console.log(selectedPortfolio, 'selectedPortfolio');
  // Get the portfolio name or display "No Portfolio Selected"
  const portfolioName = selectedPortfolio
    ? selectedPortfolio.name
    : "No Portfolio Selected"; // Handle the case when no portfolio is selected
  
  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Calculate the total price of holdings
  const totalPrice = selectedPortfolio?.stocks?.reduce((total, transaction) => total + parseFloat(transaction.price), 0) | 0;
  // Get the stock name or an empty string
  console.log(selectedPortfolio?.stocks?.length  ? selectedPortfolio?.stocks : 0, 'data[portfolioId]?.stocks[0][0]');
  const stockName = selectedPortfolio?.stocks?.length  ? selectedPortfolio?.stocks[0]?.name : '';
  const { dayChange, dayPercent } = (selectedPortfolio?.stocks || []).reduce(
    (acc, stock, index) => {
      if (index > 0) {
        const todayPrice = parseFloat(stock.regularMarketPrice?.fmt) || 0;
        const yesterdayPrice = parseFloat(selectedPortfolio?.stocks[index - 1].postMarketPrice?.fmt) || 0;
  
        const changeValue = todayPrice - yesterdayPrice;
        const changePercent = yesterdayPrice ? ((changeValue / yesterdayPrice) * 100).toFixed(2) : 0;
  
        acc.dayChange += changeValue;
        acc.dayPercent += parseFloat(changePercent);
  
        // Additional calculation for post-market
        const postMarketPrice = parseFloat(stock.postMarketPrice?.fmt) || 0;
        const postMarketYesterdayPrice = parseFloat(selectedPortfolio?.stocks[index - 1].postMarketPrice?.fmt) || 0;
  
        const postMarketChangeValue = postMarketPrice - postMarketYesterdayPrice;
        acc.postMarketChangeValue = postMarketChangeValue;
      }
  
      return acc;
    },
    { dayChange: 0, dayPercent: 0, postMarketChangeValue: 0 }
  );
  console.log(dayChange, dayPercent, 'dayChange, dayPercent');
  return (
    <>
      <div>
        <FlexItems style={{ alignItems: "center" }}>
          <StyledTitle>{portfolioName}</StyledTitle>
          {data[portfolioId]?.stocks? <PorfolioStyledButton
            style={{ width: "210px", marginTop: "10px" }}
            onClick={openModal}
          >
            <AddIcon sx={{ fontSize: "20px", paddingRight: "10px" }} /> Add
            Stock & Fund
          </PorfolioStyledButton> : <></>}

          <CreateStockAndFundForm open={isModalOpen} onClose={closeModal} portfolio={selectedPortfolio}/>
        </FlexItems>
      </div>

      {selectedPortfolio?.stocks?.length ? (
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <StyledTab label="Overview" {...a11yProps(0)} />
              <StyledTab label="Holdings" {...a11yProps(1)} />
              <StyledTab label="Risk Analysis" {...a11yProps(2)} />
              <StyledTab label="Performance" {...a11yProps(3)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <StyledHeading>Mutual Stock & Funds</StyledHeading>
            <PortfolioListContainer>
              <PortfolioDivWrapper>
                <PortfolioNameContainer>
                  <div>
                    <StyledName sx={{ ml: 1, mt: 0 }}>{stockName}</StyledName>
                    <StyledName sx={{ ml: 0, mt: -1, mb: 0 }} fontWeight="500">
                      {selectedPortfolio?.stocks?.length} holding
                    </StyledName>
                    <StyledName style={{marginTop:'10px', fontSize: '13px', color: 'grey', width:'250px'}} fontWeight="400">
                      {selectedPortfolio?.stocks?.length ? selectedPortfolio?.stocks[0]?.industry : ''}, {selectedPortfolio?.stocks?.length ? selectedPortfolio?.stocks[0]?.sector : ''} 
                    </StyledName>
                  </div>
                </PortfolioNameContainer>
                <div style={{width: '200px'}}>
                  <StyledPriceText>
                  ${totalPrice}
                  </StyledPriceText>
                  <StyledPriceText color="#ca0000">
                   <span  style={{
                            color:
                              dayChange > 0
                                ? "green"
                                : dayChange < 0
                                  ? "red"
                                  : "#333",
                          }}>${parseFloat(dayChange).toFixed(2)}  ({dayPercent}%)</span> 
                  </StyledPriceText>
                </div>
              </PortfolioDivWrapper>
            </PortfolioListContainer>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <HoldingTable  stocks={selectedPortfolio?.stocks?.length ? selectedPortfolio?.stocks : []}/>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}></CustomTabPanel>
          <CustomTabPanel value={value} index={3}></CustomTabPanel>
        </Box>
      ) : (
        <Box>
          <Divider />
          
          <DivWrapper>
          <Image src="/addIcon.png" alt="logo" width={200} height={170}  style={{margin: 'auto auto', cursor: 'pointer'}} onClick={openModal}/>
            <PorfolioStyledButton
              onClick={openModal}
              style={{
                margin: "20px auto 50px auto",
                backgroundColor: "#0077cf",
                color: "#fff",
              }}
            >
                
              <AddIcon sx={{ fontSize: "20px", paddingRight: "10px" }} /> Add
              Stock & Fund
            </PorfolioStyledButton>
          </DivWrapper>
        </Box>
      )}
    </>
  );
}
