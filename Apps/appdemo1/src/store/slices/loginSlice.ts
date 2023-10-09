import {createSlice, PayloadAction, SliceCaseReducers} from "@reduxjs/toolkit";

export interface LoginState {
    username?: string,
    password?: string
}

export const loginSlice = createSlice<LoginState, SliceCaseReducers<LoginState>>({
    name: 'login',
    initialState: {},
    reducers: {
        updateLogin: (state, action: PayloadAction<LoginState>) => {
            state.password = action.payload.password;
            state.username = action.payload.username;
        }
    }
});

export const { updateLogin } = loginSlice.actions;

export default loginSlice.reducer;