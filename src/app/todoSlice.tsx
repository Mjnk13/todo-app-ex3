import { createSlice } from "@reduxjs/toolkit";
import { addTodoTask } from "../indexeddb/dbTodoActions";

interface todoTask {
    userId: number,
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
        builder.addCase(addTodoTask.fulfilled, (state, action) => {
            state.push(action.payload.todoTask);
        })
    }
});



export const {  }  = todoSlice.actions;
export const todoReducer = todoSlice.reducer;