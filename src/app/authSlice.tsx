import { createSlice } from "@reduxjs/toolkit";
import { addUserToDb, userLoginValidate } from "../indexeddb/dbUserActions";

interface authUser {
    id?: number
    fullname: string,
    email: string,
    password: string,
    statusSignUp: string,
    statusSignIn: string,
    signUpProcessDone: boolean,
    signInProcessDone: boolean,
}

const initialUserState:authUser = {
    fullname: "",
    email: "",
    password: "",
    statusSignUp: "",
    statusSignIn: "",
    signUpProcessDone: false,
    signInProcessDone: false
}

export const authSlice = createSlice({
    name: "auth",
    initialState: initialUserState,
    reducers: {
        setStatusSignUp(state, action) {
            state.statusSignUp = action.payload;
        },
        setStatusSignIn(state, action) {
            state.statusSignIn = action.payload;
        },
        setSignUpProcessDone(state, action) {
            state.signUpProcessDone = action.payload;
        },
        setSignInProcessDone(state, action) {
            state.signInProcessDone = action.payload;
        },
        clearAuth(state){
            state.id = -1;
            state.fullname = "";
            state.email = "";
            state.password = "";
            state.statusSignUp =  "";
            state.statusSignIn = "";
            state.signUpProcessDone = false;
            state.signInProcessDone = false;
        }
    },
    extraReducers: (builder) =>{
        //addUserToDb
        builder.addCase(addUserToDb.pending, (state, action) => {
            state.statusSignUp = 'loading';
        })
        .addCase(addUserToDb.fulfilled, (state, action) => {
            state.id = action.payload['user'].userId;
            state.fullname = action.payload['user'].fullname;
            state.email = action.payload['user'].email;
            state.password = action.payload['user'].password;
            state.statusSignUp = 'success';
        })
        .addCase(addUserToDb.rejected, (state, action) => {
            state.statusSignUp = 'error';
        })

        // userLoginValidate
        .addCase(userLoginValidate.pending, (state, action) => {
            state.statusSignIn = 'loading';
        })
        .addCase(userLoginValidate.fulfilled, (state, action) => {
            state.id = action.payload['user'].userId;
            state.fullname = action.payload['user'].fullname;
            state.email = action.payload['user'].email;
            state.password = action.payload['user'].password;
            state.statusSignIn = 'success';
        })
        .addCase(userLoginValidate.rejected, (state, action) => {
            state.statusSignIn = 'error';
        })
    }
});



export const { setStatusSignUp, setStatusSignIn, setSignUpProcessDone, setSignInProcessDone, clearAuth }  = authSlice.actions;
export const authReducer = authSlice.reducer;