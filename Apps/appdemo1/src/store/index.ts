import { configureStore } from '@reduxjs/toolkit';
import AddressSliceReducer from './addressSlice.ts';

export default configureStore({
    reducer: {
        address: AddressSliceReducer
    },
    devTools: true
});
