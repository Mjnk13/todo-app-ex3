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
            const [ fullname, email, password ] = action.payload;
            state["fullname"] = fullname;
            state["email"] = email;
            state["password"] = password;
        }
    }
});

export const { addUser }  = userSlice.actions;
export const userReducer = userSlice.reducer;