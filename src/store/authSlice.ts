// createSlice is imported from the Redux toolkit 
import { createSlice } from "@reduxjs/toolkit";
// Axios library is imported to allow HTTP requests
import axios from "axios";
import { setPorfolios } from "./stock";


const apiWithoutToken = axios.create({
    baseURL: 'https://investtachvault-default-rtdb.firebaseio.com/',
    timeout: 30000,
    headers: {
        "Content-Type": "Application/json",
        "Access-Control-Allow-Origin": "*",
    },
    xsrfCookieName: "csrftoken",
    xsrfHeaderName: "X-CSRFTOKEN",
});

export interface AuthStateModel {
    /* interface that checks whether the 
    isAuth: boolean; // checking user has successfully logged in or session is valid
    isLoading: boolean; // check if data is being fetched
    currentUser: Object; // object which holds user data 
    /* error property can be a error message when 
    authetication error is present */
    error: string | null;
    isSigningIn: Boolean; // check if user is signing in 
    token: string; // represents the user's authetication token
    isAuthorized: Boolean | null | string; // checks if the user permissions 
    resetMailSent: Boolean; // 
}

// definining the inital state of any auth slice
export const initialState: AuthStateModel = {
    isAuth: false, 
    isLoading: false, 
    /* currentUser property of the initial state doesn't hold 
    any value in the  (no user data recieved) */
    currentUser: { 
    },
    isSigningIn: false,
    token: typeof window !== 'undefined' ? localStorage.getItem("auth_token") : '', 
    /* get the auth token only if window still exists */
    isAuthorized: null,
    error: '',
    resetMailSent: false,
};


export const authSlice = createSlice({
    name: "auth", // identification within Redux store
    initialState,
    // defining actions for updating auth state 
    reducers: {
        // updates if user is logged in based on user data
        login: (state, action) => {
            state.token = action.payload;
        },
        // updates the currentUser object based on user data
        setUser: (state, action) => {
            console.log(action.payload, 'userPayload');
            state.currentUser = action.payload;
        },
        // updates state that checks whether user is signing in or not
        setSigningInStatus: (state) => {
            state.isSigningIn = !state.isSigningIn;
        },
        // updates error state and sends out error message
        setError: (state, action) => {
            console.log(action.payload);
            state.error = action.payload;
            console.log(state.error);
        }

    }
});



export const {
    // exporting these functions for use in components
    login,
    setUser,
    setError,
    setSigningInStatus

} = authSlice.actions;
export default authSlice.reducer;

export function getPortfolio(email) {
    /* takes email as input and certifies whether or not
    the user portfolio data has been recognized. If the 
    retrieval fails, the error gets logged */
    return async function getPortfolioThunk(dispatch) {
        try {
            const response = await apiWithoutToken.get(`/portfolio/${email?.split("@")[0]}/data.json`);
            const portfolioData = response.data;
            console.log(response, response.data, portfolioData, 'response this is ');

        }
        catch (error) {
            console.log(error, 'error');
        }
    }
}

export function emailExists(data, router) {
    /* takes in "data", which is the user data, and the router, representing website navigation

    Dispatches setSigningInStatus to inform that the user is signing in based on the response.
    If the email exists, then retrieve portfolio. If the email doesn't exist, an error is logged.
    */
    return async function emailExistsThunk(dispatch) {
        dispatch(setSigningInStatus());
        try {
            // "https://stockmanagement-d6e0b-default-rtdb.firebaseio.com/users.json",
            const res = await axios.get(
                "https://investtachvault-default-rtdb.firebaseio.com/users.json", 
            );

            console.log(res, 'res');
            if (res.data) {
                const userExists = Object.values(res.data).some(user => user.email === data['email']);
                // if user exists already get Portfolio, else register new user.
                console.log(userExists, 'userExists');
                if (userExists) {
                    // get user portfolio
                    dispatch(getPortfolio(data['email']))
                    router.push('/home')
                } else {
                    // register user
                    dispatch(LoginUser(data, router))
                }

                console.log(res.data, userExists, 'user');

                dispatch(setSigningInStatus());
            } else {
                // register user
                dispatch(LoginUser(data, router))
            }

            // router.push('/home')
        } catch (error: any) {
            console.log(error, error.code);
            if (error.code === 'ERR_NETWORK') {
                console.log('failed to login')

                dispatch(setError('Interval Server Error'))
                setTimeout(() => { setError('') }, 2000)
                return;
            }
            dispatch(setSigningInStatus());
            if (error && error.response) {
                if (error.response.data) {
                    dispatch(setError(error.response.data.message))
                    setTimeout(() => { setError('') }, 2000)
                    return;
                }
                if (
                    Object.entries(error.response.data)[0]?.includes("non_field_errors")
                ) {
                    Object.entries(error.response.data).forEach((item: any) => {
                        console.log(`${item[1][0]}`, '${item[1][0]}');
                    });

                } else {
                    Object.entries(error.response.data).forEach((item: any) => {
                        console.log(`${item[0]}-${item[1][0]}`, 'error r101');
                    });
                }
            }
        }
    }
}


export function LoginUser(data, router) {
    /* Takes the data containing login credentials and the router
    library for website navigation as input.

    Validates the email, and indicates the signing-in progress
    by dispatching setSigninginStatus. If the login is successful, 
    the token and user information are stored in
    local storage and sends user data to API. At successful login, redirects to the homepage*/

    return async function LoginThunk(
        dispatch,
        getState: AuthStateModel
    ) {
        console.log('data loggin in before', data);
        // write a condition such that if email is not there on data then return and set error

        if (data['email'] === "") {
            dispatch(setError('Please fill all the fields'));
            return;
        }
        dispatch(setSigningInStatus());
        try {
            const res = await apiWithoutToken.post(
                `/user/${data['email']?.split("@")[0]}.json`,
                (data = data)
            );
            if(!data['firstName']){
                localStorage.setItem('isLoggedIn', false);localStorage.removeItem('auth_token'); window.location.assign('/auth/login')
                localStorage.removeItem('firstName');
                localStorage.removeItem('email');
            }
            localStorage.setItem('firstname', data['firstName']);
            console.log(res.data, 'data', 'loggin user in data')
            localStorage.setItem('auth_token', res.data.name);
            localStorage.setItem('email', data['email']);
            // setTimeout(()=>{localStorage.setItem("email", data['email']);}, 1000)
            dispatch(login(data));
            console.log(data, 'before setting user');
            // dispatch(getUser())
            dispatch(setUser(data));
            dispatch(setSigningInStatus());
            // setTimeout(()=>{
            //     window.location.href = "/home";
            // }, 2000)
            router.push('/home')
        } catch (error: any) {
            console.log(error, error.code);
            if (error.code === 'ERR_NETWORK') {
                console.log('failed to login')

                dispatch(setError('Interval Server Error'))
                return;
            }
            dispatch(setSigningInStatus());
            if (
                Object?.entries(error.response.data)[0]?.includes("non_field_errors")
            ) {
                Object?.entries(error.response.data).forEach((item: any) => {
                    console.log(`${item[1][0]}`, '${item[1][0]}');
                });

            } else {
                Object?.entries(error.response.data).forEach((item: any) => {
                    console.log(`${item[0]}-${item[1][0]}`, 'error r101');
                });
            }
        }
    };
}


export function getUser() {
    /* retriever user information from the API from
    the email stored in the local storage. */
    return async function (dispatch) {
        try {
            const emailUser = localStorage.getItem('email');
            const response = await apiWithoutToken.get(`/user/${emailUser?.split("@")[0]}/data.json`);
                    }
                                catch (error) {
            // Handle the error, you can dispatch getUserFailure with an error message if needed
            console.log(error);
        }
    };
}