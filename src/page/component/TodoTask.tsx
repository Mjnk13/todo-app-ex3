type todoTask = {
    userMail: string,
    content: string,
    done: boolean
}

const TodoTask = (props: todoTask) => {
    return ( 
        <div className="todo-task row align-items-center">
            <div className="col-sm-1 col-2 p-0 text-center">
                <input className="form-check-input mt-0" type="checkbox" checked={props.done}></input>
            </div>
            <div className="col-sm-10 col-8">
                <p className="ps-2">{props.content}</p>
            </div>
            <div className="col-sm-1 col-2 p-0 text-center">
                <button type="button" className="btn p-0 text-danger"><i className="fa-solid fa-circle-minus fs-3"></i></button>
            </div>
        </div>
    );
}
 
export default TodoTask;