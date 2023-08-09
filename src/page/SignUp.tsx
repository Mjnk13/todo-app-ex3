import { Link } from "react-router-dom";
import { useState } from "react";
import { addUserToDb } from "../indexeddb/action";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../app/userSlide";
const SignUp = () => {
    interface user {
        fullname: string,
        email: string,
        password: string
    }

    const dispatch = useDispatch();
    const user = useSelector((state:any) => state.user);

    const [ userFullName, getUserFullName ] = useState ("");
    const [ userEmail, getUserEmail ] = useState ("");
    const [ userPassword, getUserPassword ] = useState ("");
    const [ userConfirmPassword, getUserConfirmPassword ] = useState ("");
    const [error, setError] = useState<string[]>([]);

    function validateUserSignUpForm(fullname_input: string, email_input:string, password_input:string, confirm_password_input:string):boolean {
        if (fullname_input === "" || 
            email_input === "" || 
            password_input === "" || 
            password_input !== confirm_password_input)
            return false;
        return true;
    }

    const signUpFormSubmitHandler = (event:React.MouseEvent) => {
        event.preventDefault();
        setError([]);
        
        const isValid:boolean = validateUserSignUpForm(userFullName, userEmail, userPassword, userConfirmPassword);            

        if(isValid) {
            console.log("add user");
            
            const User:user = {
                fullname: userFullName,
                email: userEmail,
                password: userPassword
            }
            addUserToDb(User);
            dispatch(addUser(User));
        } else {
            alert("Some thing is wrong, make sure you don't leave any empty field and the password must match with confirm password");
        }
    }

    return ( 
        <div className="sign-up">
            <div className="container text-center">
                <h3 className="fw-bold">Welcome User!</h3>
                <p className="mt-3">Lets get sign up to add tasks</p>
                <i className="fa-solid fa-pen-nib fs-1 mt-3"></i>
                <form className="mt-3" id="sign-up-form">
                    <h5 className="text-start ms-3">Full name:</h5>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control ps-4" id="full-name-user-input-sign-up" placeholder="example@email.com" onChange={e => getUserFullName(e.target.value)}/>
                        <label htmlFor="full-name-user-input-sign-up" className="w-100"><i className="fa-solid fa-user mx-3"></i>Enter Your Full Name</label>
                    </div>

                    <h5 className="text-start ms-3">Email:</h5>
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control ps-4" id="email-user-input-sign-up" placeholder="example@email.com" onChange={e => getUserEmail(e.target.value)}/>
                        <label htmlFor="email-user-input-sign-up" className="w-100"><i className="fa-solid fa-envelope mx-3"></i>Enter Your Email</label>
                    </div>
                    

                    <h5 className="text-start ms-3">Password:</h5>
                    <div className="form-floating mb-3">
                        <input type="password" className="form-control ps-4" id="password-user-input-sign-up" placeholder="password" onChange={e => getUserPassword(e.target.value)}/>
                        <label htmlFor="password-user-input-sign-up" className="w-100"><i className="fa-solid fa-lock mx-3"></i>Enter Your Password</label>
                    </div>

                    <h5 className="text-start ms-3">Confirm Password:</h5>
                    <div className="form-floating mb-3">
                        <input type="password" className="form-control ps-4" id="confirm-password-user-input-sign-up" placeholder="confirm password" onChange={e => getUserConfirmPassword(e.target.value)}/>
                        <label htmlFor="confirm-password-user-input-sign-up" className="w-100"><i className="fa-solid fa-lock mx-3"></i>Confirm Password</label>
                    </div>

                    <button form="sign-up-form" className="btn custom-btn-1 w-100 py-3 mt-3" onClick={(e:React.MouseEvent) => signUpFormSubmitHandler(e)}>SignUp</button>
                    <p className="mt-3">Already have an Account ? <Link to="/sign-in/" style={{color: "#F700C4"}}>SignIn</Link></p>
                </form>
            </div>
        </div>
    );
}
 
export default SignUp;