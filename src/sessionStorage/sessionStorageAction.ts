export function setUserSessionLogin (userFullName:string, userMail:string){
    sessionStorage.setItem("user-login", JSON.stringify({
        userFullName: userFullName,
        userMail: userMail,
        logIn: true,
    }));
}

export function setUserSessionLogOut () {
    sessionStorage.setItem("user-login", JSON.stringify({
        userFullName: "",
        userMail: "",
        logIn: false,
    }));
}