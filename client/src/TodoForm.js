/*import React, {useState} from "react";

function TodoForm({todo, handleSubmit}){
    const [title, setTitle] = useState();

    const formValue = (event) => {setTitle(event.target.value)}

    const submitHandler = () =>{
        handleSubmit(title)
    }

    return(
        <div>
            <form onSubmit={submitHandler}>
                <input type={"text"} name={"text"} id={"input"} defaultValue={todo ? todo.title : ""} onChange={formValue}/>
                <button type={"submit"}>Submit</button>
            </form>
        </div>
    );
}

export default TodoForm;*/
import React, {useState} from "react";
function TodoForm({todo, handleSubmit}) {
    const [title, setTitle] = useState();

    const changeTitleValue = (event) => {
        setTitle(event.target.value);
    }

    const submitHandler = () => {
        if (todo){
            todo.title = title;
            handleSubmit(todo)
        }else {
            handleSubmit(title);
        }
    }

    return (
        <div>
            <form action="submit" onSubmit={submitHandler}>
                <input type="text" name="text" defaultValue={todo ? todo.title : ''} onChange={changeTitleValue}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default TodoForm;