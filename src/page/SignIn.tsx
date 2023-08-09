import { Link } from "react-router-dom";

const SignIn = () => {
    return ( 
        <div className="sign-in">
            <div className="container text-center">
                <h3 className="fw-bold">Welcome Back!</h3>
                <img className="w-100 mt-5" src="/images/sign-in-user.png" alt="/images/sign-in-user.png" style={{maxWidth: "20rem"}}/>
                <form className="mt-5" id="sign-in-form">
                    <h5 className="text-start ms-3">Email:</h5>
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control ps-4" id="email-user-input-sign-in" placeholder="example@email.com"/>
                        <label htmlFor="email-user-input-sign-in" className="w-100"><i className="fa-solid fa-envelope mx-3"></i>Enter Your Email</label>
                    </div>

                    <h5 className="text-start ms-3">Password:</h5>
                    <div className="form-floating mb-3">
                        <input type="password" className="form-control ps-4" id="password-user-input-sign-in" placeholder="password"/>
                        <label htmlFor="password-user-input-sign-in" className="w-100"><i className="fa-solid fa-lock mx-3"></i>Enter Your Password</label>
                    </div>
                    <Link to="/forget-password/*" className="text-decoration-none fw-bold mt-3" style={{color: "#F700C4"}}>Forget Password?</Link>
                    <button type="submit" form="sign-in-form" className="btn custom-btn-1 w-100 py-3 mt-3">SignIn</button>
                    <p className="mt-3">Don't have an Account ? <Link to="/sign-up/" style={{color: "#F700C4"}}>SignUp</Link></p>
                </form>
            </div>
        </div>
    );
}
 
export default SignIn;