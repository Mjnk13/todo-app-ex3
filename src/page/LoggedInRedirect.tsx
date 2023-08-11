import Alert from "./component/Alert";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoggedInRedirect = () => {
    const navigate = useNavigate();
    const userLogged = JSON.parse(sessionStorage.getItem("user-login") as string);
    const [ message, setMessage ] = useState("");
    const [ alertType, setAlertType ] = useState("");

    useEffect(()=>{
        if(userLogged.logIn) {
            setAlertType("info");
            setMessage("You already log in ! Redirect to Dash Board in few second");
            setTimeout(() => {navigate("../dash-board")}, 3000);
        } else {
            setAlertType("danger");
            setMessage("You are not log in ! Redirect to Sign In page in few second");
            setTimeout(() => {navigate("../sign-in")}, 3000);
        }
    },[]);

    return ( 
        <Alert type={alertType} message={message}></Alert>
    );
}
 
export default LoggedInRedirect;