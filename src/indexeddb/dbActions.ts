import db from "./db";
import { createAsyncThunk } from "@reduxjs/toolkit";

let IDB: IDBDatabase;
interface authUser {
    fullname: string,
    email: string,
    password: string,
}

// export function getUserById <T>(id: number) {
//     return new Promise<T>((resolve, reject) => {
//         db().then((result => {
//             IDB = result as IDBDatabase ;
//             const txn = IDB.transaction('trips', 'readonly');
//             const store = txn.objectStore('trips');
//             let query = store.get(id);
//             query.onerror = () => reject(query.error);
//             query.onsuccess = () => resolve(query.result);
//             txn.oncomplete = () => IDB.close();
//         }));
//     });
// }

export const addUserToDb = createAsyncThunk('user/add', async(user:authUser)=> {
    return new Promise<{result: boolean, user: authUser}>((resolve, reject) => {
        console.log(user);

        db().then((result) => {
            IDB = result as IDBDatabase ;
            const txn = IDB.transaction('users', 'readwrite');
            const store = txn.objectStore('users');
            let query = store.put(user);
            
            query.onsuccess = (event) => { console.log(event.target); resolve({result: true, user: user});  }
            query.onerror = () => { console.log(query.error?.message); reject({result: false, user: user}) }
            txn.oncomplete = () => IDB.close();
        });
    });
}); 