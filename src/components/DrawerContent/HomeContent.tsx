import SearchIcon from "@mui/icons-material/Search";
import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import { useDispatch, useSelector } from "react-redux";
import {
  StyledHeading,
  HomeFlexCards,
  FlexCards,
  FlexDiv,
  HomeRightSection,
  StyledStockNumbers,
  HomeRightSectionContainer,
  PortfolioNameContainer,
  IconContainer,
  CenterFlexDiv,
  StyledName,
  SearchDiv,
  PortfolioNameText,
  HoldingsDetailContainer,
  HoldingsDetailWrapper,
  EmptyPortfolioText,
  StyledHoldingsDetailWrapper
} from "./StyledItems";
import Search from "./SearchComponent";
import Head from "next/head";
import { getSymbolData } from "@/components/DrawerContent/SearchComponent";
import { getPortfolio, getUser, setUser } from "@/store/authSlice";
import { useRouter } from "next/router";
import { getUserPortfolio, setPorfolios } from "@/store/stock";

function getTotalHolding(stocks){
  console.log(stocks, '00stocks');
  if(!stocks){return 0.00};
  return  stocks.reduce(
    (total, stock) => {
      const price = parseFloat(stock.price);
      const regularMarketPrice = parseFloat(stock.regularMarketPrice?.fmt);
      const shares = parseFloat(stock.shares);

      console.log(total, price, regularMarketPrice, shares, 'stock values');
      console.log(total + (price - (regularMarketPrice * shares)), 'total');
      if (isNaN(price) || isNaN(regularMarketPrice) || isNaN(shares)) {
        console.error('Invalid values for stock:', stock);
        return total; // Skip this stock if any of the values are not valid numbers
      }

      return parseFloat(total + (regularMarketPrice * shares)).toFixed(2);
    },
    0
  );
}

function getTotalChange(stocks){
  console.log(stocks, '00stocks');
  if(!stocks){return 0.00}
  return  stocks.reduce(
    (total, stock) => {
      const price = parseFloat(stock.price);
      const regularMarketPrice = parseFloat(stock.regularMarketPrice?.fmt);
      const regularMarketChange = parseFloat(stock.regularMarketChangePercent?.fmt);
      const shares = parseFloat(stock.shares);

      console.log(total, price, regularMarketPrice, shares, 'stock values');
      console.log(total + (price - (regularMarketPrice * shares)), 'total');
      if (isNaN(price) || isNaN(regularMarketPrice) || isNaN(shares)) {
        console.error('Invalid values for stock:', stock);
        return total; // Skip this stock if any of the values are not valid numbers
      }

      return parseFloat(regularMarketChange);
    },
    0
  );
}

// Function to retrieve live price data for a symbol
const getChange = async (symbol) => {
  const res = await getSymbolData(symbol);
  return res;
};

// HomeContent component for displaying portfolio and stock information
const HomeContent = () => {
  const [loading, setLoading] = useState(false);


  const [data, setData] = useState([]);

  const dispatch = useDispatch();
  const { portfolios } = useSelector((state) => state.stock);

  // useEffect to fetch live prices and update data
  useEffect(() => {
    console.log(portfolios, 'portfolios');
    const fetchLivePrices = async () => {
      setLoading(true);

      const updatedData = [];
      let totalHolding = 0;
      let totalChange = 0;
      let currentStatus = "No Change";
      console.log(portfolios, 'port0003')
      for (const portfolio of portfolios) {
        console.log(portfolio, 'portfolio 00')
        const updatedPortfolio = {
          ...portfolio,
          stocks: (portfolio.stocks || []).map(async (stock) => {
            const response = await getChange(stock.symbol);
            console.log(response, 'response 00')
            console.log(response ,'response 00',
              response.regularMarketPrice,
              response.regularMarketPrice.fmt)
            if (
              response &&
              response.postMarketPrice &&
              response.postMarketPrice?.fmt
            ) {
              const postMarketPrice = parseFloat(
                response.postMarketPrice?.fmt
              );
              console.log(stock.price, postMarketPrice * stock.shares, '00 stock.price - postMarketPrice * stock.shares;');
              const x = stock.price - postMarketPrice * stock.shares;
              console.log(x, '00 stock.price')
              return {
                ...stock,
                postMarketPrice: postMarketPrice,
                profitOrLossVal: parseFloat(x).toFixed(2),
                profitOrLoss: x > 0 ? 'Profit' : x < 0 ? 'Loss' : 'No Change',
              };
            } else {
              return { ...stock, profitOrLoss: "N/A" };
            }
          }),
        };
        console.log(updatedPortfolio, '00 stocks q');
        const totalHolding = updatedPortfolio.stocks.reduce(
          (total, stock) => {console.log(total, stock, '00 x12');total + parseFloat(stock.postMarketPrice)},
          0
        );
        console.error(totalHolding, 'holding');
        const totalChange = updatedPortfolio.stocks.reduce(
          (total, stock) =>
            total + (stock.profitOrLossVal ? parseFloat(stock.profitOrLossVal) : 0),
          0
        );
      
        updatedPortfolio.totalHolding = totalHolding?.toFixed(2);
        updatedPortfolio.totalChange = (totalHolding - totalChange).toFixed(2);
        updatedPortfolio.currentStatus =
          updatedPortfolio.totalChange > 0
            ? "Profit"
            : updatedPortfolio.totalChange < 0
            ? "Loss"
            : "No Change";
      
        console.log(updatedPortfolio, updatedPortfolio?.stocks?.length, 'updated001 there');
      }
      
      
      dispatch(setPorfolios(updatedData));
      setData(updatedData);
    };
    fetchLivePrices();
  }, []);
  useEffect(()=>{
    if(localStorage.getItem('email')){
      // dispatch(getPortfolio(localStorage.getItem('email')))
      dispatch(getUserPortfolio())
      dispatch(getUser())
    }
  }, [portfolios.length])
  console.log(data, "data");

  const router = useRouter();

  // Function to handle card click and navigate to portfolio details
  const handleCardClick = (item) => {
    console.log(item, "click", item.id);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, ...{ tab: 'Portfolios', portfolioId: item.id } },
    })

  };



  return (
    <div>

      <Head>
        TachVault Inc. - High performance real-time pricing engine for
        derivative products
      </Head>

      <SearchDiv>
        <Search />
      </SearchDiv>

      {portfolios?.length ? <FlexCards>
        <HomeFlexCards>
          {portfolios.length ? (
            <><Divider style={{ width: "640px !important" }} /></>
          ) : (
            <> </>
          )}
          <StyledHeading paddingTop={'0px'}>Portfolio Updates</StyledHeading>
          {portfolios.length ? (
            <> </>
          ) : (
            <EmptyPortfolioText>
              No portfolios added
            </EmptyPortfolioText>
          )}

          <FlexCards style={{ justifyContent: 'flex-start' }}>
            {portfolios.map((portfolio) => (
              <Card
                key={portfolio?.id}
                sx={{
                  cursor: "pointer",
                  minWidth: 230,
                  boxShadow: "none",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  minHeight: 200,
                  ml: 1,
                }}
                onClick={() => handleCardClick(portfolio)}
              >
                <CardContent>
                  <FlexDiv>
                    <PortfolioNameText
                      color="text.secondary"
                    >
                      {portfolio?.name}
                    </PortfolioNameText>
                    <PortfolioNameText
                      color="text.secondary"
                    >
                      {portfolio?.stocks ? portfolio?.stocks[0]?.exchange : ''}
                    </PortfolioNameText>
                  </FlexDiv>
                  
                  <HoldingsDetailContainer>
                    <HoldingsDetailWrapper>
                      <div style={{ fontSize: "14px", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>Holdings Value</span>  ${portfolio?.stocks? getTotalHolding(portfolio?.stocks) : 0}
                      </div>
                      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontSize: "14px", margin: "5px 0px"}}>
                          Holdings Change
                        </div>
                        <span
                          style={{
                            color:
                            getTotalChange(portfolio?.stocks) > 0 ? "green" : getTotalChange(portfolio?.stocks) < 0 ?  "red" : ''
                          }}
                        >
                          <span>
                          {/* {getTotalChange(portfolio?.stocks) > 0 ? "+" : getTotalChange(portfolio?.stocks) < 0 ?  "-" : ''} */}
                          </span>
                          ${getTotalChange(portfolio?.stocks) ?? 0}{" "}
                        </span>
                      </div>
                    </HoldingsDetailWrapper>
                  </HoldingsDetailContainer>
                </CardContent>
              </Card>
            ))}
          </FlexCards>
        </HomeFlexCards>

        <HomeRightSection>
          <HomeRightSectionContainer>
            <div>
              <StyledHeading paddingTop="0px" paddingBottom="0px">
                Portfolios
              </StyledHeading>
              {/* <StyledStockNumbers>
                ${totalHolding}
                <span
                  style={{
                    color:
                      totalValue > 0
                        ? "green"
                        : totalValue < 0
                          ? "red"
                          : "#333",
                  }}
                >
                  {`${(totalHolding - totalValue) > 0 ? '+' : '-'}`}$ {parseFloat(totalHolding - totalValue).toFixed(2)}
                </span>
              </StyledStockNumbers> */}

              <><Divider sx={{ mb: 1 }} /></>
            </div>
            {portfolios.length ? (
              <> </>
            ) : (
              <EmptyPortfolioText marginTop="50px">
                No portfolios added
              </EmptyPortfolioText>
            )}

            {portfolios.map((portfolio, index) => (
              <React.Fragment key={portfolio?.id}>
                <FlexCards sx={{ justifyContent: "space-between", mb: 1, cursor: 'pointer' }} onClick={() => handleCardClick(portfolio)}>
                  <PortfolioNameContainer justify={'start !important'}>
                    
                      <WorkOutlineIcon
                        style={{
                          color: "#5E5E5E",
                          padding: "10px 10px ",
                          backgroundColor: '#f2f2f2',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: '5px'
                        }}
                      />
                      
                      <StyledName>{portfolio?.name}</StyledName>
                      
                   
                  </PortfolioNameContainer>
                  <div>
                    <StyledHoldingsDetailWrapper>
                      <span>${portfolio?.stocks? getTotalHolding(portfolio?.stocks) : 0}</span>
                      <span
                        style={{
                          color:
                          getTotalChange(portfolio?.stocks) > 0 ? "green" : getTotalChange(portfolio?.stocks) < 0 ?  "red" : ''
                        }}
                      >
                        {" "}
                        <span>
                        {/* {portfolio.totalChange ?portfolio.currentStatus ===  "Profit" ? "+" : "-" : ''} */}
                        </span>
                        ${getTotalChange(portfolio?.stocks) ?? 0}
                      </span>
                    </StyledHoldingsDetailWrapper>
                  </div>
                </FlexCards>
                {index < data.length - 1 && <><Divider sx={{ mb: 1 }} /></>}
              </React.Fragment>
            ))}
          </HomeRightSectionContainer>
        </HomeRightSection>
      </FlexCards>
      : <></>}
    </div>
  );
};

export default HomeContent;
