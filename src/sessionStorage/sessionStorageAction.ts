export function setUserSessionLogin (userId:number, userFullName:string, userMail:string){
    sessionStorage.setItem("user-login", JSON.stringify({
        userId: userId,
        userFullName: userFullName,
        userMail: userMail,
        logIn: true,
    }));
}

export function setUserSessionLogOut () {
    sessionStorage.setItem("user-login", JSON.stringify({
        userId: -1,
        userFullName: "",
        userMail: "",
        logIn: false,
    }));
}