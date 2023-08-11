import Alert from "./component/Alert";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUserSessionLogOut } from "../sessionStorage/sessionStorageAction";
import { clearAuth } from "../app/authSlice";
import { useAuthUserDispatch } from "../app/hook";

const SignOut = () => {
    const dispatch = useAuthUserDispatch();
    const navigate = useNavigate();
    const [ message, setMessage ] = useState("");
    const [ alertType, setAlertType ] = useState("");
    const userLogged = JSON.parse(sessionStorage.getItem("user-login") as string);

    useEffect(()=>{
        if(userLogged.logIn) {        
            setUserSessionLogOut();
            setAlertType("info");
            setMessage("Sign out successfully ! Redirect to Start Page in few second");
            dispatch(clearAuth());
            setTimeout(() => { navigate("../") }, 3000);
        } else {
            navigate("../");
        }
    },[]);

    return ( 
        <Alert type={alertType} message={message}></Alert>
    );
}
 
export default SignOut;