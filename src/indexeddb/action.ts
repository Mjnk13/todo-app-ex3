import { addUser } from "../app/userSlide";
import db from "./db";
let IDB: IDBDatabase;
interface user {
    fullname: string,
    email: string,
    password: string
}

export function addUserToDb(user: user) {
    return async function addUserToDbThunk(dispatch:Function, getState:Function) {        
        await db().then((result => {
            IDB = result as IDBDatabase ;
            const txn = IDB.transaction('user', 'readwrite');
            const store = txn.objectStore('user');
            let query = store.put(user);
            
            query.onsuccess = (event) => { console.log(event); }
            query.onerror = () => { console.log(query.error); }
            txn.oncomplete = () => IDB.close();

            dispatch(addUser(user));
        }));
    }
}