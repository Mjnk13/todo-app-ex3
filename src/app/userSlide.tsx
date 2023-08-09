import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface user {
    fullname: string,
    email: string,
    password: string
}

const initialUserState:user = {
    fullname: "",
    email: "",
    password: "",
}

export const userSlice = createSlice({
    name: "user",
    initialState: initialUserState,
    reducers: {
        addUser(state, action){
            state['fullname'] = action.payload['fullname'];
            state['email'] = action.payload['email'];
            state['password'] = action.payload['password'];
        }
    }
});

export const { addUser }  = userSlice.actions;
export const userReducer = userSlice.reducer;