import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "./component/Alert";
import { useDispatch, useSelector } from "react-redux";
import { addTodoTask, getAllTodoTasksByUserId } from "../indexeddb/dbTodoActions";
import TodoList from "./component/TodoList";

const DashBoard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userLogged = JSON.parse(sessionStorage.getItem("user-login") as string);
    const todoState = useSelector((state:any) => state.todo);

    const [ newTaskInput, getNewTaskInput ] = useState("");
    const [ isButtonAddTodoTaskDisable, setIsButtonAddTodoTaskDisable ] = useState(false);
    const [ buttonAddTodoTaskContent, setButtonAddTodoTaskContent ] = useState (<>Add</>);
    const [ alertDashBoard, setAlertDashBoard ] = useState(<></>);
    const [ alertModal, setAlertModal ] = useState(<></>);
    const [isAlertModalClear, setIsAlertModalClear] = useState(true);
    const [isAlertDashboardClear, setIsAlertDashboardClear] = useState(true);

    interface todoTask {
        id?: number
        userId: number,
        content: string,
        done: boolean 
    }

    useEffect(() => {
        if(!userLogged.logIn) {
            navigate("../logged-in-redirect");   
        } else {
            dispatch(getAllTodoTasksByUserId(userLogged.userId) as any);
        }
    }, []);

    useEffect(() => {
        const t = setTimeout(() => {
            if(!isAlertModalClear) {
                setAlertModal(<></>);
                setIsAlertModalClear(true);
            }
        }, 3000);
      
        return () => {
            clearTimeout(t)
        }
    }, [alertModal])

    useEffect(() => {
        const t = setTimeout(() => {
            if(!isAlertDashboardClear) {
                setAlertModal(<></>);
                setIsAlertDashboardClear(true);
            }
        }, 3000);
      
        return () => {
            clearTimeout(t)
        }
    }, [alertDashBoard])

    useEffect(() => {
        if(todoState.status === "success") {
            if (todoState.for === "add task") {
                getNewTaskInput("");
                setButtonAddTodoTaskContent(<>Add</>);
                setIsButtonAddTodoTaskDisable(false);
                setAlertModal(<Alert type="success" message="Add new task successfully"/>);
                setIsAlertModalClear(false);
            } else if (todoState.for === "update task is done by task id") {
                setAlertDashBoard(<Alert type="success" message="Update task done successfully"/>);
                setIsAlertDashboardClear(false);
            } else if (todoState.for === "delete task is done by task id") {
                setAlertDashBoard(<Alert type="success" message="Delete task successfully"/>);
                setIsAlertDashboardClear(false);
            }

        } else if (todoState.status === "error") {
            if (todoState.for === "add task") {
                setButtonAddTodoTaskContent(<>Add</>);
                setIsButtonAddTodoTaskDisable(false);
                setAlertModal(<Alert type="danger" message="Something went wrong, can't not add new task"/>);
                setIsAlertModalClear(false);
            } else if (todoState.for === "update task is done by task id") {
                setAlertDashBoard(<Alert type="danger" message="Something went wrong, can't not update task done"/>);
                setIsAlertDashboardClear(false);
            } else if (todoState.for === "delete task is done by task id") {
                setAlertDashBoard(<Alert type="danger" message="Something went wrong, can't not delete task"/>);
                setIsAlertDashboardClear(false);
            }
        }
    }, [todoState.status])

    function addTaskBtnHandle (event: React.MouseEvent) {
        event.preventDefault();
        setIsButtonAddTodoTaskDisable(true);

        if (!newTaskInput) {
            setIsButtonAddTodoTaskDisable(false);
            setButtonAddTodoTaskContent(<>Add</>);
            setAlertModal(<Alert type="danger" message="can not add empty task"/>);
            setIsAlertModalClear(false);
        }
        else {
            setButtonAddTodoTaskContent(<div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>);

            const newToDoTask:todoTask = {
                userId: userLogged.userId,
                content: newTaskInput,
                done: false
            }
            
            dispatch(addTodoTask(newToDoTask) as any);
        }
    }

    return ( 
        <div className="dashboard p-0">
            {/* Modal */}
            <div className="modal fade" id="addTodoTaskModal" tabIndex={-1} aria-labelledby="addTodoTaskModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered align-items-center">
                <div className="position-absolute start-50 translate-middle w-100 text-center" style={{zIndex: 1, top: "25%"}}>
                    {alertModal}
                </div>
                    <div className="modal-content">
                        <div className="modal-header align-self-center">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Enter Task!</h1>
                            {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                        </div>
                        <div className="modal-body">
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control ps-4 text-center" id="new-task-input" placeholder="full name" value={newTaskInput} onChange={e => getNewTaskInput(e.target.value)}/>
                                <label htmlFor="new-task-input" className="w-100 text-center"><i className="fa-solid fa-clipboard-list mx-3"></i>Task</label>
                            </div>
                        </div>
                        <div className="modal-footer justify-content-around">
                            <button type="button" className="btn custom-btn-1" onClick={addTaskBtnHandle} disabled={isButtonAddTodoTaskDisable}>{buttonAddTodoTaskContent}</button>
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
            <div className="todo-list-area my-3 py-4 px-4 px-sm-5 position-relative">
                <div className="position-absolute start-50 top-0 translate-middle text-center" style={{zIndex: 1 }}>
                        {alertDashBoard}
                </div>
                <div className="d-flex flex-wrap justify-content-between align-items-center">
                    <p className="m-0 fs-5">Daily Tasks</p>
                    <button type="button" className="btn fs-5" data-bs-toggle="modal" data-bs-target="#addTodoTaskModal"><i className="fa-solid fa-circle-plus" style={{color: "#F700C4"}}></i></button>
                </div>
                {todoState.data && <TodoList todoTaskList={todoState.data} ></TodoList> }
            </div>
        </div>
    );
}
 
export default DashBoard;