import { createAsyncThunk } from "@reduxjs/toolkit";
import db from "./db";

let IDB: IDBDatabase;

interface todoTask {
    id?: number
    userId: number,
    content: string,
    done: boolean 
}

export const addTodoTask = createAsyncThunk('todo-task/add', async (todoTask: todoTask) => {
    return new Promise<{result: boolean, todoTask: todoTask}>((resolve, reject) => {
        db().then((result) => {
            IDB = result as IDBDatabase ;
            const txn = IDB.transaction('todoTasks', 'readwrite');
            const store = txn.objectStore('todoTasks');
            let query = store.put(todoTask);
            
            query.onsuccess = (e) => { 
                const target:any = e.target;   
                todoTask.id = target.result;
                resolve({result: true, todoTask: todoTask});
            }

            query.onerror = () => { reject({result: false, user: todoTask}) }
            txn.oncomplete = () => IDB.close();
        }).catch((error) => {
            reject({result: false, user: todoTask});
        });
    });
});