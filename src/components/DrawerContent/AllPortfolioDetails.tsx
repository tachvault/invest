import { useState, useEffect } from "react";
import {
  StyledTitle,
  StyledButton,
  FlexItems,
  PortfolioListContainer,
  PortfolioDivWrapper,
  PortfolioNameContainer,
  IconContainer,
  StyledName,
  CreateStyleText,
  HoldingPriceText,
  HoldingPriceTextTwo,
  EmptyPortfolioText,
  FlexDiv,
} from "./StyledItems";
import AddIcon from "@mui/icons-material/Add";
import CreatePortfolioForm from "./CreatePortfolioForm";
import { Divider } from "@mui/material";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import { useSelector } from "react-redux";
import PorfolioDetails from "./PorfolioDetails";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useRouter } from "next/router";

const AllPortfolioDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Manage modal dialog visibility
  const [selectedPortfolioId, setSelectedPortfolioId] = useState(null); // Store the selected portfolio's ID

  // Data retrieval and filtering
  const existingPortfolios =
    JSON.parse(localStorage.getItem("portfolios")) || []; // Retrieve portfolios from local storage
  let filteredPortfolios = [];
  if (existingPortfolios) {
    // Filter out null and undefined values from the retrieved portfolios
    filteredPortfolios = existingPortfolios.filter(
      (item) => item !== null && item !== undefined
    );
  }
  const [data, setData] = useState(filteredPortfolios); // Store the filtered portfolios
  const { portfolios } = useSelector((state) => state.stock); // Access the 'portfolios' property from the Redux state

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // useEffect to update the 'data' state when 'portfolios' changes
  useEffect(() => {
    setData(filteredPortfolios);
  }, [portfolios]);

  const router = useRouter();

  // Function to navigate to the details of a selected portfolio
  const handleGoToDetail = (id) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, ...{ tab: "Portfolios", portfolioId: id } },
    });
  };
  return (
    <div>
      <FlexDiv justifyContent={"space-between"}>
          <StyledTitle>All Portfolios</StyledTitle>
          <StyledButton style={{width: '200px'}} onClick={openModal}>
            <AddIcon sx={{ fontSize: "20px", paddingRight: "2px" }} /> Create
            Portfolio
          </StyledButton>
        <CreatePortfolioForm open={isModalOpen} onClose={closeModal} />
      </FlexDiv>

    
      <Divider />

      <div style={{ marginTop: "80px" }}>
        {portfolios.length ? (
          portfolios.map((portfolio) => (
            <PortfolioListContainer key={portfolio?.id}>
              <PortfolioDivWrapper>
                <PortfolioNameContainer justify={"space-between !important"}>
                  <div style={{ display: "flex" }}>
                    <IconContainer>
                      <WorkOutlineIcon
                        style={{
                          color: "#5E5E5E",
                          padding: "1px 10px 1px 10px",
                        }}
                      />
                    </IconContainer>
                    <div>
                      <StyledName sx={{ ml: 1, mt: 0 }}>
                        {portfolio.name}
                      </StyledName>
                      <StyledName
                        sx={{ ml: 1, mt: -1, mb: 0 }}
                        fontWeight="400"
                      >
                        {portfolio.holding} holding
                      </StyledName>
                    </div>
                  </div>
                  <div>
                    <ChevronRightIcon
                      style={{ height: "40px", cursor: "pointer" }}
                      onClick={() => {
                        handleGoToDetail(portfolio.id);
                      }}
                    />
                  </div>
                </PortfolioNameContainer>
              </PortfolioDivWrapper>
            </PortfolioListContainer>
          ))
        ) : (
          <EmptyPortfolioText marginTop="200px">
            No portfolio added
          </EmptyPortfolioText>
        )}
      </div>
      {data.length ? (
        <PortfolioListContainer>
          <PortfolioDivWrapper
            backgroundColor="#f2f2f2"
            border="1px solid #f2f2f2"
            onClick={openModal}
            sx={{ cursor: "pointer" }}
          >
            <CreateStyleText>+ Create Portfolio</CreateStyleText>
          </PortfolioDivWrapper>
        </PortfolioListContainer>
      ) : (
        <></>
      )}
    </div>
  );
};

export default AllPortfolioDetails;
