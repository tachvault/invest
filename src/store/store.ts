import { configureStore, Action } from "@reduxjs/toolkit";

import { authSlice } from "./authSlice";
import {stockSlice} from "./stock";


const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        stock: stockSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
