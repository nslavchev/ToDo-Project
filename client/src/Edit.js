import React from "react";
import {useHistory, useLocation} from "react-router-dom";
import axios from "axios";
import TodoForm from "./TodoForm";
import Navbar from "./Navbar";

function Edit() {
    const data = useLocation();
    const todo = data.state;


    const history = useHistory();
    const editTodo = (t) => {
        //const body = JSON.stringify(todo);

        axios.post("/api/editTodo", t, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then()

        console.log(t.title)
        history.push("/home");
    }

    return (
        <div>
            <Navbar/>
            <h3>Edit ToDo</h3>
            <TodoForm todo={todo} handleSubmit={editTodo}/>
        </div>
    );
}

export default Edit;