import { createSlice } from "@reduxjs/toolkit";
import { addUserToDb, userLoginValidate } from "../indexeddb/dbActions";

interface authUser {
    fullname: string,
    email: string,
    password: string,
    status: string,
    signUpProcessDone: boolean,
    signInProcessDone: boolean,
}

const initialUserState:authUser = {
    fullname: "",
    email: "",
    password: "",
    status: "",
    signUpProcessDone: false,
    signInProcessDone: false
}

export const authSlice = createSlice({
    name: "auth",
    initialState: initialUserState,
    reducers: {
        setStatus(state, action) {
            state.status = action.payload;
        },
        setSignUpProcessDone(state, action) {
            state.signUpProcessDone = action.payload;
        },
        setSignInProcessDone(state, action) {
            state.signInProcessDone = action.payload;
        },
        clearAuth(state){
            state.fullname = "";
            state.email = "";
            state.password = "";
            state.status = "";
            state.signUpProcessDone = false;
            state.signInProcessDone = false;
        }
    },
    extraReducers: (builder) =>{
        //addUserToDb
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
        })

        // userLoginValidate
        .addCase(userLoginValidate.pending, (state, action) => {
            state.status = 'loading';
        })
        .addCase(userLoginValidate.fulfilled, (state, action) => {
            state.fullname = action.payload['user'].fullname;
            state.email = action.payload['user'].email;
            state.password = action.payload['user'].password;
            state.status = 'success';
        })
        .addCase(userLoginValidate.rejected, (state, action) => {
            state.status = 'error';
        })
    }
});



export const { setStatus, setSignUpProcessDone, setSignInProcessDone, clearAuth }  = authSlice.actions;
export const authReducer = authSlice.reducer;