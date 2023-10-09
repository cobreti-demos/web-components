import { configureStore } from '@reduxjs/toolkit';
import AddressSliceReducer from './slices/addressSlice.ts';
import LoginReducer from './slices/loginSlice.ts';

export default configureStore({
    reducer: {
        address: AddressSliceReducer,
        login: LoginReducer
    },
    devTools: true
});
