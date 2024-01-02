import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const apiWithoutToken = axios.create({
  baseURL: "https://investtachvault-default-rtdb.firebaseio.com/",
  timeout: 30000,
  headers: {
    "Content-Type": "Application/json",
    "Access-Control-Allow-Origin": "*",
  },
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFTOKEN",
});

export const initialState = {
  stocks: [],
  portfolios: [],
  currentPortfolio: {},
  isStockLoding: false,
  currentStock: {},
};

export const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    getPortfolio: (state, action) => {
      state.currentPortfolio = action.payload.access_token;
    },
    setPorfolios: (state, action) => {
      console.log(action.payload, "payload 101");
      if (action.payload) {
        state.portfolios = action.payload;
      }
    },
    setLoading: (state) => {
      state.loading = !state.loading;
    },
    addPortfolio: (state, action) => {
      state.portfolios = action.payload;
    },
    editPortfolio: (state, action) => {
      state.currentPortfolio = !state.isSigningIn;
    },
    setCurrentStock: (state, action) => {
      console.log(action.payload, "currentStock");
      state.currentStock = action.payload;
    },
  },
});

export const {
  getPortfolio,
  addPortfolio,
  editPortfolio,
  setLoading,
  setPorfolios,
  setCurrentStock,
} = stockSlice.actions;
export default stockSlice.reducer;

export function getUserPortfolio() {
  return async function getUserPortfolioThunk(dispatch, getState) {
    const { currentUser } = getState().auth;
    const email = localStorage.getItem('email')
    try {
      const res = await apiWithoutToken.get(
        `/portfolio/${email?.split("@")[0]}/data.json`
      );
      let newPortfolios = [];
      console.log(res.data, "get new portfolios", res.data);
      if (res.data) {
        const allPortfolios = Object.values(res.data)
          .map((item) => item.portfolios)
          .flat();

        Object.entries(res.data).forEach((item1, index) => {
          if(index ===( Object.entries(res.data).length -1)){
            console.log('this is our item1', item1);
            dispatch(setPorfolios(item1[1]['portfolios']));
          }
          console.log(item1, item1[1]["portfolios"], "new test");
        });
        console.log(/* `allPortfolios` is an array that contains all the portfolios fetched from the
        API response. It is created by extracting the `portfolios` property from each
        object in the `res.data` object and flattening the resulting array. */
        allPortfolios, allPortfolios[allPortfolios.length - 1], 'a;;;')
        const mappedData = [allPortfolios[allPortfolios.length - 1]]

        // dispatch(setPorfolios(allPortfolios));
      }
    } catch (error) {
      console.log(error, "err");
    }
  };
}
export function addNewPortfolio(data) {
  return async function addPortfolioThunk(dispatch, getState) {
    console.log("data", data);
    // write a condition such that if email is not there on data then return and set error
    const { currentUser } = getState().auth;
    const { portfolios } = getState().stock;
    console.log(portfolios, "portfolios data from frpontend");
    dispatch(setLoading());
    const headers = {
      "Content-Type": "application/json",
      // Add any other headers as needed
    };
    let postData = [];
    
    if (portfolios.length) {
      const existingPortfolioIndex = portfolios.findIndex(portfolio => portfolio.id === data.id);
      postData = existingPortfolioIndex !== -1
      ? portfolios.map(portfolio => (portfolio.id === data.id ? data : portfolio))
      : [...portfolios, {id: portfolios.length, ...data}];
      console.log(postData, 'postData')
    } else {
      postData = [{'id': 0, ...data}];
    }
    try {
      const res = await apiWithoutToken.post(
        `/portfolio/${currentUser.email?.split("@")[0]}/data.json`,
        { portfolios: postData },
        { headers: headers }
      );
      console.log(res, "res add new portfolios");
      dispatch(getUserPortfolio());
      // const existingPortfolios = JSON.parse(localStorage.getItem("portfolios")) || [];
      // existingPortfolios.push({'id': existingPortfolios.length, 'holding': 0, ...data});

      // const filteredPortfolios = existingPortfolios.filter((item) => item !== null && item !== undefined);

      // localStorage.setItem("portfolios", JSON.stringify(filteredPortfolios));
      // console.log(filteredPortfolios, 'filteredPortfolios');
      // dispatch(setPorfolios(filteredPortfolios));

      dispatch(setLoading());
      // window.location.href = "/home";
    } catch (error: any) {
      console.log(error, error.code);
      // if (error.code === 'ERR_NETWORK') {
      //     console.log('failed to login')

      //     dispatch(setError('Interval Server Error'))
      //     return;
      // }
      dispatch(setLoading());

      // if (
      //     Object?.entries(error.response.data)[0]?.includes("non_field_errors")
      // ) {
      //     Object?.entries(error.response.data).forEach((item: any) => {
      //         console.log(`${item[1][0]}`, '${item[1][0]}');
      //     });

      // } else {
      //     Object?.entries(error.response.data).forEach((item: any) => {
      //         console.log(`${item[0]}-${item[1][0]}`, 'error r101');
      //     });
      // }
    }
  };
}

export function editPortfolioName(data) {
  return async function editPortfolioNameThunk(dispatch, getState) {
    dispatch(setLoading());
    try {
      const { id, name } = data;
      console.log(id, name, "update");
      const { portfolios } = getState().stock || []; // Get the current state
      console.log("portfolios", portfolios);
      const updatedPortfolios = portfolios?.map((portfolio) => {
        if (portfolio?.id === id) {
          return { ...portfolio, name: name };
        }
        return portfolio;
      });
      console.log("updated portfolio", portfolios, updatedPortfolios);
      dispatch(setPorfolios(updatedPortfolios)); // Update the Redux state

      // Update the local storage
      const portfoliosFromLocalStorage =
        JSON.parse(localStorage.getItem("portfolios")) || [];
      console.log(portfoliosFromLocalStorage, "portfoliosFromLocalStorage");
      const updatedPortfoliosLocalStorage = portfoliosFromLocalStorage.map(
        (portfolio) => {
          if (portfolio?.id === id) {
            return { ...portfolio, name: name };
          }
          return portfolio;
        }
      );
      localStorage.setItem(
        "portfolios",
        JSON.stringify(updatedPortfoliosLocalStorage)
      );

      dispatch(setLoading());
    } catch (error) {
      console.log(error);
      dispatch(setLoading());
    }
  };
}

export function deletePortfolioName(data) {
  return async function deletePortfolioNameThunk(dispatch, getState) {
    dispatch(setLoading());
    try {
      const { id } = data;
      const { portfolios } = getState().stock || [];
      console.log("portfolios delete", portfolios, id);
      const updatedPortfolios = portfolios.filter(
        (portfolio) => portfolio?.id !== id
      );
      console.log(updatedPortfolios, "updatedPortfolios");
      dispatch(setPorfolios(updatedPortfolios));
      localStorage.setItem("portfolios", JSON.stringify(updatedPortfolios));
      console.log(localStorage.getItem("portfolios"));
      dispatch(setLoading());
    } catch (error) {
      console.log(error);
      dispatch(setLoading());
    }
  };
}

export function addNewStock(portfolioId, stockData, netShare) {
  return async function addStockThunk(dispatch, getState) {
    console.log(portfolioId, stockData, netShare, 'portfolios 0001 netshare');
    const {portfolios} = getState().stock;
    console.log(portfolios, 'portfolios');
    const portfolioIndex = portfolios.findIndex(portfolio => portfolio.id === portfolioId);
    
    const updatedPortfolios = [...portfolios];
    let portfolio = { ...updatedPortfolios[portfolioIndex] }
    console.log(portfolio, 'portfolioIndex', portfolioIndex, '123')
    
    if (!portfolio.stocks) {
      portfolio.stocks = [];
    }
    console.log(Object.isExtensible(portfolio), '!Object.isExtensible(portfolio)');
    console.log(portfolio, 'portfolio stocks');
    if (stockData.length > 0)
    stockData[0].shares = netShare;
    Object.preventExtensions(portfolio);
    portfolio['stocks'] = [...(portfolio.stocks ? portfolio.stocks : []), ...stockData];

    updatedPortfolios[portfolioIndex] = portfolio;
    console.log(updatedPortfolios, 'updated portfolios', portfolio);

    dispatch(addNewPortfolio(portfolio))

    // Fetch the existing portfolios from localStorage
    // const existingPortfolios =
    //   JSON.parse(localStorage.getItem("portfolios")) || [];
    // console.log(existingPortfolios, "existingPortfolios");

    // // Find the portfolio with the matching portfolioId
    // const portfolioIndex = existingPortfolios.findIndex(
    //   (portfolio) => portfolio.id === portfolioId
    // );
    // if (portfolioIndex !== -1) {
    //   // Portfolio found, add the stock data to the portfolio
    //   if (!existingPortfolios[portfolioIndex].hasOwnProperty("stocks")) {
    //     existingPortfolios[portfolioIndex].stocks = [];
    //   }
    //   existingPortfolios[portfolioIndex].stocks.push({
    //     ...stockData[0],
    //     shares: netShare,
    //   });
    //   console.log(existingPortfolios, "existingPortfolios modified");
    //   // Update the localStorage with the modified portfolios
    //   console.log(JSON.parse(localStorage.getItem("portfolios")), "new tiem");
    //   localStorage.removeItem("portfolios");
    //   setTimeout(() => {
    //     localStorage.setItem("portfolios", JSON.stringify(existingPortfolios));
    //     dispatch(setPorfolios(existingPortfolios));
    //   }, 1000);
    //   // Dispatch an action to update the state with the modified portfolios
    //   dispatch(setPorfolios(existingPortfolios));
    // } else {
    //   console.error(`Portfolio with id ${portfolioId} not found.`);
    // }
  };
}
