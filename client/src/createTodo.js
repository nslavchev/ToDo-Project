import React from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";
import TodoForm from "./TodoForm";
import Navbar from "./Navbar";

function CreateTodo() {
    const history = useHistory();

    const createTodo = (title) => {
        const body = JSON.stringify({title});

        axios.post("/api/createTodo", body, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then()
        console.log(title)
        history.push("/home");
    }

    return (
        <div>
            <Navbar/>
            <h3>Create Todo</h3>
            <TodoForm handleSubmit={createTodo}/>
        </div>
    );
}

export default CreateTodo;