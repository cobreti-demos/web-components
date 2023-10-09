import {createSlice, PayloadAction, SliceCaseReducers} from "@reduxjs/toolkit";

export interface AddressState {
    address?: string,
    city?: string,
    postalCode?: string
}

export const addressSlice = createSlice<AddressState, SliceCaseReducers<AddressState>>({
    name: 'address',
    initialState: {
        address: '',
        city: '',
        postalCode: ''
    },
    reducers: {
        updateAddress: (state, action : PayloadAction<AddressState>) => {
            state.address = action.payload.address;
            state.city = action.payload.city;
            state.postalCode = action.payload.postalCode;
        }
    }
});

export const { updateAddress } = addressSlice.actions;

export default addressSlice.reducer;
