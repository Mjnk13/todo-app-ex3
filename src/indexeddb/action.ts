import db from "./db";

let IDB: IDBDatabase;
interface user {
    fullname: string,
    email: string,
    password: string
}

export function addUserToDb(user: user) {
    db().then((result => {
        IDB = result as IDBDatabase ;
        const txn = IDB.transaction('users', 'readwrite');
        const store = txn.objectStore('users');
        let query = store.put(user);
        
        query.onsuccess = (event) => { console.log(event.target); }
        query.onerror = () => { console.log(query.error?.message); }
        txn.oncomplete = () => IDB.close();
    }))
}