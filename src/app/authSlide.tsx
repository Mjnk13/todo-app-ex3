import { createSlice } from "@reduxjs/toolkit";
import { addUserToDb } from "../indexeddb/dbActions";

interface authUser {
    fullname: string,
    email: string,
    password: string,
    status: string,
    
}

const initialUserState:authUser = {
    fullname: "",
    email: "",
    password: "",
    status: "",
}

export const authSlice = createSlice({
    name: "auth",
    initialState: initialUserState,
    reducers: {

    },
    extraReducers: (builder) =>{
        builder.addCase(addUserToDb.pending, (state, action) => {
            state.status = 'loading';
        })
        .addCase(addUserToDb.fulfilled, (state, action) => {
            state.fullname = action.payload['user'].fullname;
            state.email = action.payload['user'].email;
            state.password = action.payload['user'].password;
            state.status = 'success';
        })
        .addCase(addUserToDb.rejected, (state, action) => {
            state.status = 'error';
        });
    }
});



export const { }  = authSlice.actions;
export const authReducer = authSlice.reducer;