import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { addUserToDb } from "../indexeddb/dbActions";
import { useDispatch, useSelector } from "react-redux";
import Alert from "./component/Alert";

const SignUp = () => {
    interface authUser {
        fullname: string,
        email: string,
        password: string,
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector((state:any) => state.auth);
    
    const [ userFullName, getUserFullName ] = useState ("");
    const [ userEmail, getUserEmail ] = useState ("");
    const [ userPassword, getUserPassword ] = useState ("");
    const [ userConfirmPassword, getUserConfirmPassword ] = useState ("");
    const [ buttonSignUpContent, setButtonSignUpContent ] = useState (<>SignUp</>);
    const [ alert, setAlert ] = useState(<></>);
    const [ isNavigate, setIsNavigate ] = useState(false);
    const [ isButtonSignUpDisable, setIsButtonSignUpDisable ] = useState(false);

    useEffect(() => {
        if(isNavigate) {
            setTimeout(() => {navigate("../dash-board")}, 3000);
        }      
    }, [isNavigate]);

    useEffect(()=> {
        if(auth.status === "success"){
            setAlert(<Alert type="success" message="Sign up success, navigate to dashboard in few second"/>);
            setButtonSignUpContent(<i className="fa-solid fa-circle-check" style={{backgroundColor: "green"}}></i>);
            setIsNavigate(true);
        } else if (auth.status === "error") {            
            setAlert(<Alert type="danger" message="Sign up fail, email already existed"/>);
            setButtonSignUpContent(<>SignUp</>);
            setIsButtonSignUpDisable(false);
        }
            
    },[auth.status]);

    function validateUserSignUpForm(fullname_input: string, email_input:string, password_input:string, confirm_password_input:string):boolean {
        if (fullname_input === "")
            {setAlert(<Alert type="danger" message="Full name is empty !"/>); return false; }
        else if (email_input === "")
            {setAlert(<Alert type="danger" message="Email is empty !"/>); return false; }
        else if (!(/\S+@\S+\.\S+/.test(email_input))) 
            { setAlert(<Alert type="danger" message="Email is not valid !"/>); return false; }
        else if(password_input === "")
            { setAlert(<Alert type="danger" message="Password is empty !"/>); return false; }
        else if(password_input !== confirm_password_input)
            { setAlert(<Alert type="danger" message="Confirm password is not matched with password above !"/>); return false }
        
        return true;
    }

    const signUpFormSubmitHandler = (event:any) => {
        event.preventDefault();
        setIsButtonSignUpDisable(true);

        setButtonSignUpContent(<div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>);

        const isValid:boolean = validateUserSignUpForm(userFullName, userEmail, userPassword, userConfirmPassword);            

        if(isValid) {
            console.log("add user");
            
            const User:authUser = {
                fullname: userFullName,
                email: userEmail,
                password: userPassword
            }
            
            setAlert(<Alert type="warning" message="Loading"/>);
            dispatch(addUserToDb(User) as any);
        } else {
            setButtonSignUpContent(<>SignUp</>);
            setIsButtonSignUpDisable(false);
        }
    }

    return ( 
        <div className="sign-up">
            <div className="container text-center">
                <h3 className="fw-bold">Welcome User!</h3>
                <p className="mt-3">Lets get sign up to add tasks</p>
                <i className="fa-solid fa-pen-nib fs-1 mt-3"></i>
                <form className="mt-3" id="sign-up-form">
                    {alert}
                    <h5 className="text-start ms-3">Full name:</h5>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control ps-4" id="full-name-user-input-sign-up" placeholder="full name" onChange={e => getUserFullName(e.target.value)} defaultValue={auth.fullname}/>
                        <label htmlFor="full-name-user-input-sign-up" className="w-100"><i className="fa-solid fa-user mx-3"></i>Enter Your Full Name</label>
                    </div>

                    <h5 className="text-start ms-3">Email:</h5>
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control ps-4" id="email-user-input-sign-up" placeholder="example@email.com" onChange={e => getUserEmail(e.target.value)} defaultValue={auth.mail}/>
                        <label htmlFor="email-user-input-sign-up" className="w-100"><i className="fa-solid fa-envelope mx-3"></i>Enter Your Email</label>
                    </div>
                    
                    <h5 className="text-start ms-3">Password:</h5>
                    <div className="form-floating mb-3">
                        <input type="password" className="form-control ps-4" id="password-user-input-sign-up" placeholder="password" onChange={e => getUserPassword(e.target.value)} defaultValue={auth.password}/>
                        <label htmlFor="password-user-input-sign-up" className="w-100"><i className="fa-solid fa-lock mx-3"></i>Enter Your Password</label>
                    </div>

                    <h5 className="text-start ms-3">Confirm Password:</h5>
                    <div className="form-floating mb-3">
                        <input type="password" className="form-control ps-4" id="confirm-password-user-input-sign-up" placeholder="confirm password" onChange={e => getUserConfirmPassword(e.target.value)}/>
                        <label htmlFor="confirm-password-user-input-sign-up" className="w-100"><i className="fa-solid fa-lock mx-3"></i>Confirm Password</label>
                    </div>

                    <button form="sign-up-form" className="btn custom-btn-1 w-100 py-3 mt-3" disabled={isButtonSignUpDisable} onClick={(e:React.MouseEvent) => signUpFormSubmitHandler(e)}>{buttonSignUpContent}</button>
                    <p className="mt-3">Already have an Account ? <Link to="/sign-in/" style={{color: "#F700C4"}}>SignIn</Link></p>
                </form>
            </div>
        </div>
    );
}
 
export default SignUp;