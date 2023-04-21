import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from '../api/apiSlice';
import  userSlice  from '../features/user/UserSlice';

export const store = configureStore({
    reducer: {
        user: userSlice,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

export type AppDispatcher = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>