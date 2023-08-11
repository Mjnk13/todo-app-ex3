import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const DashBoard = () => {
    const navigate = useNavigate();
    const userLogged = JSON.parse(sessionStorage.getItem("user-login") as string);
    const [ newTaskInput, getNewTaskInput ] = useState("");
    const [ isButtonAddTodoTaskDisable, setIsButtonAddTodoTaskDisable ] = useState(false);
    const [ buttonAddTodoTaskContent, setButtonAddTodoTaskContent ] = useState (<>Add</>);

    useEffect(() => {
        if(!userLogged.logIn) {
            navigate("../logged-in-redirect");   
        }
    }, []);

    function addTasBtnHandle (event: React.MouseEvent) {
        event.preventDefault();
        setIsButtonAddTodoTaskDisable(true);

        setButtonAddTodoTaskContent(<div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>);
    }

    return ( 
        <div className="dashboard p-0">
            {/* Modal */}
            <div className="modal fade" id="addTodoTaskModal" tabIndex={-1} aria-labelledby="addTodoTaskModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered align-items-center">
                    <div className="modal-content">
                        <div className="modal-header align-self-center">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Enter Task!</h1>
                            {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                        </div>
                        <div className="modal-body">
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control ps-4" id="new-task-input" placeholder="full name" onChange={e => getNewTaskInput(e.target.value)}/>
                                <label htmlFor="new-task-input" className="w-100"><i className="fa-solid fa-clipboard-list mx-3"></i>Task</label>
                            </div>
                        </div>
                        <div className="modal-footer justify-content-between">
                            <button type="button" className="btn custom-btn-1" onClick={addTasBtnHandle} disabled={isButtonAddTodoTaskDisable}>{buttonAddTodoTaskContent}</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>

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
                    <button type="button" className="btn fs-5" data-bs-toggle="modal" data-bs-target="#addTodoTaskModal"><i className="fa-solid fa-circle-plus" style={{color: "#F700C4"}}></i></button>
                </div>
                <div className="todo-list">
                    
                </div>
            </div>
        </div>
    );
}
 
export default DashBoard;