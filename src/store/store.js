import {configureStore} from "@reduxjs/toolkit";
import searchSlice from "./searchSlice";
import authReducer from './authSlice';
import {api} from '../api';

const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        auth: authReducer,
        search: searchSlice,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware)
})
export default store;
