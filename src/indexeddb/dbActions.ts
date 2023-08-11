import db from "./db";
import { createAsyncThunk } from "@reduxjs/toolkit";

let IDB: IDBDatabase;

interface authUser {
    email: string,
    password: string
}
interface authUserExtend extends authUser {
    fullname: string
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

export const userLoginValidate = createAsyncThunk('user/login-validate', async ( user:authUser, ) => {
    return new Promise<{result: boolean, user: authUserExtend}>((resolve, reject) => {
        db().then((result) => {
            IDB = result as IDBDatabase ;
            const txn = IDB.transaction('users', 'readonly');
            const store = txn.objectStore('users');
            const indexMail = store.index('email');

            let query = indexMail.get(user.email);

            query.onerror = () => reject({result: false, user: user});
            query.onsuccess = () => {
                if (query.result.password === user.password) resolve({result: true, user: query.result});
                else reject({result: false, user: user});
            };

            txn.oncomplete = () => IDB.close();
        }).catch((error) => {
            reject({result: false, user: user});
        });
    });
});

export const addUserToDb = createAsyncThunk('user/add', async(user:authUserExtend)=> {
    return new Promise<{result: boolean, user: authUserExtend}>((resolve, reject) => {
        db().then((result) => {
            IDB = result as IDBDatabase ;
            const txn = IDB.transaction('users', 'readwrite');
            const store = txn.objectStore('users');
            let query = store.put(user);
            
            query.onsuccess = () => { resolve({result: true, user: user});  }
            query.onerror = () => { reject({result: false, user: user}) }
            txn.oncomplete = () => IDB.close();
        }).catch((error) => {
            reject({result: false, user: user});
        });
    });
});