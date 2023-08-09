import { Link } from "react-router-dom";

const StartPage = () => {
    return ( 
        <div className="start-page">
            <div className="container text-center">
                <img className="w-100" src="/images/start-page-user-with-todo.png" alt="/images/start-page-user-with-todo.png" style={{maxWidth: "20rem"}}/>
                <h3 className="mt-4 fw-bold">Get Things Done with TODO!</h3>
                <p className="mt-4">Lörem ipsum dobårade mav, barade men trest, käpelig medan keplalogi. Aling stödkorv, fådissa </p>
                <Link to={"/sign-in"}><button className="btn custom-btn-1 w-100 py-3 mt-5">Get Started</button></Link>
            </div>
        </div>
    );
}
 
export default StartPage;