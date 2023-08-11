import { createSlice } from "@reduxjs/toolkit";

interface todoTask {
    userMail: string
    content: string,
    done: boolean 
}

const initialTodosState:Array<todoTask> = [];

export const todoSlice = createSlice({
    name: "todo",
    initialState: initialTodosState,
    reducers: {
        
    },
    extraReducers: (builder) =>{
        
    }
});



export const {  }  = todoSlice.actions;
export const todoReducer = todoSlice.reducer;