import React, { useState, useEffect } from "react";
import {
  PortfolioSectionHeader,
  StyledText,
  StyledHelp,
  PortfolioHeaderButton,
  FlexDiv,
  CreateButton,
  PortfolioSectionHeaderContainer
} from "./StyledItems";
import AddIcon from "@mui/icons-material/Add";
import CreatePortfolioForm from "./CreatePortfolioForm";
import { Divider } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PendingOutlinedIcon from "@mui/icons-material/PendingOutlined";
import Popper, { PopperPlacementType } from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import AllPortfolioDetails from "./AllPortfolioDetails";
import EditPortfolioName from "./EditPortfolioName";
import { useDispatch, useSelector } from "react-redux";
import PorfolioDetails from "./PorfolioDetails";
import { deletePortfolioName, setPorfolios } from "@/store/stock";
import { useRouter } from "next/router";

const PortfoliosContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState<PopperPlacementType>();
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [isAllPortfolioDetailsVisible, setIsAllPortfolioDetailsVisible] =
    useState(true);

  const [currentPortfolio, setCurrentPortfolio] = useState(); // To store the selected portfolio
  const [isPortfolioDetailsVisible, setIsPortfolioDetailsVisible] =
    useState(false); // To control the visibility of PortfolioDetails

  // Retrieve existing portfolios from local storage and filter out null/undefined values
  const existingPortfolios =
    JSON.parse(localStorage.getItem("portfolios")) || [];
  let filteredPortfolios = [];
  if (existingPortfolios) {
    filteredPortfolios = existingPortfolios.filter(
      (item) => item !== null && item !== undefined
    );
  }

  // Initialize the data state with filtered portfolios
  const [data, setData] = useState(filteredPortfolios);
  const [isEditNameModalOpen, setIsEditNameModalOpen] = useState(false); // Is the Edit Portfolio Name modal open?
  const { portfolios } = useSelector((state) => state.stock); // Get portfolios from Redux store
  const router = useRouter();
  const { portfolioId } = router.query; // Get the portfolio ID from the router query
  
   // Function to open the Create Portfolio modal
  const openModal = () => {
    setIsModalOpen(true);
  };

   // Function to close the Create Portfolio modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

   // Function to handle the "Edit Name" button click
  const handleEditNameClick = ({ id, name }) => {
    setIsEditNameModalOpen(true);
    // setCurrentPortfolio()
    setOpen(false); // Close the Popper
  };


  const dispatch = useDispatch();

  const handleClick =
    (newPlacement: PopperPlacementType, portfolio) =>
      (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log(portfolio, "portfolio 101");
        setAnchorEl(event.currentTarget);
        setOpen((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
        portfolio: portfolio;
      };

  const detailVisibleHandleClick = (portfolio) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, portfolioId: portfolio?.id },
    });
    setSelectedPortfolio(portfolio); // Store the selected portfolio
    setIsPortfolioDetailsVisible(true); // Show the PortfolioDetails
    setIsAllPortfolioDetailsVisible(false); // Hide AllPortfolioDetails
  };

  const toggleAllDetailsVisibility = () => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, portfolioId: "All" },
    });
    setIsAllPortfolioDetailsVisible(true); // Show AllPortfolioDetails
    setIsPortfolioDetailsVisible(false); // Hide PortfolioDetails
  };

  const handleDeletePortfolio = () => {
    dispatch(deletePortfolioName(selectedPortfolio));
    setOpen(false);
  };

  useEffect(() => {
    console.log(portfolioId, "portfolioId new");
    if (portfolioId && portfolios?.length) {
      if (portfolioId === "All") {
        toggleAllDetailsVisibility();
        return;
      } else {
        console.log(portfolioId,
          portfolios?.find((item) => { return item.id === parseInt(portfolioId); console.log(item, 'item', portfolioId, item.id === parseInt(portfolioId)) }),
          "portfolios.filter((item)=>item.id === portfolio)", portfolios
        );
        detailVisibleHandleClick(
          portfolios?.find((item) => { return item.id === parseInt(portfolioId); })
        );
      }
    }
  }, [portfolios.length, portfolioId]);
  return (
    <>
      <PortfolioSectionHeader>
        <PortfolioSectionHeaderContainer>
          <div style={{ display: "flex" }}>
            <StyledText>Portfolios</StyledText>
          </div>
          <FlexDiv justifyContent="start">
            <Popper open={open} anchorEl={anchorEl} transition>
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={300}>
                  <Paper
                    sx={{ p: 2, boxShadow: "none", border: "1px solid #ccc" }}
                  >
                    <div
                      style={{ paddingBottom: "6px", cursor: "pointer" }}
                      onClick={handleEditNameClick}
                    >
                      Edit Name
                    </div>
                    <Divider />
                    <div
                      onClick={handleDeletePortfolio}
                      style={{ paddingTop: "6px", cursor: "pointer" }}
                    >
                      Delete Portfolio
                    </div>
                  </Paper>
                </Fade>
              )}
            </Popper>
            <EditPortfolioName
              open={isEditNameModalOpen}
              onClose={() => setIsEditNameModalOpen(false)}
              portfolio={selectedPortfolio}
            />
            <PortfolioHeaderButton onClick={toggleAllDetailsVisibility}>
              <FlexDiv>
                <HomeOutlinedIcon
                  sx={{ fontSize: "19px", marginRight: "5px" }}
                />
                All
              </FlexDiv>
            </PortfolioHeaderButton>

            {portfolios?.map((portfolio) => (
              <PortfolioHeaderButton
                key={portfolio?.id}
                backgroundColor="#fff"
                color="#5e5e5e"
                border="1px solid #ccc"
                onClick={() => detailVisibleHandleClick(portfolio)}
              >
                <FlexDiv>
                  {portfolio?.name}
                  <PendingOutlinedIcon
                    sx={{ fontSize: "19px", ml: "5px" }}
                    onClick={handleClick("bottom-start", portfolio)}
                  />
                </FlexDiv>
              </PortfolioHeaderButton>
            ))}

            <CreateButton onClick={openModal}>
              <FlexDiv justifyContent="start">
                <AddIcon />
                Create Portfolio
              </FlexDiv>
            </CreateButton>
            <CreatePortfolioForm open={isModalOpen} onClose={closeModal} />
          </FlexDiv>
        </PortfolioSectionHeaderContainer>
      </PortfolioSectionHeader>

      {isAllPortfolioDetailsVisible && <AllPortfolioDetails />}

      {isPortfolioDetailsVisible && (
        <PorfolioDetails
          portfolioId={selectedPortfolio?.id}
          data={portfolios}
        />
      )}
    </>
  );
};

export default PortfoliosContent;
