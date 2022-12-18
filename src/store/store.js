import {configureStore} from "@reduxjs/toolkit";
import searchSlice from "./searchSlice";
import {api} from '../api';

const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        search: searchSlice,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware)
})
export default store;
