import db from "./db";
import { createAsyncThunk } from "@reduxjs/toolkit";

let IDB: IDBDatabase;

interface authUser {
    email: string,
    password: string
}
interface authUserExtend extends authUser {
    fullname: string,
    userId?: number
}

export const userLoginValidate = createAsyncThunk('user/login-validate', async ( user:authUser ) => {
    return new Promise<{result: boolean, user: authUserExtend}>((resolve, reject) => {
        db().then((result) => {
            IDB = result as IDBDatabase ;
            const txn = IDB.transaction('users', 'readonly');
            const store = txn.objectStore('users');
            const indexMail = store.index('email');

            let query = indexMail.get([user.email]);

            query.onerror = () => reject({result: false, user: user});
            query.onsuccess = (e) => {  
                if (query.result && query.result.password === user.password) {
                    let queryKey = indexMail.getKey([user.email]);
                    queryKey.onerror = () => reject({result: false, user: user});
                    queryKey.onsuccess = () => {
                        let queryResult = query.result;
                        queryResult.userId = queryKey.result;
                        resolve({result: true, user: queryResult});
                    }
                }
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
            
            query.onsuccess = (e) => { 
                const target:any = e.target;
                user.userId = target.result;
                resolve({result: true, user: user});
            }

            query.onerror = () => { reject({result: false, user: user}) }
            txn.oncomplete = () => IDB.close();
        }).catch((error) => {
            reject({result: false, user: user});
        });
    });
});

