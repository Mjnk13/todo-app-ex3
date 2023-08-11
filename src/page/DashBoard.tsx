import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const DashBoard = () => {
    const navigate = useNavigate();
    const userLogged = JSON.parse(sessionStorage.getItem("user-login") as string);

    useEffect(() => {
        if(!userLogged.logIn) {
            navigate("../logged-in-redirect");   
        }
    }, []);

    return ( 
        <div className="dashboard p-0">
            <div className="user-welcome-background"></div>
            <div className="user-welcome text-center mb-5">
                <img className="" src="/images/user-avatar.png" alt="User Avatar"/>
                <p className="fs-3">Welcome, {userLogged.userFullName}</p>
                <Link to={"/sign-out"}><button className="btn btn-danger">Logout</button></Link>
            </div>
            <div className="dashboard-clock text-center my-5 pt-5">
                <h3 className="mb-3 text-end">Good Evening!</h3>
                <img src="/images/clock.png" alt="clock" />
            </div>
            <h3 style={{color: "#610101"}}>Task List</h3>
            <div className="todo-list-area my-3 py-4 px-4 px-sm-5">
                <div className="d-flex flex-wrap justify-content-between align-items-center">
                    <p className="m-0 fs-5">Daily Tasks</p>
                    <button className="btn fs-5"><i className="fa-solid fa-circle-plus" style={{color: "#F700C4"}}></i></button>
                </div>
                <div className="todo-list">
                    
                </div>
            </div>
        </div>
    );
}
 
export default DashBoard;